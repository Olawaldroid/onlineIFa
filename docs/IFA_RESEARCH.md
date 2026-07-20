# Ifá research notes & open-source registry

This document records the **factual grounding** used to build Online Ifá and a
**curated list of sources** with their licence/permission status. It exists to
keep the project honest about where facts come from and to keep the
facts/interpretation boundary clean.

> **Method:** We use these sources for *facts* (structure, names, instruments)
> and to understand widely-shared cultural *themes*. Interpretation content is
> original (`src/lib/odu/interpretations.ts`) or contributor-submitted and
> reviewed. A small number of Ẹsẹ passages are quoted from explicitly licensed
> sources through a separate page-cited provenance manifest. Sources marked
> copyrighted are cited for facts/attribution only.

---

## 1. What Ifá is (factual summary)

- **Ifá** is a divination system and body of knowledge of the Yoruba people of
  West Africa (notably Nigeria, Benin, Togo), with living traditions across the
  Americas (Cuba/Lukumí, Brazil, etc.). It is inscribed on UNESCO's
  Representative List of the Intangible Cultural Heritage of Humanity (2008).
- A diviner (**babaláwo** / **ìyánífá**) consults Ifá using either the
  **ìkín** (sacred palm nuts) or the **ọ̀pẹ̀lẹ̀** (a divining chain).
- The corpus is organised into **256 Odù**. Each Odù has many **ese Ifá**
  (verses): poems/stories carrying proverbs, history and guidance, transmitted
  **orally**. Estimates commonly cite hundreds of ese per Odù.

## 2. The binary structure (the part we model as fact)

- Each Odù is written as **two columns ("legs")**, each of **four positions**.
- Each position is marked **single (one)** or **double (two)** — a binary
  choice. Eight binary positions → **2⁸ = 256** possible figures.
- The **16 principal Odù** ("Méjì"/Olódù) are the figures whose two legs are
  identical. The remaining **240** are combinations of two different principal
  legs (right leg + left leg). 16 × 16 = 256.
- With the **ọ̀pẹ̀lẹ̀**, eight seed-pods (two sets of four) fall single/double in
  one throw. With **ìkín**, the diviner repeatedly grasps the palm nuts and
  marks one or two until a full figure is formed. Our `SIMULATED` cast mirrors
  the eight-binary-draw structure transparently (see `src/lib/casting/cast.ts`).

This binary structure is well documented and has been analysed in computer
science / mathematics literature (e.g. comparisons to 8-bit binary).

## 3. The 16 principal Odù (names, order, signatures)

Order of **seniority** follows the widely-cited West African (Abimbola)
ordering. Signatures use our notation (`1` = single mark, `2` = double; both
legs identical for Méjì):

| # | Name | Signature (leg) | Common teaching theme (for original summaries) |
|---|------|-----------------|-----------------------------------------------|
| 1 | Èjì Ogbè | 1111 | light, beginnings, clarity |
| 2 | Ọ̀yẹ̀kú Méjì | 2222 | endings, rest, renewal |
| 3 | Ìwòrì Méjì | 2112 | insight, depth, transformation |
| 4 | Òdí Méjì | 1221 | foundation, protection, family |
| 5 | Ìrosùn Méjì | 1122 | memory, ancestry, grounding |
| 6 | Ọ̀wọ́nrín Méjì | 2211 | change, disruption, renewal |
| 7 | Ọ̀bàrà Méjì | 1222 | speech, strength, influence |
| 8 | Ọ̀kànràn Méjì | 2221 | focus, decisive change |
| 9 | Ògúndá Méjì | 1112 | clearing the path, action |
| 10 | Ọ̀sá Méjì | 2111 | sudden change, resilience |
| 11 | Ìká Méjì | 2122 | discernment, ethical power |
| 12 | Òtúrúpọ̀n Méjì | 2212 | endurance, courage |
| 13 | Òtúrá Méjì | 1211 | peace, wisdom, harmony |
| 14 | Ìrẹtẹ̀ Méjì | 1121 | vitality, hope, fullness of life |
| 15 | Ọ̀ṣẹ́ Méjì | 1212 | fertility, increase, sacrifice |
| 16 | Òfún Méjì (Ọ̀ràngún) | 2121 | wisdom, blessing, origins |

> **Note on variation.** Order and some spellings differ between traditions
> (e.g. West African vs. Cuban/Lukumí). We adopt the Abimbola ordering and store
> spelling variants in `Odu.altNames` so search works across conventions. The
> "teaching theme" column only informs our **original** summaries; it is not a
> copied interpretation.

## 4. Source registry (licence / permission status)

