# Seed data plan

Implemented in [`prisma/seed.ts`](../prisma/seed.ts). The seed populates the
**fact layer** fully and the **meaning layer** only with safe, original
examples. No copyrighted text is seeded.

## What gets seeded

| Entity | Seeded | Source/permission |
| --- | --- | --- |
| **Odù** (256) | All, via the combination engine | Facts — no permission needed |
| **Theme** (10) | Sample reusable themes | Facts |
| **OduTheme** | Illustrative theme links on principal Odù | Facts |
| **Source** (original-app) | One `ORIGINAL_APP` source | `NOT_REQUIRED` |
| **Interpretation** | One **approved** original example (Èjì Ogbè) | Original app content |
| **InterpretationVersion** | v1 of the example | — |
| **ReflectionQuestion** | Two for the example | — |
| **User** | Seed admin + seed Babalawo | — |
| **Contributor** | Verified Babalawo profile | — |
| **SafetyResource** | Crisis / medical / abuse signposts | Public info |
| **Product** (5) | Free + paid + donation tiers | Payments disabled by default |

Every Odù **other than the seeded example** intentionally has **no approved
interpretation**, so the app shows the placeholder
`"This Odù has not yet been reviewed by a contributor."` This demonstrates the
gate working and reflects the real content-build strategy.

## Content-build strategy (post-seed)

1. **Facts first** — names, signatures, legs, ranks, relations, themes (done).
2. **Original summaries** — contributors author original, educational summaries
   per Odù; reviewed → approved → published.
3. **Proverbs** — culturally-shared, attributed to a source where possible.
4. **Verses (ese Ifá)** — only stored when a source's permission is
   `GRANTED`/`NOT_REQUIRED`; otherwise the slot stays empty and the UI shows a
   placeholder.
5. **Translations** — tracked to their original source + licence.

## What is explicitly NOT done

- No scraping of books or websites.
- No copying of existing published interpretations.
- No verse text stored against a `PENDING`/`DENIED` source.

## Re-running

`npm run db:seed` is idempotent (upserts by slug/email/id). `npm run db:reset`
drops, re-migrates, and re-seeds.
