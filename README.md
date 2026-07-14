# Real Match

Private, human-led introductions for adults looking for a serious relationship.

Real Match is a two-sided matchmaking service: every participant is a member,
introductions are curated by people, and contact opens only after **both**
members independently agree. Fees pay for the matchmaking work — never for
access to a person, and never contingent on an outcome.

## Truth rules (non-negotiable)

- Every public claim must be technically implemented, operationally true, and
  legally defensible. Claims derive from `lib/config/site.ts`, not from copy.
- No fictional people presented as real: no invented founders, staff,
  testimonials, member counts, or success rates. Demonstration profiles are
  visibly labelled fictional.
- No selling access: no member can pay to make another member view, reply to,
  or meet them. No outcome-based fees.
- The service status banner (`preview` / `pilot` / `live`) must honestly
  reflect operational reality. Gates for changing it: `PRODUCTION_READINESS.md`.

## Current status: `preview`

The site is a production-quality front end with an honest preview posture:

- All public routes, copy, and the full multi-step application flow
- **No data is collected**: the application form states plainly that nothing
  is saved or transmitted in preview
- Supabase schema + RLS policies exist as migrations (not yet provisioned)
- The `/admin` routes render labelled mock data only, are noindexed, and are
  excluded from robots/sitemap; real auth is required before any live data

## Stack

Next.js 14 (App Router) · TypeScript (strict) · Tailwind base + custom design
system · `next/font` (Fraunces + Manrope) · zero runtime dependencies beyond
Next/React.

## Project structure

```
app/            routes (public pages, admin mock, sitemap, robots)
components/
  layout/       header (accessible drawer), footer, status banner
  marketing/    hero, comparison, philosophy, process, membership, FAQ, image slots
  forms/        multi-step application form
  profiles/     clearly-fictional demonstration profile
  safety/       privacy & safety pillars
  admin/        internal mock console shell
content/        all long-form copy (single audit point)
lib/
  config/       serviceConfig — single source of truth for claims/status
  validation/   dependency-free typed form validation
supabase/
  migrations/   schema (0001) and RLS policies (0002)
docs/           strategy/compliance documents (predate this redesign)
```

## Setup

```bash
npm ci          # reproducible install from the committed lockfile
npm run dev
```

Copy `.env.example` to `.env.local`. `NEXT_PUBLIC_SERVICE_STATUS` controls
the preview/pilot/live posture; leave it `preview`.

## Verification

```bash
npm run lint
npm run typecheck
npm run build
npm run audit:high
```

CI (GitHub Actions) runs all of the above on every push and PR. CI never
writes to the repository.

## Deployment

Deploys as a standard Next.js app (Vercel). Set `NEXT_PUBLIC_SITE_URL` to the
canonical production URL so metadata, sitemap, and robots resolve correctly.
Do not set `NEXT_PUBLIC_SERVICE_STATUS` beyond `preview` until the gates in
`PRODUCTION_READINESS.md` pass.

## Security notes

- No secrets in the repo; `.env.example` is placeholder-only.
- The future `SUPABASE_SERVICE_ROLE_KEY` is server-only. It must never be
  prefixed `NEXT_PUBLIC_` and never referenced in client components.
- Database access is default-deny (see `supabase/migrations/0002`); staff
  access is role-based via `current_staff_role()` and designed for auditing.
- The site sets no cookies and runs no analytics or third-party scripts.