| Source | Type | Licence | Permission | How we use it |
|--------|------|---------|------------|---------------|
| Pogoson & Akande, *Ifa Divination Trays from Isale-Oyo* (2011) | Peer-reviewed article / field record | **CC BY-NC-SA 4.0** | GRANTED while site remains non-commercial | Four page-cited bilingual passages and one recorded closing pattern; exact source orthography retained |
| E. M. Lijadu, *Ọ̀rúnmìlà! Nipa* (1908) | Early Yorùbá text | **Public-domain underlying text** | LOCAL REVIEW ONLY | Locally archived for controlled transcription; requires new translation, orthography review, and lineage review before publication |
| Ofuasia, *Is There Any Evidence for Hell in the Ifá Literary Corpus?* (2023) | Open-access field record | **CC BY 4.0** | PERFORMER REVIEW | Locally archived; two named-performer passages are candidates, not yet public corpus entries |
| Olomu & Lawal-Dosumu, *Spirito-Physical Relevance of Iwure…* (2023) | Open-access article | **CC BY 4.0** | PRACTITIONER REVIEW | Locally archived for comparison with the Lijadu record; not yet public corpus content |
| Wikipedia — *Ifá*, *Odu Ifa* | Encyclopaedia | CC BY-SA 4.0 (older edits 3.0) | GRANTED (attribution + share-alike) | Factual structure, names, instruments |
| *African Traditional Religions Textbook: Ifa* (Pressbooks / OER) | Open educational resource | **CC BY-NC 4.0** (attrib. Will Coleman & Awo Fa'lokun Fatunmbi) | GRANTED (non-commercial) | Thematic grounding, educational depth |
| Ellis, *The Yoruba-Speaking Peoples of the Slave Coast* (1894) | Ethnography | **Public domain** (archive.org) | NOT_REQUIRED | Historical/structural facts (read critically) |
| Dennett, *Nigerian Studies* (1910) | Ethnography | **Public domain** (archive.org) | NOT_REQUIRED | Historical/structural facts (read critically) |
| Frobenius, *The Voice of Africa* (1913) | Ethnography | **Public domain** (archive.org) | NOT_REQUIRED | Historical context (read critically) |
| UNESCO ICH — *Ifa divination system* (00146) | Institutional | © UNESCO | NOT stored verbatim | Heritage status, factual context |
| Abimbola, *Ifá: An Exposition…* (1976); *Ifá Divination Poetry* (1977) | Academic / literary | © all rights reserved | NOT copied | Cited for facts/attribution only |
| Owomoyela, *Yoruba Proverbs* (2005), *A Kì í* (1988) | Academic collection | © all rights reserved | NOT copied | Awareness only; proverbs sourced from oral tradition instead |
| Lucas, *The Religion of the Yorubas* (1948) | Scholarly | © all rights reserved | NOT copied | Facts/attribution only |
| "Algebraic characterization of Ifá main divination codes" (peer-reviewed) | Academic | © rights reserved | NOT copied | Binary/structure facts |

> **Colonial-era caution.** Ellis/Dennett/Frobenius are public-domain and useful
> for structural/historical facts, but carry the biases of their era. Use them
> for facts, not for interpretive framing, and prefer Yorùbá-authored and
> contemporary scholarship for meaning.

These are seeded as `Source` rows so the permission flow is exercised from day
one (see `prisma/seed.ts`). Copyrighted sources are stored with
`permissionStatus = PENDING`/attribution-only and **cannot** back published
verse text until permission is `GRANTED`.

### Why there is no “complete 256-Odù verse download”

No credible, rights-clean, definitive 256-Odù corpus was found. Ifá is a living
oral corpus with many verses and lineage variants under each Odù. Search results
that promise a complete free corpus frequently reproduce copyrighted Abímbọ́lá,
Bascom, Epega, or modern Lijadu translations without permission. We do not use
those copies.

The long-term route is a commissioned corpus: named practitioners record,
transcribe, translate, and approve passages under a clear reuse agreement.
Until then, a result with no reviewed passage says so instead of fabricating one.

## 5. Principles applied

1. **Facts vs. interpretation.** Names, order, signatures, instruments and the
   binary structure are facts. Meanings are original or reviewed.
2. **No scraping, no copying.** No book/website interpretation text is stored.
3. **Attribution & licences tracked.** Every external source has explicit
   licence + permission metadata; CC BY-SA usage carries attribution.
4. **Respect & humility.** Summaries are educational, general, and never claim
   to replace a babaláwo or the depth of the oral tradition.

## Sources

- [Ifá — Wikipedia](https://en.wikipedia.org/wiki/If%C3%A1)
- [Odu Ifa — Wikipedia](https://en.wikipedia.org/wiki/Odu_Ifa)
- [Ifa divination system — UNESCO ICH](https://ich.unesco.org/en/RL/ifa-divination-system-00146)
- [African Traditional Religions Textbook: Ifa (Pressbooks)](https://pressbooks.pub/africanamericanreligionsifa/chapter/chapter-9-the-holy-odus-256-sacred-parables-proverbs-and-prescriptions/)
- [Algebraic characterization of Ifa main divination codes — ScienceDirect](https://www.sciencedirect.com/science/article/pii/S2468227623001850)
- [Ifá divination corpus — Routledge Encyclopedia of Philosophy](https://www.rep.routledge.com/articles/thematic/ifa-divination-corpus-the/v-1)
