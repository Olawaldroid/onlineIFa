# Route map

## Page routes (App Router)

| Path | Flow | Notes |
| --- | --- | --- |
| `/` | Onboarding | Land → Learn or Start Consultation |
| `/disclaimer?next=` | Onboarding | Accept cultural/educational disclaimer |
| `/signup?next=` | Onboarding | Account creation (auth phase) |
| `/learn` | Learn Ifá | 16 primary, 256 total, how combinations work |
| `/odu` | Library | All 256, filter by name/signature/type |
| `/odu/[slug]` | Library detail | Facts + gated interpretation + verses |
| `/consult?odu=` | Consultation | Full state-machine flow |
| `/search` | Search | Odù, variants, keyword, signature, proverb, … |
| `/assistant` | AI | Approved content only, cited |
| `/contribute` | Contributor | Submit original interpretation |
| `/pricing` | Payments | Tiers (Stripe later) |
| `/saved` | Saved | Revisit, notes, export, delete |
| `/admin` | Admin | Dashboard + counts |
| `/admin/interpretations` | Admin | Review queue |
| `/admin/sources` | Admin | Sources & permission status |
| `/admin/contributors` | Admin | Verify roles |
| `/admin/odu` | Admin | Odù & verses |
| `/admin/audit` | Admin | Audit log |

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
