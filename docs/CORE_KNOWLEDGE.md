# Online Ifá — Core Knowledge (living memory)

> **What this is.** The single, canonical knowledge base for the Ifá domain as
> Online Ifá understands it. It is **append-as-we-learn**: when we verify
> something new, we update the relevant section and add a dated entry to the
> Changelog. This file is the source of truth that informs code
> (`src/lib/odu/*`), seed data, and original interpretation content.
>
> **Two rules that never change:**
> 1. **Facts are separated from interpretation.** Record structure/names/
>    signatures as facts; record meaning separately and mark its confidence.
> 2. **Nothing copyrighted is copied.** Use open/public-domain/licensed sources
>    for facts; write all interpretation in our own words. See
>    [`CONTENT_LICENSING.md`](../CONTENT_LICENSING.md).

## How to update this file
- Put **verified, stable facts** under §1–§3. Cite the source.
- Tag meaning/themes (§5) with confidence: `[verified]` (≥2 independent
  sources), `[working]` (commonly taught), `[tentative]` (single/uncertain).
- Add unresolved items to §7 **Open questions**; log changes in §8 **Changelog**.
- When a fact here changes, update the matching code/seed and note it.
- Research method: claims are gathered by multi-source search, then
  adversarially cross-checked. Disputed claims are recorded as disputed, not
  asserted.

---

## 1. What Ifá is (verified facts)

- Ifá is a divination system and body of knowledge of the **Yorùbá** people of
  West Africa (Nigeria, Benin, Togo), with living traditions across the Americas
  (Cuba/Lukumí, Brazil, Trinidad). `[verified]`
- Inscribed on **UNESCO's Representative List of the Intangible Cultural
  Heritage of Humanity** (proclaimed 2005; inscribed 2008). `[verified]`
- The òrìṣà of wisdom and divination is **Ọ̀rúnmìlà** (Ọ̀rúnlá in Lukumí),
  regarded as the patron/first diviner; Ọ̀rúnmìlà speaks through trained
  diviners rather than directly. `[verified]`
- A diviner is a **babaláwo** ("father of secrets", m.) or **ìyánífá** (f.).
  Training is long (years of apprenticeship + initiation) and centres on
  memorising the oral corpus and mastering the instruments. `[verified]`
- Verses are **ese Ifá** — poems/stories carrying proverbs, history and
  guidance, transmitted **orally**. The corpus is open/oral; the number of ese
  per Odù **varies by source and practitioner** (commonly described as many
  dozens to hundreds). Exact totals are not canonical. `[verified: that it
  varies] / [tentative: any specific count]`

## 2. The binary structure (verified facts) — modelled in code

- Each Odù is written as **two columns ("legs")**, each of **four positions**.
- Each position is **single (one mark)** or **double (two marks)** — binary.
  Eight positions → **2⁸ = 256** total figures. Sources are unanimous on the
  structure. `[verified]`
- The **16 principal Odù** ("Méjì" / Ojú Odù / Olódù) are the figures whose two
  legs are **identical**. The other **240** ("Ọmọ Odù" / Amúlù) combine two
  different principal legs. 16 × 16 = 256. `[verified]`
- **Which mark = 0 vs 1 is a representation choice and varies by source/lineage**
  — as does which leg is "read first". We fix a single internal convention
  (below) for consistency; it is not a claim that other conventions are wrong.
  `[verified: that conventions vary]`
- The Ifá binary structure has been analysed in academic / computer-science
  literature (8 positions ≈ a byte; two legs of 4 ≈ two nibbles). `[verified]`

**Our code convention:** signature stored as `right|left`, each leg 4 chars of
`1` (single) / `2` (double); **right leg named first**; simulated cast = 8
transparent binary draws (`src/lib/casting/cast.ts`).

## 3. Instruments & process (verified facts)

- **Ìkín** — 16 sacred palm nuts. The diviner manipulates them by hand across
  **8 rounds**; the remainder (one or two) in each round marks a single/double,
  building the figure position by position. (Which remainder yields which mark
  varies by lineage.) `[verified: 16 ikin, 8 rounds] / [working: remainder→mark
  rule]`
- **Ọ̀pẹ̀lẹ̀** — a divining chain of **8 half-seeds/pods** in two sets of four;
  **one throw** yields a complete Odù (each pod shows its concave or convex
  face). Faster than ìkín. `[verified]`
- **Ọpọn Ifá** — the (often round) carved divination tray. `[verified]`
- **Ìyẹ̀rọ̀sùn** — fine divining powder spread on the tray; the diviner traces
  the marks in it. `[verified]`
- **Ìrókè** — the tapper used to invoke Ọ̀rúnmìlà at the start of divination.
  `[verified]`
