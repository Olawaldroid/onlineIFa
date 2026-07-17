// ===========================================================================
// IFA LAB static content — original educational copy for the lab page.
// Facts follow docs/CORE_KNOWLEDGE.md; interpretation-adjacent text keeps to
// commonly-taught themes and is clearly framed as educational.
// ===========================================================================

export const FACETS = [
  { num: "01", title: "Philosophy", body: "A coherent account of destiny, character and consequence — what a good life is, and how to steer toward it." },
  { num: "02", title: "History & memory", body: "The verses hold centuries of remembered events, places and names — an archive kept in trained minds." },
  { num: "03", title: "Ethics", body: "Ìwà — character — is the highest value. The corpus returns constantly to honesty, patience and responsibility." },
  { num: "04", title: "Language & poetry", body: "Ese Ifá are poems: tonal, rhythmic, dense with proverb and image. Ifá is one of the great oral literatures." },
  { num: "05", title: "Decision-making", body: "A structured way of framing a question, drawing a figure, and reasoning from precedent toward counsel." },
  { num: "06", title: "Oral literature", body: "Thousands of verses transmitted teacher to student, unwritten yet stable across generations and oceans." },
  { num: "07", title: "Mathematics", body: "Eight binary positions, 256 figures, recursive structure — a formal system centuries old." },
  { num: "08", title: "Spirituality", body: "A living religious tradition centred on Ọ̀rúnmìlà — approached here with respect, not spectacle." },
  { num: "09", title: "A living tradition", body: "Practised today across West Africa and the Americas; inscribed by UNESCO as intangible cultural heritage." },
];

export const MATH_TOPICS = [
  { tag: "INFORMATION THEORY", title: "8 bits of surprise", body: "One cast selects among 256 equally likely figures — exactly 8 bits of information, a byte drawn by hand." },
  { tag: "PROBABILITY", title: "1 in 256", body: "Each figure has probability 1/256 ≈ 0.39% on a fair cast. Rarity is structural, not mystical." },
  { tag: "PATTERN RECOGNITION", title: "Reading figures", body: "Diviners recognise figures instantly by shape — the same chunking experts use in chess and radiology." },
  { tag: "GRAPH THEORY", title: "A web of figures", body: "Figures relate by shared legs, inversions and mirrorings — a graph the knowledge section below makes visible." },
];

export const ERAS = [
  { when: "ORIGINS", title: "Deep roots", body: "Ifá emerges among the Yorùbá of West Africa, its origins tied by tradition to Ilé-Ifẹ̀ and to Ọ̀rúnmìlà, the first diviner. Its beginnings predate written record — the corpus itself is the archive." },
  { when: "ANCIENT YORÙBÁ", title: "The corpus takes shape", body: "Generations of babaláwo and ìyánífá memorise and transmit thousands of ese Ifá — verses carrying history, ethics and precedent — through years-long apprenticeships." },
  { when: "EXPANSION", title: "Across West Africa", body: "The practice spreads through what is now Nigeria, Benin and Togo, adapting to local languages and lineages while keeping its 256-figure structure intact." },
  { when: "ATLANTIC WORLD", title: "Crossing the ocean", body: "Carried by enslaved Yorùbá people, Ifá takes root in the Americas — Lukumí in Cuba, Candomblé-linked practice in Brazil, traditions in Trinidad — surviving displacement intact." },
  { when: "MODERN SCHOLARSHIP", title: "Written and studied", body: "Samuel Johnson’s History of the Yorubas (1921), Wándé Abímbọ́lá’s foundational studies (1976–77), and growing academic attention. In 2005 UNESCO proclaims Ifá a masterpiece of intangible heritage." },
  { when: "DIGITAL ERA", title: "New instruments", body: "Archives digitise public-domain sources; researchers model the corpus computationally; projects like this one make the system explorable — transparently, and with respect." },
];

