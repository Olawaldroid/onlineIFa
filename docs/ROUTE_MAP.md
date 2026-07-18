# Route map

Two route groups share the app: **`(full)`** renders the IFA LAB-styled pages
full-bleed (no shared `<main>` container — each page composes its own
`PageSection`s); **`(site)`** wraps utility pages in a centered container.
Both share the same URL space — the grouping is invisible in the URL.

## Page routes (App Router)

| Path | Group | Flow | Notes |
| --- | --- | --- | --- |
| `/` | `(full)` | Onboarding | Animated hero → Learn or Start Consultation |
| `/disclaimer?next=` | `(site)` | Onboarding | Accept cultural/educational disclaimer |
| `/signup?next=` | `(site)` | Onboarding | Account creation (auth phase) |
| `/learn` | `(full)` | Learn Ifá | What is Ifá, 16 primary + combinations, mathematics (binary explorer), Ifá & CS comparisons, IFÀGRÌTHM field notes |
| `/odu` | `(full)` | Library | All 256, searchable glyph-tile grid |
| `/odu/[slug]` | `(full)` | Library detail | Facts + gated interpretation + verses |
| `/consult?odu=` | `(full)` | Consultation | Runs entirely client-side by default — no account or database needed (mode → area → question → safety → cast → interpret → result all computed in the browser from the real `src/lib/{casting,safety,odu}/*` modules; SIMULATED/LEARNING modes get the chain-swing / nut-striking animation, `src/components/CastingStage.tsx`). "Save consultation" is the only step that touches the database — it replays the same inputs through the full audited API/state machine. |
| `/graph` | `(full)` | Knowledge graph | Clickable concept map — Odù, òrìṣà, concepts, mathematics, history, instruments, virtues |
| `/history` | `(full)` | Timeline | Six eras, horizontal scroll |
| `/games` | `(full)` | Learning games | Two quick-fire games; cross-page badges (localStorage, `src/lib/progress.ts`) |
| `/museum` | `(full)` | Instruments | The five instruments, credited photos where openly licensed |
| `/library` | `(full)` | Library | Public-domain/openly-licensed sources + glossary |
| `/search` | `(site)` | Search | Odù, variants, keyword, signature, proverb, … |
| `/assistant` | `(site)` | AI | Approved content only, cited |
| `/contribute` | `(site)` | Contributor | Submit original interpretation |
| `/pricing` | `(site)` | Payments | Tiers (Stripe later) |
| `/saved` | `(site)` | Saved | Revisit, notes, export, delete |
| `/admin` | `(site)` | Admin | Dashboard + counts |
| `/admin/interpretations` | `(site)` | Admin | Review queue |
| `/admin/sources` | `(site)` | Admin | Sources & permission status |
| `/admin/contributors` | `(site)` | Admin | Verify roles |
| `/admin/odu` | `(site)` | Admin | Odù & verses |
| `/admin/audit` | `(site)` | Admin | Audit log |

`/lab` (the standalone Claude Design showcase) is retired and permanently
redirects to `/` (`next.config.mjs`) — its design is now the site itself.

## API routes

| Method & path | Purpose |
| --- | --- |
| `GET /api/odu?q=&type=` | List/search the corpus (facts) |
| `GET /api/search?q=` | Unified search (facts + DB content) |
| `POST /api/onboarding/accept` | Record disclaimer + route guest/account |
| `POST /api/safety/screen` | Screen free text for safety concerns |
| `POST /api/consultation` | Start a consultation |
| `GET /api/consultation/:id` | Fetch session |
| `PATCH /api/consultation/:id` | Drive state machine (`select-area`, `enter-question`, `acknowledge-safety`, `interpret`, `save`) |
| `DELETE /api/consultation/:id` | Delete user data |
| `POST /api/consultation/:id/cast` | Perform the cast (mode-aware) |
| `GET /api/consultation/:id/export` | Printable HTML → PDF |
| `POST /api/interpretations` | Submit interpretation (→ SUBMITTED) |
| `PATCH /api/interpretations/:id/review` | Admin approve/reject/request-changes |
| `POST /api/assistant` | Retrieval-augmented answer (approved only) |

### Request validation
All write routes validate input with **zod**. The consultation `PATCH` uses a
discriminated union on `action`, and every transition is checked against the
state machine in `src/lib/consultation/stateMachine.ts`.

### Planned (later phases)
- `POST /api/auth/*` — authentication (Auth.js)
- `POST /api/payments/checkout`, `POST /api/payments/webhook` — Stripe
- `POST /api/consultation/:id/notes` — add private note
- `PATCH /api/sources/:id` — permission updates
