# Development roadmap

The architecture for **all 15 flows exists from day one**. The roadmap turns the
scaffolded flows into a production product in clean phases. Each phase is
shippable.

## Phase 0 — Foundation ✅ (this repository)
- Next.js + TypeScript + Tailwind + Prisma scaffold.
- Full Prisma schema: facts, meaning, sources/permissions, workflow,
  consultation, safety, payments.
- Combination engine for all 256 Odù; fact pages render without a DB.
- Consultation state machine + service + API.
- Casting engine (4 configurable modes).
- Interpretation gate + placeholder.
- Safety guardrails.
- AI retrieval contract (approved-only, cited).
- Admin dashboard structure + review/permission endpoints.
- Seed (256 Odù + one approved example + safety + products).
- Docs.

## Phase 1 — Persistence & auth
- Provision Postgres; run migrations; wire seed in CI.
- Authentication (Auth.js): email magic link + OAuth.
- Real guest→account reclamation of consultations via `guestToken`.
- Session-scoped saved consultations, private notes, data deletion.
- Role-based access control for `/admin/*` and contributor actions.

## Phase 2 — Content pipeline
- Contributor onboarding + role verification UI.
- Admin review UI with approve / reject / request-changes buttons wired to the
  existing endpoints, with diff view across `InterpretationVersion`s.
- Source & permission management UI (create/edit, upload permission docs).
- Author the first tranche of **original** interpretations + reflection
  questions for the 16 principal Odù.

## Phase 3 — Search & discovery
- Postgres full-text (or pg_trgm) across names, variants, proverbs, verses,
  contributors, sources; signature-pattern search.
- Topic/theme browsing and related-Odù graph.

## Phase 4 — AI assistant (live model)
- Enable provider behind `AI_ASSISTANT_ENABLED`.
- Wire the model call in `/api/assistant` using `AI_SYSTEM_PROMPT` + retrieved
  context **only**; enforce citations in responses.
- Evaluation harness: refuse-to-fabricate tests, citation-coverage tests.

## Phase 5 — Payments
- Stripe checkout + webhooks for reviewed consultations, Babalawo sessions, and
  donations; entitlement checks; contributor payouts.

## Phase 6 — Hardening & launch
- PDF export via server-side renderer.
- Accessibility + i18n (Yoruba/English) pass.
- Rate limiting, audit dashboards, content moderation tooling.
- Safety classifier layered over keyword guardrails.
- Observability, backups, and a privacy/data-retention policy.

## Cross-cutting principles (every phase)
- Facts stay separate from interpretation.
- Nothing copyrighted is published without `GRANTED` permission.
- No fabricated Odù or meaning; missing content is shown as a placeholder.
- The app never claims to replace a Babalawo or a professional.
