// ===========================================================================
// Field notes from "Ifàgrìthm: The Mathematics in Ifá" — Waa Sere in
// conversation with Dr. Túndé Adégbọlá. Every claim is paraphrased in
// original wording (no verbatim transcript) and set beside independent
// research, with sources credited/linked. See docs/CORE_KNOWLEDGE.md
// Changelog for the sourcing note on this section.
// ===========================================================================

const RG =
  "https://www.researchgate.net/publication/259962837_A_Comparative_Study_of_Ifa_Divination_and_Computer_Science";
const TA = "https://en.wikipedia.org/wiki/Tunde_Adegbola";
export const IFAGRITHM_VIDEO = "https://youtu.be/rRYdarLvbho";

export interface IfagrithmNote {
  title: string;
  claim: string;
  research: string;
  flag: string;
  srcLabel: string;
  href: string;
}

export const IFAGRITHM_NOTES: IfagrithmNote[] = [
  {
    title: "Ifá as an information system, not a mystery",
    claim: "Whatever was in Ọ̀rúnmìlà's mind, it was bigger than mystique: Ifá organises the knowledge a society accumulates — stories of antecedents, precedents and consequences — so anyone facing a situation can be told the likely outcome and choose to embrace or avoid it.",
    research: "A recognised scholarly tradition, not a lone view. Olú Lóngẹ́ — Nigeria's first professor of computer science — made the same case in his 1983 Ibadan inaugural lecture “Ifá Divination and Computer Science”; later peer-reviewed work frames Ifá as an indigenous decision system built on binary computation.",
    flag: "",
    srcLabel: "Longe (1983) · comparative study",
    href: RG,
  },
  {
    title: "One stroke, two strokes — modulo-2 arithmetic",
    claim: "Shake the instrument; if two units remain, print one stroke; if one remains, print two. Adégbọlá names the operation rírò módúlò méjì — modulo-2, i.e. binary, arithmetic. Push anything in nature to a dichotomy — high/low, light/dark — and you have 0 and 1.",
    research: "The standard reading in the Ifá-and-computing literature: each nut or chain-half is a binary digit (Lóngẹ́; Bade Ajayi's binary-system model). The counter-intuitive “one remains → mark two” rule is a genuine, documented feature of the notation.",
    flag: "",
    srcLabel: "Ajayi · Ifá binary system",
    href: RG,
  },
  {
    title: "Nibbles, bytes and the number 256",
    claim: "Four chain-halves make what computing calls a nibble; eight make a byte. Eight bits generate 256 patterns — and each pattern corresponds to one Odù. The eight-mark figure is, literally, a byte.",
    research: "The arithmetic is exact: 2⁸ = 256. Scholarship consistently counts 16 principal Odù and 256 in total — the same picture Lóngẹ́ and Ajayi draw.",
    flag: "Authors disagree on how many verses (ese) sit under each Odù, so total-corpus figures vary between writers. The 16 / 256 structure itself is stable.",
    srcLabel: "Comparative study",
    href: RG,
  },
  {
    title: "A library catalogue and its index",
    claim: "Dividing all knowledge into 256 categories is classification — the first thing a library does. Indexing gets you to each class, like the index at the back of a book. The Odù are catalogues you index into and retrieve from.",
    research: "Classification → indexing → retrieval is the vocabulary of library and information science — Adégbọlá's own profession (founder of Alt-i, PhD in information science). An expert analogy, though still an interpretive mapping onto the tradition.",
    flag: "",
    srcLabel: "Túndé Adégbọlá — profile",
    href: TA,
  },
  {
    title: "Ese Ifá behaves like a database record",
    claim: "Verses follow a fixed shape: the diviner(s) who contributed it; adífá fún — whom it was divined for; what happened; the prescription; compliance; outcome. An ese arrives like a record, each segment a field.",
    research: "The structured verse form is documented in Wándé Abímbọ́lá's foundational corpus scholarship (Ìjìnlẹ̀ Ohùn Ẹnu Ifá). The record/field reading is a computing gloss over that documented structure.",
    flag: "",
    srcLabel: "Wándé Abímbọ́lá",
    href: "https://en.wikipedia.org/wiki/Wande_Abimbola",
  },
  {
    title: "How an oral corpus this large survived",
    claim: "Two answers: the retrieval structure, and deliberate mnemonic design — repetition, alliteration, musicality, rhythm. The babaláwo chants the Odù to make it an unforgettable, musical experience.",
    research: "Aligns with oral-formulaic scholarship generally: large corpora persist orally through fixed rhythm, formula and sound-patterning that make lines resistant to drift.",
    flag: "“Almost nothing was lost” is the speakers' impression — the true retention rate of an oral corpus is inherently unmeasurable.",
    srcLabel: "Source video",
    href: IFAGRITHM_VIDEO,
  },
  {
    title: "Randomisation to eliminate the diviner's bias",
    claim: "A pervasive drive to randomise: the diviner may know the client, so the casting is engineered to remove him from the result. Rò / rónú (“to think deeply”) is read as randomise thoroughly — stir the whole set so every possibility has an equal chance.",
    research: "The core idea is sound: randomness is defined as equal probability, and randomisation is the standard defence against selection bias. Casting lots to strip out human bias is a genuine, ancient use of chance.",
    flag: "“Modulo-2 as the basis of pseudo-random generation” holds loosely, not literally — real PRNGs use more than parity, though binary operations are central to many.",
    srcLabel: "Source video",
    href: IFAGRITHM_VIDEO,
  },
  {
    title: "Èṣù, non-determinism and generate-and-test",
    claim: "Without information you search: try left a little, back up, try right — generate and test. Èṣù is Onílé Oríta, owner of the crossroads — the decision point itself. Crossroads opening onto crossroads is combinatorial explosion; swapping a negative for a positive is Type I / Type II error.",
    research: "Every technical term is real and correctly used — Adégbọlá teaches AI at Nigerian universities. The identification of these with Èṣù and the crossroads is his interpretive framework: an illuminating mapping, not a documented doctrine of Ifá.",
    flag: "",
    srcLabel: "Túndé Adégbọlá — profile",
    href: TA,
  },
  {
    title: "The ọpọn as a scratchpad for short-term memory",
    claim: "Short-term memory holds about seven items (Miller, 1956); beyond that we forget. So marks are printed right-to-left in ìyẹ̀rọ̀sùn on the ọpọn Ifá — a temporary writing system, wiped and reused: working memory, externalised.",
    research: "Miller's “The Magical Number Seven, Plus or Minus Two” (1956) is a genuine, foundational result. The tray-as-external-memory reading is a clean framing of a real practice: marking transient patterns in powder, then erasing.",
    flag: "Later work (Cowan, 2001) revises the practical limit toward ~4 chunks — the point, a tight short-term store, holds.",
    srcLabel: "Miller (1956)",
    href: "https://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two",
  },
  {
    title: "Before Leibniz — the tray in a German museum",
    claim: "The West formalised binary through Leibniz (~1700) and Boole (~1800), but an ọpọn Ifá reached Europe around 1620 — sent from Allada to a “King Philip”, now in a German museum. And as ASCII gave way to multi-byte Unicode, Ifá has its own extension: Àgbìgbà.",
    research: "A 17th-century tray in Germany is real: the Ulm ọpọn Ifá, acquired by merchant Christoph Weickmann and dated to about 1650 (studied by Ezio Bassani) — securely predating Leibniz and Boole. The ASCII (7-bit) → Unicode point is accurate.",
    flag: "The precise “1620 / King Philip / Allada” provenance is a stronger, less-settled claim; the firmly dated artefact scholars rely on is the ~1650 Ulm tray.",
    srcLabel: "Bassani — the Ulm ọpọn Ifá",
    href: "https://www.obafemio.com/uploads/5/1/4/2/5142021/opon_ifa_isale.pdf",
  },
];

export const IFAGRITHM_PEOPLE = [
  { name: "Dr. Túndé Adégbọlá", body: "The guest. Engineer, computer scientist, computational linguist; founder of Alt-i; introduced to Ifá at 15." },
  { name: "Prof. Olú Lóngẹ́", body: "Nigeria's first professor of computer science; his 1983 Ibadan lecture first argued Ifá is an 8-bit binary system." },
  { name: "Prof. Wándé Abímbọ́lá", body: "Foundational scholar of the Ifá literary corpus; documented the regular verse structure read here as records." },
  { name: "The Ulm Ọpọn Ifá", body: "A Yorùbá divination tray collected by ~1650, held in Germany — the system predates Leibniz and Boole." },
];
