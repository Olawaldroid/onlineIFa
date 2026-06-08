# CLAUDE.md — Online Ifá project memory

Guidance for any Claude/agent session working in this repo. Read this first.

## What this project is
**Online Ifá** — an educational and cultural Ifá consultation app (Next.js +
TypeScript + PostgreSQL + Prisma + Tailwind). It helps people learn about the
**256 Odù** and explore consultation respectfully.

## 🧠 Core knowledge lives in `docs/CORE_KNOWLEDGE.md`
That file is the **living memory / source of truth** for the Ifá domain
(verified facts, working themes, open questions, changelog). **When we research
or learn something new, update `docs/CORE_KNOWLEDGE.md`** (and the matching
code/seed), and add a dated Changelog entry. Treat it as the canonical reference
before answering domain questions or writing content.

## Non-negotiable rules
1. **Separate facts from interpretation.** Names, signatures, ranks, legs, and
   the binary structure are facts (`src/lib/odu/*`, generated/seeded). Meaning
   lives in `Interpretation`/`Verse`, gated by review + source permission.
2. **Never copy copyrighted text.** No scraping books/sites. All interpretation
   content is original, public-domain, licensed, or contributor-submitted and
   reviewed. See `CONTENT_LICENSING.md`.
3. **Gate before publish.** Content is shown only when `reviewStatus=APPROVED`,
   not `flagged`, and its `Source.permissionStatus ∈ {GRANTED, NOT_REQUIRED}`
   (`src/lib/interpretation/gate.ts`). Missing content → the placeholder
   `"This Odù has not yet been reviewed by a contributor."`
4. **No false authority.** Casting modes are honest; the app never claims to
   replace a babaláwo or professional help. Safety guardrails redirect
   medical/crisis/legal/financial/abuse cases (`src/lib/safety/guardrails.ts`).
5. **AI assistant** answers ONLY from approved DB content, always cites, says
   when content is missing, never invents Odù (`src/lib/ai/retrieval.ts`).

## Where things are
- `src/lib/odu/` — facts: `primary.ts` (16 Odù), `combine.ts` (256), `facts.ts`,
  `interpretations.ts` (original summaries), `detail.ts`.
- `src/lib/{casting,consultation,interpretation,safety,ai,auth}/` — domain logic.
- `src/app/` — App Router pages + `api/` routes. `prisma/` — schema + seed.
- `docs/` — `CORE_KNOWLEDGE.md` (memory), `IFA_RESEARCH.md` (sources),
  `ARCHITECTURE`, `ROUTE_MAP`, `CONSULTATION_STATE_MACHINE`, `AI_RETRIEVAL_PLAN`,
  `ADMIN_WORKFLOW`, `SEED_DATA_PLAN`, `ROADMAP`.

## Dev workflow
- Verify before pushing: `npm run typecheck && npm run lint && npm run build`
  (all must pass; CI runs the same via `.github/workflows/ci.yml`).
- DB-backed pages degrade gracefully without Postgres; fact/browse pages render
  with no DB. Mark DB-reading pages `export const dynamic = "force-dynamic"`.
- Seed: `npm run db:seed` (idempotent; seeds 256 Odù + 16 approved originals).

## Branch / PR conventions
- Work on a feature branch; open a **draft PR** to `main`.
- End commit messages and PR bodies with the session link when applicable.
- Keep replies on GitHub frugal.