- **Process (high level):** invocation → cast (ọ̀pẹ̀lẹ̀ in one throw, or ìkín
  over 8 rounds) → identify the resulting Odù → the diviner recalls and applies
  relevant ese; further casts may refine the reading. We model this honestly and
  claim no spiritual authority. `[verified]`

## 4. The 16 principal Odù (verified facts)

Seniority order = widely-cited **West African (Abimbola / Yorùbá)** ordering;
multiple independent sources agree. Signatures are a single leg (both legs
identical for Méjì) in our `1`=single / `2`=double convention.

| # | Name | Slug | Signature | Common epithet `[working]` | Alt / Lukumí spellings |
|---|------|------|-----------|----------------------------|------------------------|
| 1 | Èjì Ogbè | `ogbe-meji` | 1111 | "the supporter" / pure light | Eji Ogbe, Eyiogbe |
| 2 | Ọ̀yẹ̀kú Méjì | `oyeku-meji` | 2222 | end of a cycle | Oyeku, Oyekun |
| 3 | Ìwòrì Méjì | `iwori-meji` | 2112 | the deep seer | Iwori |
| 4 | Òdí Méjì | `odi-meji` | 1221 | the seal | Edi, Idi |
| 5 | Ìrosùn Méjì | `irosun-meji` | 1122 | protector of the head | Iroso, Irosu |
| 6 | Ọ̀wọ́nrín Méjì | `owonrin-meji` | 2211 | the reversed head | Owanrin, Ojuani, Owani |
| 7 | Ọ̀bàrà Méjì | `obara-meji` | 1222 | strength / the hovering one | Obara |
| 8 | Ọ̀kànràn Méjì | `okanran-meji` | 2221 | the beater of sticks | Okonron, Okana |
| 9 | Ògúndá Méjì | `ogunda-meji` | 1112 | iron / clearing the path | Oguda, Ogunda |
| 10 | Ọ̀sá Méjì | `osa-meji` | 2111 | sudden change | Osa |
| 11 | Ìká Méjì | `ika-meji` | 2122 | the controller | Ika |
| 12 | Òtúrúpọ̀n Méjì | `oturupon-meji` | 2212 | the bearer | Otorupon, Otrupon, Ologbon |
| 13 | Òtúrá Méjì | `otura-meji` | 1211 | the comforter | Otua, Otura |
| 14 | Ìrẹtẹ̀ Méjì | `irete-meji` | 1121 | vitality / long life | Irete, Irette |
| 15 | Ọ̀ṣẹ́ Méjì | `ose-meji` | 1212 | fertility / sweetness | Oshe, Oche, Ose |
| 16 | Òfún Méjì | `ofun-meji` | 2121 | the giver / white light | Ofun, Ọ̀ràngún, Orangun |

> Authoritative copy lives in `src/lib/odu/primary.ts`. **If a row changes here,
> change it there too** (and re-seed). Epithets are translative/interpretive and
> vary by source — treat as `[working]`.

### Ordering across traditions (partially resolved)
The **Cuban/Lukumí** tradition uses **parallel names** for the same 16 figures,
with consistent spelling differences (Ejiogbe/Eyiogbe, Oyekun, Iroso, **Ojuani =
Owonrin** at position 6, Okana, Otrupon, Oche, etc.). Whether the full
**seniority order** is identical to the West African order is **still not
cleanly settled** across our authoritative sources — accounts differ, and this
is partly a naming vs. ordering confusion. **We therefore do not assert the
orders are identical.** We adopt the West African order, store Lukumí spellings
as `altNames` for search, and keep full ordering equivalence as an open item
(§7). `[working]`

## 5. Meaning & themes (informs our ORIGINAL summaries)

These are the **commonly-taught themes** synthesised into our own original
summaries (`src/lib/odu/interpretations.ts`) — **not** copied text. A focused
multi-source review found **strong cross-source agreement** for all 16
(typically 3+ independent educational/practitioner sources), so most are now
`[verified]`. Where present, a **commonly-associated òrìṣà** is noted `[working]`.