export const CS_CARDS = [
  { ifa: "MARKS", cs: "BITS", title: "Binary encoding", body: "A single or double mark is a two-state symbol. Eight positions per figure — the same arithmetic as a byte, arrived at independently and centuries earlier." },
  { ifa: "8 CASTS", cs: "TREE DEPTH 8", title: "Trees & recursion", body: "Generating a figure walks a perfect binary tree one level per cast. Computer science calls this a decision tree traversal." },
  { ifa: "CONSULTATION", cs: "DECISION SYSTEM", title: "Structured decisions", body: "Frame a question, draw a figure, retrieve precedent, reason to counsel — a disciplined pipeline any systems designer would recognise." },
  { ifa: "ESE IFÁ", cs: "KNOWLEDGE BASE", title: "Knowledge representation", body: "Verses index remembered cases by figure — a key-value store of precedent, retrieved associatively by trained memory." },
  { ifa: "DIVINER", cs: "RETRIEVAL + RANKING", title: "Relevance & retrieval", body: "From dozens of verses per figure, the diviner selects what fits the querent’s situation — relevance ranking, done by human expertise." },
  { ifa: "APPRENTICESHIP", cs: "TRAINING DATA", title: "Learning by example", body: "Diviners internalise the corpus through worked examples over years — pattern learning, refined by correction from teachers." },
];

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
    claim: "Whatever was in Ọ̀rúnmìlà’s mind, it was bigger than mystique: Ifá organises the knowledge a society accumulates — stories of antecedents, precedents and consequences — so anyone facing a situation can be told the likely outcome and choose to embrace or avoid it.",
    research: "A recognised scholarly tradition, not a lone view. Olú Lóngẹ́ — Nigeria’s first professor of computer science — made the same case in his 1983 Ibadan inaugural lecture “Ifá Divination and Computer Science”; later peer-reviewed work frames Ifá as an indigenous decision system built on binary computation.",
    flag: "",
    srcLabel: "Longe (1983) · comparative study",
    href: RG,
  },
  {
    title: "One stroke, two strokes — modulo-2 arithmetic",
    claim: "Shake the instrument; if two units remain, print one stroke; if one remains, print two. Adégbọlá names the operation rírò módúlò méjì — modulo-2, i.e. binary, arithmetic. Push anything in nature to a dichotomy — high/low, light/dark — and you have 0 and 1.",
    research: "The standard reading in the Ifá-and-computing literature: each nut or chain-half is a binary digit (Lóngẹ́; Bade Ajayi’s binary-system model). The counter-intuitive “one remains → mark two” rule is a genuine, documented feature of the notation.",
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
    research: "Classification → indexing → retrieval is the vocabulary of library and information science — Adégbọlá’s own profession (founder of Alt-i, PhD in information science). An expert analogy, though still an interpretive mapping onto the tradition.",
    flag: "",
    srcLabel: "Túndé Adégbọlá — profile",
    href: TA,
  },
  {
    title: "Ese Ifá behaves like a database record",
    claim: "Verses follow a fixed shape: the diviner(s) who contributed it; adífá fún — whom it was divined for; what happened; the prescription; compliance; outcome. An ese arrives like a record, each segment a field.",
    research: "The structured verse form is documented in Wándé Abímbọ́lá’s foundational corpus scholarship (Ìjìnlẹ̀ Ohùn Ẹnu Ifá). The record/field reading is a computing gloss over that documented structure.",
    flag: "",
    srcLabel: "Wándé Abímbọ́lá",
    href: "https://en.wikipedia.org/wiki/Wande_Abimbola",
  },
  {
    title: "How an oral corpus this large survived",
    claim: "Two answers: the retrieval structure, and deliberate mnemonic design — repetition, alliteration, musicality, rhythm. The babaláwo chants the Odù to make it an unforgettable, musical experience.",
    research: "Aligns with oral-formulaic scholarship generally: large corpora persist orally through fixed rhythm, formula and sound-patterning that make lines resistant to drift.",
    flag: "“Almost nothing was lost” is the speakers’ impression — the true retention rate of an oral corpus is inherently unmeasurable.",
    srcLabel: "Source video",
    href: IFAGRITHM_VIDEO,
  },
  {
    title: "Randomisation to eliminate the diviner’s bias",
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
    research: "Miller’s “The Magical Number Seven, Plus or Minus Two” (1956) is a genuine, foundational result. The tray-as-external-memory reading is a clean framing of a real practice: marking transient patterns in powder, then erasing.",
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

export const BOOKS = [
  { tag: "PUBLIC DOMAIN · 1921", title: "The History of the Yorubas", author: "Samuel Johnson", note: "Yorùbá-authored history — the preferred early source. Readable on archive.org." },
  { tag: "PUBLIC DOMAIN · 1894", title: "The Yoruba-Speaking Peoples of the Slave Coast", author: "A. B. Ellis", note: "Colonial-era ethnography — useful for structural facts; read its interpretations critically." },
  { tag: "PUBLIC DOMAIN · 1910", title: "Nigerian Studies", author: "R. E. Dennett", note: "Early field notes on Yorùbá religion and society. Public domain on archive.org." },
  { tag: "PUBLIC DOMAIN · 1913", title: "The Voice of Africa", author: "Leo Frobenius", note: "Expedition record including Ifẹ̀ material — historically significant, colonially framed." },
  { tag: "OPEN LICENCE · CC BY-NC", title: "African Traditional Religions: Ifa", author: "Coleman & Fatunmbi (OER)", note: "An open educational textbook chapter on Ifá — free to read and reuse non-commercially." },
  { tag: "REFERENCE · FACTS ONLY", title: "Ifá: An Exposition of Ifá Literary Corpus", author: "Wándé Abímbọ́lá, 1976", note: "The foundational modern study. In copyright — referenced for facts, never copied." },
];

export const GLOSSARY = [
  { term: "Ifá", pron: "ee-FAH", def: "The divination system and body of knowledge of the Yorùbá people." },
  { term: "Odù", pron: "oh-DOO", def: "One of the 256 figures; each indexes a body of verses." },
  { term: "Ọ̀rúnmìlà", pron: "aw-roon-mee-LAH", def: "Òrìṣà of wisdom and divination; patron of Ifá." },
  { term: "Babaláwo", pron: "bah-bah-LAH-woh", def: "“Father of secrets” — a trained (male) diviner. Female: ìyánífá." },
  { term: "Ese Ifá", pron: "eh-SHEH ee-FAH", def: "The verses — poems carrying proverbs, history and guidance." },
  { term: "Ọpọn Ifá", pron: "aw-PAWN ee-FAH", def: "The carved divination tray on which marks are traced." },
  { term: "Ìyẹ̀rọ̀sùn", pron: "ee-yeh-raw-SOON", def: "Fine divining powder spread on the tray for writing marks." },
  { term: "Ìrókè", pron: "ee-ROH-keh", def: "The tapper used to invoke Ọ̀rúnmìlà at the start of divination." },
];

export const MUSEUM_ITEMS = [
  {
    slot: "mus-opon",
    name: "Ọpọn Ifá",
    role: "THE TRAY",
    placeholder: "Drop a photo / 360° capture of an Ọpọn Ifá",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Brooklyn%20Museum%2075.147.1%20Divination%20Tray%20Opon%20Ifa.jpg?width=900",
    credit: "Brooklyn Museum — open licence, via Wikimedia Commons",
    creditHref: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_75.147.1_Divination_Tray_Opon_Ifa.jpg",
    desc: "The carved wooden tray — often round, its border carved with faces and figures, the face of Èṣù at its head. The diviner traces marks in powder across its surface.",
  },
  {
    slot: "mus-opele",
    name: "Ọ̀pẹ̀lẹ̀",
    role: "THE CHAIN",
    placeholder: "Drop a photo of an Ọ̀pẹ̀lẹ̀ chain",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Opele%20if%C3%A1%20MN%2001.jpg?width=900",
    credit: "Museu Nacional — via Wikimedia Commons",
    creditHref: "https://commons.wikimedia.org/wiki/File:Opele_if%C3%A1_MN_01.jpg",
    desc: "Eight half-pods on a chain in two strands of four. One throw shows each pod concave or convex — a complete figure in a single gesture.",
  },
  {
    slot: "mus-ikin",
    name: "Ìkín",
    role: "THE PALM NUTS",
    placeholder: "Drop a photo of ìkín palm nuts",
    src: "",
    credit: "",
    creditHref: "",
    desc: "Sixteen sacred palm nuts, the oldest and most prestigious instrument. Eight rounds of handling write one figure, mark by mark.",
  },
  {
    slot: "mus-iroke",
    name: "Ìrókè Ifá",
    role: "THE TAPPER",
    placeholder: "Drop a photo of an Ìrókè",
    src: "https://commons.wikimedia.org/wiki/Special:FilePath/Brooklyn%20Museum%2075.150.1%20Divination%20Tapper%20Iroke%20Ifa.jpg?width=900",
    credit: "Brooklyn Museum — open licence, via Wikimedia Commons",
    creditHref: "https://commons.wikimedia.org/wiki/File:Brooklyn_Museum_75.150.1_Divination_Tapper_Iroke_Ifa.jpg",
    desc: "A carved tapper — often ivory or wood — struck against the tray to invoke Ọ̀rúnmìlà and open the consultation.",
  },
  {
    slot: "mus-agere",
    name: "Agéré Ifá",
    role: "THE VESSEL",
    placeholder: "Drop a photo of an Agéré",
    src: "",
    credit: "",
    creditHref: "",
    desc: "A carved lidded vessel, frequently a mounted figure or caryatid, in which the ìkín are kept between consultations.",
  },
];

// ---------------------------------------------------------------------------
// Knowledge graph
// ---------------------------------------------------------------------------

export type GraphCat = "odu" | "orisa" | "concept" | "math" | "history" | "nature" | "virtue";

export const GRAPH_COLORS: Record<GraphCat, string> = {
  odu: "#c9a227",
  orisa: "#a8431f",
  concept: "#7c8a5a",
  math: "#b98a4a",
  history: "#f3e9d9",
  nature: "#5a7c6b",
  virtue: "#d4b96a",
};

export const GRAPH_CAT_NAMES: Record<GraphCat, string> = {
  odu: "ODÙ",
  orisa: "ÒRÌṢÀ",
  concept: "CONCEPT",
  math: "MATHEMATICS",
  history: "HISTORY",
  nature: "INSTRUMENT / NATURE",
  virtue: "VIRTUE",
};

export const GRAPH_LEGEND: { label: string; color: string }[] = [
  { label: "Odù", color: GRAPH_COLORS.odu },
  { label: "Òrìṣà", color: GRAPH_COLORS.orisa },
  { label: "Concepts", color: GRAPH_COLORS.concept },
  { label: "Mathematics", color: GRAPH_COLORS.math },
  { label: "History", color: GRAPH_COLORS.history },
  { label: "Instruments & nature", color: GRAPH_COLORS.nature },
  { label: "Virtues", color: GRAPH_COLORS.virtue },
];

export interface GraphNode {
  id: string;
  label: string;
  cat: GraphCat;
  /** Percent coordinates within the 1120×560 graph stage. */
  x: number;
  y: number;
  desc: string;
}

const N = (id: string, label: string, cat: GraphCat, x: number, y: number, desc: string): GraphNode => ({ id, label, cat, x, y, desc });

export const GRAPH_NODES: GraphNode[] = [
  N("corpus", "The 256 Odù", "odu", 50, 50, "The complete corpus: 16 principal figures and 240 combinations, each a doorway to remembered verses."),
  N("ogbe", "Èjì Ogbè", "odu", 38, 36, "Most senior Odù — light, beginnings, clarity."),
  N("oyeku", "Ọ̀yẹ̀kú Méjì", "odu", 62, 36, "Second Odù — endings, cycles, renewal."),
  N("ogunda", "Ògúndá Méjì", "odu", 34, 58, "Ninth Odù — iron, action, justice."),
  N("osa", "Ọ̀sá Méjì", "odu", 60, 64, "Tenth Odù — storms, sudden change, resilience."),
  N("ose", "Ọ̀ṣẹ́ Méjì", "odu", 48, 68, "Fifteenth Odù — fertility, increase, sweetness."),
  N("orunmila", "Ọ̀rúnmìlà", "orisa", 50, 22, "Òrìṣà of wisdom and divination; the patron and first diviner, who speaks through trained diviners."),
  N("ogun", "Ògún", "orisa", 20, 58, "Òrìṣà of iron and labour — associated with Ògúndá Méjì."),
  N("sango", "Ṣàngó", "orisa", 74, 72, "Òrìṣà of thunder — associated with Ọ̀sá Méjì."),
  N("oya", "Ọya", "orisa", 82, 60, "Òrìṣà of storms and winds — associated with Ọ̀sá Méjì."),
  N("osun", "Ọ̀ṣun", "orisa", 36, 76, "Òrìṣà of rivers and sweetness — associated with Ọ̀ṣẹ́ Méjì."),
  N("ese", "Ese Ifá", "concept", 66, 46, "The verses: poems and stories carrying proverbs, history and guidance, memorised and transmitted orally."),
  N("ori", "Orí", "concept", 30, 24, "Personal destiny — the inner head each person carries; a central idea consulted about in Ifá."),
  N("iwa", "Ìwà (character)", "concept", 18, 36, "Good character as the highest value; verses return to it again and again."),
  N("babalawo", "Babaláwo · Ìyánífá", "concept", 68, 24, "Trained diviners — years of apprenticeship, memorising the corpus and mastering the instruments."),
  N("binary", "Binary marks", "math", 84, 32, "Each position is single or double — a binary digit. Eight positions per figure."),
  N("math256", "2⁸ = 256", "math", 90, 44, "Eight binary positions generate exactly 256 figures."),
  N("recursion", "Recursion", "math", 88, 20, "The corpus is a perfect binary tree of depth 8, walked one mark at a time."),
  N("ife", "Ilé-Ifẹ̀", "history", 14, 68, "The ancestral city of the Yorùbá, traditional home of the tradition’s origins."),
  N("unesco", "UNESCO 2005", "history", 12, 50, "Ifá was proclaimed a Masterpiece of Intangible Heritage in 2005 and inscribed in 2008."),
  N("atlantic", "Atlantic diaspora", "history", 22, 80, "Carried across the Atlantic — living traditions in Cuba (Lukumí), Brazil and Trinidad."),
  N("ikin", "Ìkín · palm nuts", "nature", 44, 84, "Sixteen sacred palm nuts, manipulated over eight rounds to write one figure."),
  N("opele", "Ọ̀pẹ̀lẹ̀ chain", "nature", 58, 82, "A chain of eight half-pods — one throw writes a complete figure."),
  N("patience", "Patience", "virtue", 76, 86, "A virtue the verses counsel constantly."),
  N("integrity", "Integrity", "virtue", 86, 78, "Speech and strength are to be used honestly — a recurring teaching."),
];

export const GRAPH_EDGES: [string, string][] = [
  ["corpus", "ogbe"], ["corpus", "oyeku"], ["corpus", "ogunda"], ["corpus", "osa"], ["corpus", "ose"],
  ["corpus", "ese"], ["corpus", "binary"], ["binary", "math256"], ["binary", "recursion"],
  ["ogunda", "ogun"], ["osa", "sango"], ["osa", "oya"], ["ose", "osun"],
  ["orunmila", "corpus"], ["orunmila", "babalawo"], ["orunmila", "ori"],
  ["ese", "babalawo"], ["ese", "iwa"], ["ese", "patience"], ["ese", "integrity"],
  ["ori", "iwa"], ["ife", "unesco"], ["ife", "atlantic"],
  ["corpus", "ikin"], ["corpus", "opele"], ["ikin", "opele"],
  ["ife", "ogbe"], ["atlantic", "osun"], ["unesco", "corpus"],
];
