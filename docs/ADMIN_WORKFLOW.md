# Admin & contributor workflow

## Roles

- **Babalawo** — submits readings grounded in practice/lineage.
- **Researcher** — submits sourced, factual context.
- **Translator** — submits translations (tracks original source + licence).
- **Editor** — refines submissions; edits are versioned.
- **Admin** — reviews, manages sources/permissions, publishes, audits.

## Submission → publication lifecycle

```
 Contributor                Admin                     System
 ───────────                ─────                     ──────
 submit ──► SUBMITTED
                            review
                              ├─ APPROVED ──────────► publishedAt set
                              │                       version appended
                              │                       audit: APPROVE
                              │                       (only if source
                              │                        permission OK)
                              ├─ CHANGES_REQUESTED ─► back to contributor
                              └─ REJECTED ──────────► archived, audit: REJECT
```

Every transition writes an **InterpretationVersion** (immutable history) and an
**AuditLog** entry. Approval is **blocked** when the linked `Source` permission
is not `GRANTED`/`NOT_REQUIRED` — see
[`/api/interpretations/[id]/review`](../src/app/api/interpretations/[id]/review/route.ts).

## Permission gate (source & permission flow)

Each `Source` records title, author, publisher, year, source type, licence type,
permission status, permission document URL, and attribution text. The app
**cannot publish** meaning content unless the source is publishable. The same
gate ([`src/lib/interpretation/gate.ts`](../src/lib/interpretation/gate.ts))
governs what end users and the AI assistant can ever see.

| `permissionStatus` | Publishable? |
| --- | --- |
| `NOT_REQUIRED` (original / public domain) | ✅ |
| `GRANTED` | ✅ |
| `PENDING` / `EXPIRED` / `DENIED` | ❌ |

## Admin areas

| Area | Page | Manages |
| --- | --- | --- |
| Dashboard | `/admin` | live counts + entry points |
| Interpretations | `/admin/interpretations` | review queue |
| Sources | `/admin/sources` | licences + permission status |
| Contributors | `/admin/contributors` | verify roles |
| Odù & verses | `/admin/odu` | facts, themes, verses |
| Audit | `/admin/audit` | full action history |

## Flagging

Users/admins can flag published interpretations (`Interpretation.flagged`).
Flagged content is immediately hidden from end users and the assistant until an
admin re-reviews it.
