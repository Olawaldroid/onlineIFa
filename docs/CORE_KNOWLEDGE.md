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
  building the figure position by position. **Remainder→mark rule `[verified]`
  (Bascom 1969, ch. I, corroborating the descriptions he reviews): if TWO nuts
  remain, ONE mark (ǀ); if ONE nut remains, TWO marks (ǁ)** — exactly as
  implemented in our consultation flow. `[verified: 16 ikin, 8 rounds,
  remainder rule]`
- **Ọ̀pẹ̀lẹ̀** — a divining chain of **8 half-seeds/pods** in two sets of four;
  **one throw** yields a complete Odù. Convention `[verified]` (Bascom 1969,
  ch. I): concave face UP = single mark; convex UP = double mark — as our
  casting stage shows. Faster than ìkín. `[verified]`
- **Ọpọn Ifá** — the (often round) carved divination tray. Its border divides
  into **nine named sections**: the **ojú ọpọn** ("face of the tray", opposite
  the diviner) always bears the face of Èṣù; **ẹsẹ̀ ọpọn** ("foot") is nearest
  the diviner; **ọ̀nà ọ̀gánrán** and **ọ̀nà múnú** flank the sides (Pogoson &
  Akande 2011, open access, after Drewal/Pemberton/Abiodun 1989). Regional
  styles differ (Ijebu: Èṣù's face protrudes into the centre; Osogbo: contained
  in the border; Ọ̀yọ́ combines both). Ìyẹ̀rọ̀sùn comes from the irosun tree or
  termite-powdered bamboo. `[verified]`
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
- **Reference shelf (2026-07-18, digital copies held privately in the owner's
  Drive — NOT in the repo, NOT served by the site):** registered in
  `src/lib/sources/references.ts` and listed at `/library`. Highlights:
  **Bascom, *Ifa Divination* (1969)** — now our primary fact-checking
  reference (procedure, ordering conventions, 186 verses); **Abraham,
  *Dictionary of Modern Yoruba* (1958)** — orthography/tone-mark authority;
  Gleason (1973); Emanuel, *Ọdun Ifá* (2000); Ibie, *Ifism* vols 1 & 8–9;
  Fatunmbi (*Orí*, *Èṣù-Ẹlẹ́gbà*); Karade (EN + PT eds.); Nei Lopes, *Ifá
  Lucumí* (2020, PT — bears on the open Lukumí-ordering question); Aderonmu
  (PT); Matias; Silva (popular intro — never a sole fact source); and an
  Isale-Ọyọ divination-trays article (museum iconography). All
  `permission PENDING`, facts + attribution only.

**Proverbs / ese Ifá:** only from public-domain or oral-tradition sources, in
our **own** translations; never from the copyrighted collections above.

## 7. Open questions / to research next
- [x] **Lukumí vs West African ordering — RESOLVED (2026-07-18).** Bascom's
      survey of 86 recorded lists found **one predominant order** (ours) across
      Yorubaland **and in 5 of 6 Cuban lists** (Bascom 1969, ch. XI); Nei Lopes
      (2020) likewise lists the Lucumí méjì names (Eyiogbe, Oyekun, Iwori, Odi,
      Iroso, Ojuani, Obara, Okana, Ogunda, Osa, Iká, Otrupon, Otura, Irete,
      Oche, Ofún) in the same seniority order — all already present in our
      `altNames`. Local variants exist and are documented, e.g. **Ilorin**
      places Ọbàrà 5th instead of 7th (Lopes 2020). Related practice note
      `[working]`: Lopes records that the name of the Odù combining the 14th
      and 15th figures is traditionally never spoken aloud.
- [x] **Ìkín remainder→mark rule — VERIFIED (2026-07-18)** against Bascom 1969:
      two nuts remain → single mark; one remains → double mark. Matches our
      implementation (`ConsultationFlow`). Seniority itself is explained as
      birth order — "the order in which they were born and came into the
      world" (diviner quoted in Bascom 1969, ch. XI); Gleason (1973) records
      the first four méjì as "roots" symbolising cosmic organization.
- [ ] Promote `[working]` theme rows (Òtúrúpọ̀n) to `[verified]`; capture
      tradition-specific nuance.
- [ ] Confirm/curate **associated òrìṣà** per Odù from authoritative sources.
- [ ] Source genuinely **public-domain ese Ifá** and **traditional proverbs**
      (oral tradition) with our own English renderings + careful diacritics.
- [ ] Begin **combined-Odù** meaning notes (start with most-referenced).
- [ ] Verify the **ìkín remainder→mark** rule across lineages.
- [ ] Have a Yorùbá-language reviewer verify diacritics/orthography of all names.