| Odù | Core themes | Associated òrìṣà `[working]` | Confidence |
|-----|-------------|------------------------------|-----------|
| Èjì Ogbè | light, beginnings, clarity, leadership, alignment with destiny | — | `[verified]` |
| Ọ̀yẹ̀kú Méjì | endings, the close of a cycle, transformation, renewal | (Ikú / death, thematically) | `[verified]` |
| Ìwòrì Méjì | deep insight, transformation, inner fire, hidden truth | — | `[verified]` |
| Òdí Méjì | foundation, containment/sealing, protection, boundaries | — | `[verified]` |
| Ìrosùn Méjì | ancestry, lineage, memory, grounding in the past | — | `[verified]` |
| Ọ̀wọ́nrín Méjì | change, disruption, chaos→clarity, adaptation | — | `[verified]` (emphasis varies) |
| Ọ̀bàrà Méjì | strength, speech/communication, abundance, integrity | — | `[verified]` |
| Ọ̀kànràn Méjì | courage, focus, decisive/directed change, consequences | — | `[verified]` (older sources framed negatively) |
| Ògúndá Méjì | clearing the path, decisive action, labour, justice | **Ògún** (iron) | `[verified]` |
| Ọ̀sá Méjì | sudden change, storms/lightning, resilience, revealed truth | **Ṣàngó / Ọya** | `[verified]` |
| Ìká Méjì | discernment, ethical use of power, ethical speech, caution | — | `[verified]` |
| Òtúrúpọ̀n Méjì | endurance, burdens, humility, perseverance | — | `[working]` (some interpretive variation) |
| Òtúrá Méjì | peace, harmony, wisdom, reconciliation, vision | — | `[verified]` |
| Ìrẹtẹ̀ Méjì | vitality, long life, prosperity, hope, gratitude | — | `[verified]` |
| Ọ̀ṣẹ́ Méjì | fertility, increase, sweetness, nurturing, sacrifice | **Ọ̀ṣun** (rivers) | `[verified]` |
| Òfún Méjì | ancient wisdom, blessing, completion, origins, generosity | — | `[verified]` |

> **Next:** confirm the `[working]` rows, capture tradition-specific nuance
> (esp. Lukumí), and begin theme notes for the most-referenced **combined** Odù.

## 6. Source registry (where facts come from)

Detailed notes in [`IFA_RESEARCH.md`](IFA_RESEARCH.md). Posture by tier:

**Reusable (with attribution):**
- **Wikipedia** — *Ifá*, *Odu Ifa* — **CC BY-SA** (4.0; older edits 3.0). Facts +
  text reusable with attribution + share-alike. `permission GRANTED`.
- **African Traditional Religions Textbook: Ifa** (Pressbooks/OER) —
  **CC BY-NC 4.0**, attribution to Will Coleman & Awo Fa'lokun Fatunmbi,
  **non-commercial only**. Educational reuse with care. `permission GRANTED (NC)`.

**Public domain (facts + text usable; pre-1929 US publication):** registered in
`src/lib/sources/publicDomain.ts`, seeded as `Source` rows, and surfaced to
users at `/library`.
- **Samuel Johnson, *The History of the Yorubas* (1921)** — Yorùbá-authored;
  `historyofyorubas00john` on archive.org. Preferred over the colonial works.
- A. B. Ellis, *The Yoruba-Speaking Peoples of the Slave Coast* (1894) —
  `yorubaspeakingpe0000elli`.
- R. E. Dennett, *Nigerian Studies* (1910) — `nigerianstudieso00dennuoft`.
- Leo Frobenius, *The Voice of Africa* (1913) — `voiceofafricabei01frob`.
  (Colonial-era works: treat interpretation critically; use for historical/
  structural facts. Verbatim passages must be added by a contributor with an
  exact page citation and reviewed.) `permission NOT_REQUIRED`.

**Facts/attribution only — DO NOT copy text (all rights reserved):**
- Abimbola, *Ifá: An Exposition…* (1976), *Ifá Divination Poetry* (1977).
- Owomoyela, *Yoruba Proverbs* (2005), *A Kì í* (1988).
- Lucas, *The Religion of the Yorubas* (1948).
- UNESCO ICH page (facts referenced; text not stored). `permission PENDING`.

**Proverbs / ese Ifá:** only from public-domain or oral-tradition sources, in
our **own** translations; never from the copyrighted collections above.

## 7. Open questions / to research next
- [ ] Resolve the **Lukumí vs West African ordering** question with authoritative
      sources; document differences explicitly (esp. position 6 Owonrin/Ojuani).
- [ ] Promote `[working]` theme rows (Òtúrúpọ̀n) to `[verified]`; capture
      tradition-specific nuance.
- [ ] Confirm/curate **associated òrìṣà** per Odù from authoritative sources.
- [ ] Source genuinely **public-domain ese Ifá** and **traditional proverbs**
      (oral tradition) with our own English renderings + careful diacritics.
- [ ] Begin **combined-Odù** meaning notes (start with most-referenced).
- [ ] Verify the **ìkín remainder→mark** rule across lineages.
- [ ] Have a Yorùbá-language reviewer verify diacritics/orthography of all names.

