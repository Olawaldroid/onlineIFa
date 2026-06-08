# Online Ifá — Core Knowledge (living memory)

> **What this is.** The single, canonical knowledge base for the Ifá domain as
> Online Ifá understands it. It is **append-as-we-learn**: every time we verify
> something new, we update the relevant section and add a dated entry to the
> Changelog at the bottom. This file is the source of truth that informs code
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
- Put **meaning/themes** under §4 with a **confidence tag**:
  `[verified]` (multiple independent sources), `[working]` (commonly taught,
  needs more confirmation), `[tentative]` (single source / uncertain).
- Add anything unresolved to §6 **Open questions**.
- Add a dated line to §7 **Changelog** describing what changed and why.
- When a fact here changes, update the matching code/seed and note it.

---

## 1. What Ifá is (verified facts)

- Ifá is a divination system and body of knowledge of the **Yorùbá** people of
  West Africa (Nigeria, Benin, Togo), with living traditions across the Americas
  (Cuba/Lukumí, Brazil, Trinidad). `[verified]`
- Inscribed on **UNESCO's Representative List of the Intangible Cultural
  Heritage of Humanity** (proclaimed 2005; inscribed 2008). `[verified]`
- A diviner is a **babaláwo** (m.) or **ìyánífá** (f.). The orisha of wisdom
  associated with Ifá is **Ọ̀rúnmìlà**. `[verified]`
- Divination uses either **ìkín** (sacred palm nuts) or the **ọ̀pẹ̀lẹ̀**
  (divining chain of eight half-seeds). `[verified]`
- Verses are **ese Ifá** — poems/stories carrying proverbs, history and
  guidance, transmitted **orally**; many hundreds exist per Odù. `[verified]`

## 2. The binary structure (verified facts) — modelled in code

- Each Odù is written as **two columns ("legs")**, each of **four positions**.
- Each position is **single (one mark)** or **double (two marks)** — binary.
  Eight positions → **2⁸ = 256** total figures. `[verified]`
- The **16 principal Odù** ("Méjì" / Olódù) are the figures whose two legs are
  **identical**. The other **240** ("Ọmọ Odù" / Amúlù) combine two different
  principal legs. 16 × 16 = 256. `[verified]`
- Casting: with **ọ̀pẹ̀lẹ̀**, one throw drops eight half-seeds (two legs of four)
  as single/double; with **ìkín**, the diviner grasps the palm nuts repeatedly,
  marking one or two each round until a full figure forms. `[verified]`
- **Our code model:** signature stored as `right|left`, each leg 4 chars of
  `1` (single) / `2` (double). Simulated cast = 8 transparent binary draws
  (`src/lib/casting/cast.ts`). Convention: **right leg named first**.

## 3. The 16 principal Odù (verified facts)

Seniority order = widely-cited **West African (Abimbola)** ordering. Signatures
are a single leg (both legs identical for Méjì); `1`=single, `2`=double.

| # | Name | Slug | Signature | Common alt spellings |
|---|------|------|-----------|----------------------|
| 1 | Èjì Ogbè | `ogbe-meji` | 1111 | Ogbè Méjì, Eji Ogbe |
| 2 | Ọ̀yẹ̀kú Méjì | `oyeku-meji` | 2222 | Oyeku Meji |
| 3 | Ìwòrì Méjì | `iwori-meji` | 2112 | Iwori Meji |
| 4 | Òdí Méjì | `odi-meji` | 1221 | Edi Meji |
| 5 | Ìrosùn Méjì | `irosun-meji` | 1122 | Iroso Meji |
| 6 | Ọ̀wọ́nrín Méjì | `owonrin-meji` | 2211 | Owanrin Meji |
| 7 | Ọ̀bàrà Méjì | `obara-meji` | 1222 | Obara Meji |
| 8 | Ọ̀kànràn Méjì | `okanran-meji` | 2221 | Okonron Meji |
| 9 | Ògúndá Méjì | `ogunda-meji` | 1112 | Oguda Meji |
| 10 | Ọ̀sá Méjì | `osa-meji` | 2111 | Osa Meji |
| 11 | Ìká Méjì | `ika-meji` | 2122 | Ika Meji |
| 12 | Òtúrúpọ̀n Méjì | `oturupon-meji` | 2212 | Otorupon, Ologbon |
| 13 | Òtúrá Méjì | `otura-meji` | 1211 | Otua Meji |
| 14 | Ìrẹtẹ̀ Méjì | `irete-meji` | 1121 | Irete Meji |
| 15 | Ọ̀ṣẹ́ Méjì | `ose-meji` | 1212 | Oshe Meji |
| 16 | Òfún Méjì | `ofun-meji` | 2121 | Ọ̀ràngún Méjì |