## 8. Changelog
- **2026-07-18 (every Odù readable; contributions durable and everywhere)** —
  (1) `resolveLocalDisplay` now returns content for all 256 Odù with no DB:
  the 16 reviewed méjì originals as before, plus an **original structural
  reading** for each of the 240 combined Odù composed from its two legs'
  reviewed summaries (right-leg seniority stated, themes merged, honest note
  that a fuller reviewed interpretation is pending) — used by consultation
  results AND `/odu/[slug]` pages (previously placeholder). (2) New
  `src/lib/odu/combinedNotes.ts` for multi-source-verified notes on specific
  combined Odù — first entry **Ọ̀ṣẹ́tùrá** (messenger Odù, tied to Èṣù,
  carries sacrifice: Gleason 1973 + Fatunmbi, echoed across the shelf); plus
  Bascom's "child of the right leg" framing in every composed reading, and two
  Lopes-documented contracted names added to the engine (Ìdígbè = Òdí-Ogbè,
  Ogbè Yọ́nú = Ogbè-Ògúndá). (3) `GET /api/interpretations?odu=` returns the
  best published interpretation (gated DB → approved contribution) and the
  consultation flow upgrades its result with it, so approved contributions
  reach consultations. (4) Contribution store gained a **Vercel Blob** backend
  (auto-selected when `BLOB_READ_WRITE_TOKEN` exists) — submissions and admin
  review decisions now persist permanently on Vercel with no database.
  (5) Admin pages no longer show dev-mode/storage banners.
- **2026-07-18 (research pass over the full "Ifá brain" corpus — 20 files, 19
  unique works)** — Extracted and indexed text for 15 works (EPUBs unpacked in
  full; scanned PDFs via OCR extraction, partial for the longest). New to the
  shelf since the morning registration: **Olupona & Abiodun (eds.) 2016**,
  **Abímbọ́lá, *Ifá Divination Poetry* 1977**, Frisvold, Plöger (PT). Not yet
  extractable: Abraham 1958 (57 MB scan, extractor returns empty), Plöger &
  Matias EPUBs (>10 MB download cap), Karade PT (repeated API session errors).
  **Findings applied:** (1) ìkín remainder rule verified and §3 promoted;
  (2) ọ̀pẹ̀lẹ̀ concave/convex convention verified (Bascom); (3) Lukumí-ordering
  question RESOLVED (§7) via Bascom's 86-list survey + Lopes 2020, with the
  Ilorin variant documented; (4) our 16-Odù order independently confirmed by
  Gleason 1973's structure; (5) tray iconography facts added to §3 and the
  museum copy from **Pogoson & Akande 2011**, which turned out to be OPEN
  ACCESS (journals.openedition.org/cea/196) — registry entry upgraded with the
  full citation; (6) the Fatunmbi "Èṣù" file identified as *Warrior Spirit*
  (Ifá Theology vol. 3) and its registry entry corrected. Extracted texts live
  only in the session scratchpad — never committed.
- **2026-07-18 (reference shelf: 14 copyrighted works registered)** — The
  project owner supplied digital copies (private Drive; folder shared with the
  agent session) of 14 in-copyright works incl. **Bascom 1969** (the landmark
  study), **Abraham 1958** (Yorùbá dictionary), Gleason 1973, Emanuel 2000,
  Ibie's *Ifism* vols 1/8–9, Fatunmbi's *Orí* and *Èṣù* monographs, Karade
  (EN/PT), Nei Lopes 2020 (Lukumí), Aderonmu, Matias, Silva, and an Isale-Ọyọ
  tray-corpus article. Registered as facts-only references in
  `src/lib/sources/references.ts`, surfaced at `/library` under
  `REFERENCE · FACTS ONLY`, added to §6. Copies are NOT committed or served —
  copyright. Text extraction verified (both born-digital and scanned copies
  are readable), so these can now back fact-checking of §§1–5 and the open
  questions in §7 (Bascom for ordering/ìkín-rule verification; Abraham for
  the diacritics audit; Lopes for the Lukumí ordering).
- **2026-07-18 (contributions work without a database)** — Added a file-backed
  contribution store (`src/lib/contributions/store.ts`, JSON at
  `data/contributions.json`, temp-dir fallback on read-only filesystems). When
  Postgres is unreachable: `/contribute` submissions land in the file store,
  `/admin` + `/admin/interpretations` show live counts and a working review
  queue from it (approve / request changes / reject via the existing
  `ReviewActions` → `PATCH /api/interpretations/sub_…/review`), and approved
  submissions publish on the Odù detail page through `getOduDetail`. Review
  gates preserved: only APPROVED + unflagged content is shown; file
  submissions have no external source (permission NOT_REQUIRED by
  construction); admin sessions still required when `AUTH_ENFORCED=true`;
  every transition appends to the submission's `events` audit list. Documented
  in `docs/ADMIN_WORKFLOW.md`.
- **2026-07-18 (nav cleanup, ọpọn hero, museum expansion, guest-only gate)** —
  Grouped the 12-link nav into Learn/Explore dropdowns + three standalone links
  (the flat "Consultation" link was redundant with the CTA). Rebuilt the
  homepage hero emblem as a carved ọpọn Ifá (notched rim, Èṣù face at the head,
  ìyẹ̀rọ̀sùn sand centre with pressed marks) sharing the CastingStage tray
  language; animations unchanged. Expanded `/museum` from 5 cards to three
  sections: the five instruments (ìkín + agéré slots now filled — Jogo de Ikin
  Orossi photo; MET 1991.17.127 Àgéré Ifá, CC0), a worldwide-collections
  gallery (Brooklyn, Cologne, Munich, Nigerian collections) and a
  living-tradition section (babaláwo at work, Osun-Osogbo grove — UNESCO WHS).
  All images are openly-licensed Wikimedia Commons files, credited and linked;
  `<Photo>` still degrades to a placeholder if a URL fails. Onboarding
  disclaimer now has a single "Accept & continue" (guest) action — account
  creation removed from the gate (sign-up still exists at `/signup`).
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
