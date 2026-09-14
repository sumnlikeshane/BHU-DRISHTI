# BHU-DRISHTI

BHU-DRISHTI is an AI-powered intelligence layer for watershed monitoring. It is intended to combine geo-tagged field evidence with GIS, rainfall, and satellite indicators, then turn that evidence into explainable health assessments and prioritized actions for officials.

> Drishti captures the ground, Srishti visualizes it, and BHU-DRISHTI interprets it.

## Current scope

This repository contains the public landing experience and an authenticated
Supabase command centre backed by a Pan-India PostGIS domain model. Supabase Auth,
role and administrative-scope enforcement, authenticated Edge Functions, an
explainable case queue, and audited review transitions are implemented. Live
government-data ingestion and production model inference still require
authorised source access.

Maharashtra and Nashik are used only for the landing-page narrative. The product
and database are designed for all Indian states and union territories.

## Frontend stack

- React and TypeScript
- Vite
- Tailwind CSS
- Supabase Auth, Postgres/PostGIS, and Edge Functions
- `@supabase/server` for verified server-side auth and clients
- ESLint and Prettier
- Graphify project skill for compact codebase context

## Getting started

Use Node.js 20 or newer.

```bash
npm install
npm run dev
```

Supabase setup, migrations, user scoping, and deployment are documented in
[docs/supabase-setup.md](./docs/supabase-setup.md).

Quality checks:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

## Repository layout

```text
src/
  App.tsx          public/authenticated route shell
  features/auth/   Supabase session and sign-in flow
  features/command-centre/ authenticated review queue
  index.css        Tailwind entry point and initial design tokens
  main.tsx         React entry point
db/migrations/      Supabase/PostGIS schema, auth API, and demo seed
supabase/functions/ authenticated Edge Functions
supabase/config.toml local/deployment function auth configuration
docs/               data acquisition, provenance, and research notes
ROUGH_PLAN.md       product discovery notes and source context
AGENTS.md           project-local agent guidance
.codex/             project-local Codex skills
```

Add feature folders only when a real workflow needs them. Likely future boundaries include `features/map`, `features/sites`, `features/inspections`, and `features/analytics`, but they are not created prematurely.

## Remaining integration boundaries

The following should be chosen alongside the first implemented workflow:

- Map renderer and geospatial formats
- Authorised Drishti/SRISHTI and WDC-PMKSY data-transfer contracts
- Production model-serving and evidence-fusion pipeline
- Authoritative administrative/hydrological data imports
- Private object storage and signed media delivery
- Hosting-specific SPA rewrites and operational monitoring

See [ROUGH_PLAN.md](./ROUGH_PLAN.md) for the full product context and
[the Pan-India data acquisition plan](./docs/data-acquisition-and-neon.md)
for the source matrix, manual download instructions, database setup, and
automation boundary.
