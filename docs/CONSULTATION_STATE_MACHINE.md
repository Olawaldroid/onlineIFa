# Consultation state machine

Defined in [`src/lib/consultation/stateMachine.ts`](../src/lib/consultation/stateMachine.ts)
and enforced by the service + API on every transition. A session cannot skip
the safety step.

```
        ┌─────────┐
        │ STARTED │
        └────┬────┘
             │ select-area
        ┌────▼──────────┐
        │ AREA_SELECTED │◄──┐ (re-select)
        └────┬──────────┘   │
             │ enter-question
        ┌────▼─────────────┐
        │ QUESTION_ENTERED │◄──┐ (edit question)
        └────┬─────────────┘   │
             │ acknowledge-safety
        ┌────▼──────────────────┐
        │ SAFETY_ACKNOWLEDGED   │
        └────┬──────────────────┘
             │ cast
        ┌────▼────┐
        │ CASTING │
        └────┬────┘
             │ (cast resolves an Odù)
        ┌────▼────────┐
        │ ODU_SELECTED│
        └────┬────────┘
             │ interpret
        ┌────▼────────┐
        │ INTERPRETED │◄──┐ (re-interpret)
        └────┬────────┘   │
             │ save
        ┌────▼──┐
        │ SAVED │
        └───────┘

   Any state ──► ABANDONED
```

## Transition table

| From | Allowed to |
| --- | --- |
| `STARTED` | `AREA_SELECTED`, `ABANDONED` |
| `AREA_SELECTED` | `QUESTION_ENTERED`, `AREA_SELECTED`, `ABANDONED` |
| `QUESTION_ENTERED` | `SAFETY_ACKNOWLEDGED`, `QUESTION_ENTERED`, `ABANDONED` |
| `SAFETY_ACKNOWLEDGED` | `CASTING`, `ABANDONED` |
| `CASTING` | `ODU_SELECTED`, `ABANDONED` |
| `ODU_SELECTED` | `INTERPRETED`, `ABANDONED` |
| `INTERPRETED` | `SAVED`, `INTERPRETED`, `ABANDONED` |
| `SAVED` | `SAVED`, `ABANDONED` |
| `ABANDONED` | — (terminal) |

## Safety interaction

`enter-question` runs `screenQuestion()`. If a **blocking** category is detected
(mental-health crisis, medical emergency, harmful ritual, abuse), the UI does
not offer "continue" and instead surfaces professional resources. Non-blocking
categories (legal, financial, minor) show a warning and allow an informed
acknowledgement before `SAFETY_ACKNOWLEDGED`.

## Casting at `CASTING → ODU_SELECTED`

The cast respects the consultation's `castingMode`:
- `SIMULATED` / `LEARNING` — 8 seeded binary draws → signature → Odù.
- `USER_SELECTED` — user provides a known signature.
- `MANUAL_BABALAWO` — a verified Babalawo enters the signature.

The full cast result (mode, seed, draws, signature) is stored in
`Consultation.castingDetail` for transparency and audit.
