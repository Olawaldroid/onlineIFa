# AI retrieval plan

The assistant is a **retrieval-augmented** helper, not an oracle. Its hard rules
are enforced in code, not merely prompted. See
[`src/lib/ai/retrieval.ts`](../src/lib/ai/retrieval.ts) and
[`src/app/api/assistant/route.ts`](../src/app/api/assistant/route.ts).

## Hard rules

1. **Never invents Odù.** Only Odù that exist in the database are addressable.
2. **Approved content only.** Retrieval returns interpretations with
   `reviewStatus = APPROVED`, not `flagged`, and verses whose source permission
   is `GRANTED`/`NOT_REQUIRED`. Nothing else is readable.
3. **Always cites** the Odù, the source, and the interpretation used.
4. **Says when content is missing** — returns `contentMissing: true` and never
   fabricates.
5. **Never claims to replace a Babalawo.**

## Pipeline

```
user question + oduSlug
        │
        ▼
retrieveForOdu(slug)         ← the ONLY gate the model reads through
        │  (Prisma query filtered by reviewStatus + permission)
        ▼
┌──────────────────────────────┐
│ odu not found  → "cannot answer", contentMissing                │
│ no approved content → say so, give factual signature only       │
│ approved content → build context (interpretations + verses)     │
└──────────────────────────────┘
        │
        ▼
if AI_ASSISTANT_ENABLED:
    call model with AI_SYSTEM_PROMPT + context ONLY → cited answer
else:
    return deterministic, fully-cited summary of the approved content
```

## Capabilities

Within retrieved context the assistant can **explain, compare, summarise,
translate, and ask reflection questions**. It cannot perform divination or
assert spiritual authority; such requests are declined with an explanation.

## Configuration

| Env var | Meaning |
| --- | --- |
| `AI_ASSISTANT_ENABLED` | `false` by default; gates the model call |
| `AI_PROVIDER` / `AI_MODEL` | provider + model id (e.g. `claude-opus-4-8`) |
| `ANTHROPIC_API_KEY` | provider key |

When disabled, the assistant still works in a safe, non-fabricating mode by
returning the approved content verbatim with citations. This keeps the flow
present from day one without risking unapproved output.

## Why retrieval, not fine-tuning

Fine-tuning on Ifá texts would risk reproducing copyrighted material and would
blur the facts/meaning boundary. Retrieval over an explicitly-permissioned store
keeps every answer traceable to an approved, attributed source.
