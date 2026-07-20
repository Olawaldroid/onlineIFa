# Online Ifá

An educational and cultural **Ifá consultation app**. It helps people learn
about the **256 Odù** of Ifá and explore consultation respectfully.

> **Core rule:** Odù **facts** are separated from **interpretations**.
> No existing book interpretations are copied. Every interpretation is
> **original, public-domain, licensed, or contributor-submitted**, and is
> reviewed before it is published.

This repository is the **complete architecture** for the product — every flow
exists from day one. Where meaning content has not yet been authored, the app
shows a safe placeholder (`"This Odù has not yet been reviewed by a
contributor."`) instead of fabricating or copying.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **PostgreSQL** + **Prisma**
- **Tailwind CSS**
- API routes (REST) under `src/app/api`
- Markdown interpretation content (`react-markdown`)
- Auth, payments (Stripe) and the AI model call are **integration points**,
  feature-flagged off until configured — the *flows* exist regardless.

---

## Quick start

```bash
# 1. Install
npm install

# 2. Configure environment
cp .env.example .env
#   → set DATABASE_URL to a running Postgres instance

# 3. Set up the database
npx prisma migrate dev --name init
npm run db:seed          # seeds all 256 Odù + safe placeholder content

# 4. Run
npm run dev              # http://localhost:3000
```

The corpus (all 256 Odù, signatures, combinations) is generated
deterministically, so the **Learn** and **Library** pages render even before a
database is connected. The database adds the **meaning** layer
(interpretations, verses) and the consultation/contributor/admin flows.

### Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build (`prisma generate` + `next build`) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:seed` | Seed Odù facts + sample content |
| `npm run prisma:studio` | Browse the database |
| `npm run db:reset` | Reset + reseed (destructive) |

---

## The big idea: facts vs. interpretation

| FACT layer (verifiable, shareable) | MEANING layer (gated, reviewed) |
| --- | --- |
| `Odu`, `OduRelation`, `Theme`, `Proverb` | `Interpretation`, `Verse` |
| Name, slug, signature, rank, legs, type | Original/licensed readings, ese Ifá |
| Generated + seeded, always visible | Requires **approval** + **publishable source** |

The gate lives in [`src/lib/interpretation/gate.ts`](src/lib/interpretation/gate.ts).
An interpretation is only shown when:

1. its `reviewStatus === APPROVED`,
2. it is not `flagged`, **and**
3. its `Source.permissionStatus` is `GRANTED` or `NOT_REQUIRED`.

Otherwise the placeholder is shown. The same gate guards the AI assistant's
retrieval, so unapproved or copyright-unclear content can never leak.

---

## Flows (all present from day one)

1. **Onboarding** — `/` → `/disclaimer` → guest or account (`/signup`)
2. **Learn Ifá** — `/learn` (foundations, 16 primary, 256 combined, embedded practice)
3. **Odù library** — `/odu`, `/odu/[slug]` (facts + gated meaning + contextual study assistant)
4. **Consultation** — `/consult` (area → question → safety → cast → result)
5. **Casting** — simulated / learning / user-selected / manual (Babalawo)
6. **Interpretation** — placeholder until approved; contributors submit
7. **Contributor** — `/contribute` (submit → review → version)
8. **Source & permission** — `/admin/sources` (licence + permission tracking)
9. **Tradition** — `/tradition` (history, instruments, collections, living practice)
10. **Admin** — `/admin/*` (review, sources, contributors, odù, audit)
11. **Search** — `/search` (name, variant, keyword, signature, proverb, …)
12. **Saved consultations** — `/saved` (revisit, notes, export PDF, delete)
13. **Payments** — `/pricing` (tiers defined; Stripe later)
14. **Safety** — guardrails screen every question and redirect to help
15. **Technical** — see [`docs/`](docs)

---

## Documentation

- [`docs/CORE_KNOWLEDGE.md`](docs/CORE_KNOWLEDGE.md) — **living knowledge base** (facts, themes, open questions; update as we research)
- [`docs/IFA_RESEARCH.md`](docs/IFA_RESEARCH.md) — research notes + open-source registry
- [`content/ese-ifa/`](content/ese-ifa/) — page-cited public corpus records + local-source checksums
- [`docs/VISUAL_REFERENCES.md`](docs/VISUAL_REFERENCES.md) — museum references and visual guardrails
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — folder structure, data model, design
- [`docs/ROUTE_MAP.md`](docs/ROUTE_MAP.md) — page + API route maps
- [`docs/CONSULTATION_STATE_MACHINE.md`](docs/CONSULTATION_STATE_MACHINE.md)
- [`docs/AI_RETRIEVAL_PLAN.md`](docs/AI_RETRIEVAL_PLAN.md)
- [`docs/ADMIN_WORKFLOW.md`](docs/ADMIN_WORKFLOW.md)
- [`docs/SEED_DATA_PLAN.md`](docs/SEED_DATA_PLAN.md)
- [`docs/ROADMAP.md`](docs/ROADMAP.md)

---

## Cultural respect & safety

Ifá is a living tradition of the Yoruba people. This app:

- makes **no claim** of spiritual authority and never fakes a casting's authority,
- **redirects** medical, mental-health, legal, financial, abuse and minor-safety
  concerns to qualified help ([`src/lib/safety/guardrails.ts`](src/lib/safety/guardrails.ts)),
- does **not** provide instructions for harmful rituals,
- never scrapes or copies copyrighted books,
- lets users **delete their data** at any time.

It complements, and never replaces, a trained Babalawo.
