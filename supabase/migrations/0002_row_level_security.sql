-- Real Match — Row Level Security
--
-- Default-deny everywhere. The anon key can do nothing with these tables;
-- application intake is performed server-side with the service role (which
-- bypasses RLS and must never be exposed to the client). Staff read/write is
-- granted per-role below and every policy goes through current_staff_role().

alter table staff_profiles enable row level security;
alter table applications enable row level security;
alter table application_consents enable row level security;
alter table application_status_history enable row level security;
alter table member_profiles enable row level security;
alter table profile_visibility_approvals enable row level security;
alter table introduction_candidates enable row level security;
alter table introduction_decisions enable row level security;
alter table safety_reports enable row level security;
alter table data_deletion_requests enable row level security;
alter table payment_records enable row level security;
alter table audit_events enable row level security;
alter table service_configuration enable row level security;

-- ------------------------------------------------------------ staff_profiles

-- Staff can see their own profile; administrators can see all.
create policy staff_read_own on staff_profiles
  for select using (user_id = auth.uid() or current_staff_role() = 'administrator');

-- Only administrators manage staff records (writes otherwise via service role).
create policy staff_admin_write on staff_profiles
  for all using (current_staff_role() = 'administrator')
  with check (current_staff_role() = 'administrator');

-- ------------------------------------------------------------ applications

-- Reviewers, matchmakers, safety officers, auditors and administrators can read.
create policy applications_staff_read on applications
  for select using (
    current_staff_role() in ('administrator', 'reviewer', 'matchmaker', 'safety_officer', 'auditor')
  );

-- Only reviewers and administrators may update application state.
create policy applications_staff_update on applications
  for update using (current_staff_role() in ('administrator', 'reviewer'))
  with check (current_staff_role() in ('administrator', 'reviewer'));

-- No insert/delete policies: intake inserts happen server-side (service
-- role); deletion happens through the documented deletion workflow.

-- ------------------------------------------------------------ consents & history

create policy consents_staff_read on application_consents
  for select using (
    current_staff_role() in ('administrator', 'reviewer', 'auditor')
  );

create policy history_staff_read on application_status_history
  for select using (
    current_staff_role() in ('administrator', 'reviewer', 'auditor')
  );

create policy history_staff_insert on application_status_history
  for insert with check (current_staff_role() in ('administrator', 'reviewer'));

-- ------------------------------------------------------------ member data

create policy members_staff_read on member_profiles
  for select using (
    current_staff_role() in ('administrator', 'reviewer', 'matchmaker', 'safety_officer', 'auditor')
  );

create policy members_staff_update on member_profiles
  for update using (current_staff_role() in ('administrator', 'matchmaker'))
  with check (current_staff_role() in ('administrator', 'matchmaker'));

create policy visibility_staff_read on profile_visibility_approvals
  for select using (
    current_staff_role() in ('administrator', 'matchmaker', 'auditor')
  );

-- ------------------------------------------------------------ introductions

create policy intro_candidates_staff on introduction_candidates
  for select using (
    current_staff_role() in ('administrator', 'matchmaker', 'auditor')
  );

create policy intro_candidates_matchmaker_insert on introduction_candidates
  for insert with check (current_staff_role() in ('administrator', 'matchmaker'));

create policy intro_decisions_staff_read on introduction_decisions
  for select using (
    current_staff_role() in ('administrator', 'matchmaker', 'auditor')
  );

-- ------------------------------------------------------------ safety

create policy safety_staff_read on safety_reports
  for select using (
    current_staff_role() in ('administrator', 'safety_officer', 'auditor')
  );

create policy safety_staff_write on safety_reports
  for update using (current_staff_role() in ('administrator', 'safety_officer'))
  with check (current_staff_role() in ('administrator', 'safety_officer'));

-- ------------------------------------------------------------ compliance

create policy deletion_staff_read on data_deletion_requests
  for select using (
    current_staff_role() in ('administrator', 'auditor')
  );

create policy payments_staff_read on payment_records
  for select using (
    current_staff_role() in ('administrator', 'auditor')
  );

-- Audit log: readable by administrators and auditors; append-only via
-- service role or staff insert. Never updatable, never deletable.
create policy audit_staff_read on audit_events
  for select using (current_staff_role() in ('administrator', 'auditor'));

create policy audit_staff_insert on audit_events
  for insert with check (current_staff_role() is not null);

create policy config_admin on service_configuration
  for all using (current_staff_role() = 'administrator')
  with check (current_staff_role() = 'administrator');

create policy config_staff_read on service_configuration
  for select using (current_staff_role() is not null);