## 8. Changelog
- **2026-07-18 (consultation flow works without a database)** — Fixed: the
  animated cast (Ọ̀pẹ̀lẹ̀/Ìkín) silently failed anywhere the app ran without
  Postgres, because every step of `/consult` (mode → area → question →
  safety → cast → interpret) round-tripped through a DB-backed `Consultation`
  row before anything could render. Rewrote `ConsultationFlow.tsx` to run
  that whole walkthrough client-side by default — same real logic
  (`src/lib/casting/cast.ts`, `src/lib/safety/guardrails.ts`,
  `src/lib/odu/facts.ts`), same original interpretation text
  (`src/lib/odu/interpretations.ts`, surfaced via the new
  `src/lib/interpretation/localDisplay.ts`), just executed in the browser
  instead of via `fetch`. No account or database is needed to take a full
  guest reading. **"Save consultation" is now the only step that touches the
  database** — it lazily creates a `Consultation` and replays the same
  inputs (same seed for SIMULATED/LEARNING, so the signature matches
  exactly) through the real, audited state-machine API, and fails
  gracefully in place if the database is unavailable without losing the
  reading already on screen. `cast.ts` and `guardrails.ts` switched their
  `@prisma/client` enum imports to `import type` so they stay safe to bundle
  for the client.
- **2026-07-18 (IFA LAB becomes the site design)** — Retired the standalone
  `/lab` showcase (redirects to `/`, `next.config.mjs`) and adopted its
  visual language as the real site's design everywhere: home, `/learn`,
  `/odu`, `/odu/[slug]`, `/consult`, `/library`, plus four new real routes —
  `/graph`, `/history`, `/games`, `/museum` — carrying the sections that
  previously only existed inside the demo. Two route groups now split the
  app: `(full)` for the full-bleed IFA LAB-styled pages, `(site)` for
  utility pages (search, admin, auth) that keep the plain centered layout.
  The consultation flow's SIMULATED/LEARNING casting modes now replay the
  **real, server-decided signature** through the chain-swing / nut-striking
  animation (`src/components/CastingStage.tsx`) instead of a separate
  client-side random draw — the state machine, safety screening,
  interpretation gating, and every API route are unchanged; only the "cast"
  step's presentation and pacing changed. Lab's static editorial content
  (facets, math topics, CS comparisons, timeline eras, graph nodes, museum
  items, glossary, IFÀGRÌTHM field notes) moved into `src/lib/content/*` as
  shared, reusable modules; `src/lib/odu/glyph.ts` centralises the
  signature-to-mark-glyph helpers used across `/odu`, `/learn` and `/games`.
  IFÀGRÌTHM field notes (§ below) are original paraphrase with credited
  sources — no verbatim transcript — carried over unchanged from the /lab
  implementation; flagging here per this file's sourcing-log convention.
- **2026-07-17 (IFA LAB interactive platform)** — Implemented the full-bleed
  `/lab` experience from the Claude Design handoff (`IFA LAB.dc.html`):
  animated ọ̀pẹ̀lẹ̀/ìkín consultation simulator with a step-by-step "show your
  working" log, a 0–255 binary explorer, a searchable 256-Odù grid, a clickable
  knowledge graph, a horizontal history timeline, Ifá ↔ CS comparison cards,
  learning games with badges, museum image slots, and an "Ifàgrìthm" field-notes
  section pairing claims from the Adégbọlá conversation (Waa Sere interview)
  with what independent research shows — each claim carries its caveat and a
  source link (Lóngẹ́ 1983 lecture framing, Ulm ọpọn Ifá ~1650, Miller 1956,
  Abímbọ́lá's verse structure). All lab copy is original; structure facts reuse
  `src/lib/odu/*`. Existing pages moved under the `(site)` route group so the
  lab page owns its own chrome; URLs unchanged.
- **2026-06-08 (public-domain library)** — Verified and registered four
  public-domain books on archive.org (Johnson 1921, Ellis 1894, Dennett 1910,
  Frobenius 1913) in `src/lib/sources/publicDomain.ts`; seeded them as
  `Source` rows (PUBLIC_DOMAIN, permission NOT_REQUIRED) and surfaced them to
  users at `/library`. Recorded the Lukumí ordering finding (parallel names;
  full seniority equivalence still open). Shipped the admin approve/reject UI
  and wired the live (flag-gated) AI assistant model call. No verbatim text was
  extracted from the books — passages await cited contributor submissions.
- **2026-06-08 (deep research pass)** — Ran a 5-angle, multi-source, adversarially
  cross-checked research pass. Promoted §1–§4 to `[verified]` (structure, binary
  system, instruments/process, 16-Odù order + signatures — matching
  `src/lib/odu/primary.ts`). Promoted most §5 theme rows to `[verified]` (3+
  independent sources; our 16 themes confirmed). Added epithets, Lukumí spelling
  variants, and commonly-associated òrìṣà as `[working]`. Recorded the
  **Lukumí-ordering** claim as **disputed** (not asserted) and kept the alternate
  binary convention out (kept our verified signatures, noted conventions vary).
  Expanded the source registry into licence tiers, incl. public-domain
  ethnographies (Ellis 1894, Dennett 1910, Frobenius 1913) and the OER textbook
  (CC BY-NC 4.0).
- **2026-06-08** — Created this living knowledge base; locked initial facts
  against Wikipedia / UNESCO / OER / academic sources.
