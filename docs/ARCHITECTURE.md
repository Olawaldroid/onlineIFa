# Architecture

## Folder structure

```
online-ifa/
├── prisma/
│   ├── schema.prisma          # full data model (facts + meaning + workflow)
│   └── seed.ts                # seeds 256 Odù + safe placeholder content
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── layout.tsx, page.tsx, globals.css, not-found.tsx
│   │   ├── disclaimer/        # onboarding disclaimer
│   │   ├── signup/            # account creation (auth phase)
│   │   ├── learn/             # Learn Ifá flow
│   │   ├── odu/               # library list + [slug] detail
│   │   ├── consult/           # consultation flow
│   │   ├── search/            # unified search
│   │   ├── assistant/         # AI study assistant
│   │   ├── contribute/        # contributor submission
│   │   ├── pricing/           # payment tiers
│   │   ├── saved/             # saved consultations
│   │   ├── admin/             # admin dashboard + sub-areas
│   │   └── api/               # REST API routes (see ROUTE_MAP.md)
│   ├── components/            # SignatureDisplay, Nav, ConsultationFlow
│   ├── lib/
│   │   ├── db.ts              # Prisma singleton
│   │   ├── odu/               # primary.ts, combine.ts, facts.ts, detail.ts
│   │   ├── casting/           # config.ts (modes), cast.ts (execution)
│   │   ├── consultation/      # stateMachine.ts, service.ts
│   │   ├── interpretation/    # gate.ts (visibility + permission gate)
│   │   ├── safety/            # guardrails.ts
│   │   └── ai/                # retrieval.ts (RAG contract + system prompt)
│   └── types/                 # shared TS types / DTOs
└── docs/                      # this documentation set
```

## Layered design

```
┌─────────────────────────────────────────────────────────────┐
│  UI (App Router pages + components)                          │
├─────────────────────────────────────────────────────────────┤
│  API routes (validation with zod, thin controllers)         │
├─────────────────────────────────────────────────────────────┤
│  Domain services / lib                                       │
│   • odu      → facts, combination engine (no DB needed)      │
│   • casting  → configurable, honest cast modes               │
│   • consultation → state machine + service                  │
│   • interpretation → visibility + permission GATE            │
│   • safety   → guardrail screening                          │
│   • ai       → retrieval contract (approved content only)   │
├─────────────────────────────────────────────────────────────┤
│  Prisma → PostgreSQL                                         │
└─────────────────────────────────────────────────────────────┘
```

## Data model (Prisma)

### Fact layer (no interpretation text)
- **Odu** — slug, name, altNames, type (PRIMARY/COMBINED), rank, signature,
  right/left leg self-relations, factualSummary.
- **Theme** + **OduTheme** — reusable, searchable themes.
- **OduRelation** — directed relations (complement/contrast/shares-leg).
- **Proverb** — culturally-shared, optionally source-tracked.

### Meaning layer (gated, reviewed, versioned)
- **Interpretation** — markdown content, language, tradition, author/contributor,
  sourceType, source, `reviewStatus`, `flagged`, `publishedAt`.
- **InterpretationVersion** — immutable history of every change.
- **ReflectionQuestion** — non-directive prompts for results.
- **Verse** — ese Ifá, always tied to a Source; text stays empty until the
  source's permission is GRANTED.

### Sources & permissions
- **Source** — title, author, publisher, year, sourceType, licenceType,
  permissionStatus, permissionDocUrl, attributionText. The publish gate keys off
  `permissionStatus ∈ {GRANTED, NOT_REQUIRED}`.

### People & workflow
- **User** (role, disclaimer acceptance, guest flag), **Contributor** (role,
  lineage, verified), **Review** (decision + comment), **AuditLog**.

### Consultation
- **Consultation** (state, concernArea, question, castingMode, safetyFlags, odu,
  castingDetail JSON, saved), **ConsultationNote** (private notes).

### Safety & payments
- **SafetyResource** (category, region, links), **Product** / **Order**
  (payment tiers; Stripe later).

See [`prisma/schema.prisma`](../prisma/schema.prisma) for the authoritative
definitions and enums.

## Why facts can render without a database

`src/lib/odu/combine.ts` deterministically generates all 256 Odù from the 16
primary definitions in `primary.ts`. `facts.ts` caches this for the UI. So the
educational/browsing experience never depends on Postgres; the database only
supplies the meaning layer and stateful flows. Pages that read the DB wrap calls
in `try/catch` and degrade to a clear "Database not connected" / placeholder
state.

## Signature notation

Each Odù has two legs of four marks. `"1"` = single mark, `"2"` = double mark.
Stored as `right|left`, e.g. `1111|2222`. For the 16 méjì both legs are equal.
A simulated cast performs 8 binary draws (Ọ̀pẹ̀lẹ̀-style) to form the two legs,
recording the seed and draws for reproducibility and auditability.
