# Real Match

Real Match is a personal matchmaking service for verified consenting adults who are serious about finding a genuine relationship.

We get to know each member, hand-select compatible introductions, and support both people through the process. Every introduction happens with mutual consent, and our fees pay for the matchmaking service — never for access to another person.

## What Real Match is

- A two-sided matchmaking and introduction service where **everyone is a member**, not a product
- Human matchmakers who curate introductions based on values, intent, and compatibility
- Identity verification so members meet real, sincere people
- Optional coaching and coordination support for meetings both members have agreed to

## Hard lines (do not cross)

Real Match must never become a service that:

- guarantees a match, relationship, marriage, sex, or any romantic outcome
- sells access to members, or lets anyone pay to make another member view, reply to, or meet them
- presents one gender (or any member) as inventory, a catalogue, or a reward to be unlocked
- gates a specific person's attention behind an escalating pay-per-action funnel
- charges an outcome-based or "success" fee

If the product behavior and the public disclaimer diverge, the disclaimer is worthless. The platform must operate exactly as described: member-driven, consent-based, verification-focused, and honest about what fees buy.

## Current scope

This repository is an early preview / static front end:

- public marketing and process pages
- application flow (preview only — no real submission yet)
- draft legal pages (Terms, Privacy)
- matchmaker console with mock data
- TypeScript data models
- mock data only

No backend, authentication, database, payments, identity-document upload, or member messaging is implemented yet.

## Service tiers

- Membership Application — Free
- Matchmaking Membership — £299 (matchmaking service and time)
- Dedicated Concierge — £600 (optional coaching and coordination add-on)

Fees are for the matchmaker's work. They do not buy outcomes or access to any member.

## Local setup

```bash
npm install
npm run dev
```

## Verification commands

```bash
npm run lint
npm run typecheck
npm run build
```