> Authoritative copy lives in `src/lib/odu/primary.ts`. **If a row changes here,
> change it there too** (and re-seed).

## 4. Meaning & themes (working knowledge — informs ORIGINAL summaries)

These are the **commonly-taught themes** we synthesise into our own original
summaries (`src/lib/odu/interpretations.ts`). They are **not** copied text.

| Odù | Themes | Confidence |
|-----|--------|-----------|
| Èjì Ogbè | light, beginnings, clarity, leadership | `[working]` |
| Ọ̀yẹ̀kú Méjì | endings, rest, renewal, the close of a cycle | `[working]` |
| Ìwòrì Méjì | deep insight, self-knowledge, inner fire | `[working]` |
| Òdí Méjì | foundation, containment, protection, family | `[working]` |
| Ìrosùn Méjì | memory, ancestry, grounding in the past | `[working]` |
| Ọ̀wọ́nrín Méjì | change, disruption, reversal, renewal | `[working]` |
| Ọ̀bàrà Méjì | speech, strength, influence, communication | `[working]` |
| Ọ̀kànràn Méjì | focus, decisive change of direction | `[working]` |
| Ògúndá Méjì | clearing the path, decisive action, courage | `[working]` |
| Ọ̀sá Méjì | sudden change, outside forces, resilience | `[working]` |
| Ìká Méjì | discernment, ethical use of power, caution | `[working]` |
| Òtúrúpọ̀n Méjì | endurance, courage, burdens carried | `[working]` |
| Òtúrá Méjì | peace, harmony, wisdom, reconciliation | `[working]` |
| Ìrẹtẹ̀ Méjì | vitality, long life, hope, fullness of life | `[working]` |
| Ọ̀ṣẹ́ Méjì | fertility, increase, the value of sacrifice | `[working]` |
| Òfún Méjì | ancient wisdom, blessing, origins, generosity | `[working]` |

> **Goal:** promote each row toward `[verified]` as we confirm themes across
> multiple independent, openly-licensed sources — and expand to the 240 combined
> Odù over time.

## 5. Source registry (where facts come from)
Maintained in detail in [`IFA_RESEARCH.md`](IFA_RESEARCH.md) and seeded as
`Source` rows. Summary of permission posture:
- **Wikipedia (Ifá / Odu Ifa)** — CC BY-SA 4.0 → usable for facts **with
  attribution**; permission `GRANTED`.
- **UNESCO ICH**, **Abimbola**, peer-reviewed papers — **facts/attribution
  only**, not copied; permission `PENDING` so they can never back published
  verse text.
- **Proverbs/verses** — only from public-domain / oral-tradition or
  permission-`GRANTED` sources, in our own translations.

## 6. Open questions / to research next
- [ ] Confirm per-Odù themes across ≥2 independent open sources (promote to
      `[verified]`); record disagreements between traditions.
- [ ] Document the **Cuban/Lukumí ordering** and spelling variants explicitly,
      and decide how to surface tradition differences in the UI.
- [ ] Identify genuinely **public-domain ese Ifá** (or secure permission) before
      storing any verse text.
- [ ] Source a small set of **traditional Yorùbá proverbs** (oral tradition)
      with careful diacritics + our own English renderings.
- [ ] Begin **combined-Odù** meaning notes (start with the most-referenced).
- [ ] Verify diacritics/orthography of all names with a Yorùbá-language source.

## 7. Changelog
- **2026-06-08** — Created this living knowledge base. Locked §1–§3 facts
  (structure, 16 principal Odù + signatures) against Wikipedia / UNESCO / OER /
  academic sources; matched them to `src/lib/odu/primary.ts`. Captured §4 themes
  as `[working]` (informing the 16 original seeded interpretations). Seeded the
  source registry and seeded reference `Source` rows with permission status.
