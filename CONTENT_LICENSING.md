# Content & licensing policy

Online Ifá treats cultural material with care and treats copyright as a hard
constraint, enforced in code.

## The two layers

- **Facts** — Odù names, signatures, ranks, leg structure, and combinations are
  culturally-shared facts. They are generated/seeded and freely displayed.
- **Interpretations & verses** — meaning content is **gated**. It is only
  published when it is original, public-domain, explicitly licensed, or
  contributor-submitted *and* approved.

## Rules (non-negotiable)

1. **No scraping** of copyrighted books or websites.
2. **No copying** of existing published interpretations.
3. **No verse text** stored against a source whose `permissionStatus` is
   `PENDING`, `EXPIRED`, or `DENIED`.
4. Every meaning item references a **Source** with an explicit
   `licenceType` and `permissionStatus`, plus attribution text.
5. Until original/approved content exists, the app shows:
   *"This Odù has not yet been reviewed by a contributor."*

## Accepted source types

| `sourceType` | Use |
| --- | --- |
| `ORIGINAL_APP` | Written originally for this app (`permissionStatus = NOT_REQUIRED`) |
| `CONTRIBUTOR` | Submitted by a verified contributor |
| `PUBLIC_DOMAIN` | Verifiably out of copyright |
| `LICENSED` | Used under an explicit licence / written permission on file |
| `ORAL_TRADITION` | Transcribed oral tradition, attributed to lineage |
| `ACADEMIC` | Cited academic work (facts/attribution only) |

## Enforcement points

- [`src/lib/interpretation/gate.ts`](src/lib/interpretation/gate.ts) — visibility
  + permission gate for users and the AI assistant.
- [`/api/interpretations/[id]/review`](src/app/api/interpretations/[id]/review/route.ts)
  — approval is blocked unless the source is publishable.
- [`src/lib/ai/retrieval.ts`](src/lib/ai/retrieval.ts) — the assistant can only
  read approved, permission-clean content.

## Attribution

Approved content displays its source title and licence. Contributors retain
credit via the `Contributor` record and `InterpretationVersion` history.
