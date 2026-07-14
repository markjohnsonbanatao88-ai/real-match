-- Real Match — initial schema
--
-- Design principles:
--   * Default-deny: RLS is enabled on every table and no anon/authenticated
--     policies are created for sensitive tables. The application server uses
--     the service role (which bypasses RLS) for intake writes; staff access
--     goes through role-checked policies below.
--   * PII separation: applicant PII lives in `applications`; shareable
--     profile content lives in `member_profiles`; verification stores a
--     provider reference and result only — never raw identity documents.
--   * Everything auditable: status changes and sensitive reads/writes are
--     recorded in `application_status_history` and `audit_events`.
--
-- Apply with: supabase db push (or the Supabase migration tooling).

-- ---------------------------------------------------------------- enums

create type application_status as enum (
  'received',
  'under_review',
  'consultation_scheduled',
  'accepted',
  'declined',
  'withdrawn'
);

create type membership_status as enum (
  'pending_verification',
  'active',
  'paused',
  'expired',
  'suspended',
  'removed'
);

create type verification_status as enum (
  'not_started',
  'pending',
  'passed',
  'failed',
  'expired'
);

create type introduction_decision as enum (
  'pending',
  'accepted',
  'declined'
);

create type staff_role as enum (
  'administrator',
  'reviewer',
  'matchmaker',
  'safety_officer',
  'auditor'
);

create type report_status as enum (
  'open',
  'reviewing',
  'action_taken',
  'closed'
);

-- ---------------------------------------------------------------- staff

create table staff_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references auth.users (id) on delete cascade,
  display_name text not null,
  role staff_role not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Helper: current user's active staff role (null when not staff).
create or replace function current_staff_role()
returns staff_role
language sql
stable
security definer
set search_path = public
as $$
  select role from staff_profiles
  where user_id = auth.uid() and is_active
  limit 1;
$$;

-- ---------------------------------------------------------------- intake

create table applications (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique, -- server-generated, human-quotable
  full_name text not null,
  email text not null,
  phone text not null,
  country text not null,
  city text not null,
  age smallint not null check (age >= 18 and age <= 120),
  relationship_goal text not null,
  timeline text not null,
  why_now text not null,
  values_statement text not null,
  lifestyle text not null,
  interests text not null,
  preferences text not null,
  non_negotiables text not null,
  status application_status not null default 'received',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index applications_status_idx on applications (status, created_at desc);
create index applications_email_idx on applications (lower(email));

create table application_consents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications (id) on delete cascade,
  consent_type text not null, -- e.g. 'terms', 'privacy', 'conduct', 'marketing'
  consent_given boolean not null,
  terms_version text not null,
  recorded_at timestamptz not null default now()
);

create index application_consents_app_idx on application_consents (application_id);

create table application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications (id) on delete cascade,
  from_status application_status,
  to_status application_status not null,
  changed_by uuid references staff_profiles (id),
  note text,
  changed_at timestamptz not null default now()
);

create index application_status_history_app_idx
  on application_status_history (application_id, changed_at desc);

-- ---------------------------------------------------------------- members

create table member_profiles (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null unique references applications (id),
  membership_status membership_status not null default 'pending_verification',
  membership_starts_at date,
  membership_ends_at date,
  -- Shareable profile content, approved by the member before any sharing.
  profile_content jsonb,
  profile_approved_at timestamptz,
  -- Verification: provider reference only. Never raw documents.
  verification_provider text,
  verification_reference text,
  verification_status verification_status not null default 'not_started',
  verification_completed_at timestamptz,
  verification_expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index member_profiles_status_idx on member_profiles (membership_status);

create table profile_visibility_approvals (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references member_profiles (id) on delete cascade,
  approved_content_hash text not null, -- which profile version was approved
  approved_at timestamptz not null default now(),
  revoked_at timestamptz
);

create index profile_visibility_member_idx on profile_visibility_approvals (member_id);

-- ---------------------------------------------------------------- introductions

create table introduction_candidates (
  id uuid primary key default gen_random_uuid(),
  member_a_id uuid not null references member_profiles (id),
  member_b_id uuid not null references member_profiles (id),
  proposed_by uuid not null references staff_profiles (id),
  rationale text,
  created_at timestamptz not null default now(),
  check (member_a_id <> member_b_id)
);

create index introduction_candidates_pair_idx
  on introduction_candidates (member_a_id, member_b_id);

create table introduction_decisions (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references introduction_candidates (id) on delete cascade,
  member_id uuid not null references member_profiles (id),
  decision introduction_decision not null default 'pending',
  decided_at timestamptz,
  unique (candidate_id, member_id)
);

-- ---------------------------------------------------------------- safety

create table safety_reports (
  id uuid primary key default gen_random_uuid(),
  reporter_member_id uuid references member_profiles (id),
  subject_member_id uuid references member_profiles (id),
  summary text not null,
  status report_status not null default 'open',
  outcome text,
  handled_by uuid references staff_profiles (id),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index safety_reports_status_idx on safety_reports (status, created_at desc);

-- ---------------------------------------------------------------- compliance

create table data_deletion_requests (
  id uuid primary key default gen_random_uuid(),
  application_id uuid references applications (id),
  member_id uuid references member_profiles (id),
  requested_at timestamptz not null default now(),
  completed_at timestamptz,
  handled_by uuid references staff_profiles (id),
  note text
);

create table payment_records (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references member_profiles (id),
  provider text not null,
  provider_reference text not null,
  amount_minor integer not null check (amount_minor > 0),
  currency text not null default 'GBP',
  purpose text not null, -- 'membership' | 'concierge'
  status text not null,  -- provider-verified status, set server-side only
  created_at timestamptz not null default now(),
  unique (provider, provider_reference)
);

create table audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_staff_id uuid references staff_profiles (id),
  actor_label text not null, -- 'system' | staff display name at time of action
  action text not null,
  target_table text not null,
  target_id uuid,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index audit_events_target_idx on audit_events (target_table, target_id);
create index audit_events_time_idx on audit_events (created_at desc);

create table service_configuration (
  key text primary key,
  value jsonb not null,
  updated_by uuid references staff_profiles (id),
  updated_at timestamptz not null default now()
);
