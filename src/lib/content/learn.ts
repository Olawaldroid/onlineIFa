// ===========================================================================
// Static editorial content for /learn — facets of Ifá, mathematics topics,
// and comparisons with computer science. General educational commentary,
// not Odù-specific interpretation, so it needs no gating (see
// src/lib/interpretation/gate.ts for the gated meaning layer).
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
  { tag: "GRAPH THEORY", title: "A web of figures", body: "Figures relate by shared legs, inversions and mirrorings — a graph the knowledge section makes visible." },
];

export const CS_CARDS = [
  { ifa: "MARKS", cs: "BITS", title: "Binary encoding", body: "A single or double mark is a two-state symbol. Eight positions per figure — the same arithmetic as a byte, arrived at independently and centuries earlier." },
  { ifa: "8 CASTS", cs: "TREE DEPTH 8", title: "Trees & recursion", body: "Generating a figure walks a perfect binary tree one level per cast. Computer science calls this a decision tree traversal." },
  { ifa: "CONSULTATION", cs: "DECISION SYSTEM", title: "Structured decisions", body: "Frame a question, draw a figure, retrieve precedent, reason to counsel — a disciplined pipeline any systems designer would recognise." },
  { ifa: "ESE IFÁ", cs: "KNOWLEDGE BASE", title: "Knowledge representation", body: "Verses index remembered cases by figure — a key-value store of precedent, retrieved associatively by trained memory." },
  { ifa: "DIVINER", cs: "RETRIEVAL + RANKING", title: "Relevance & retrieval", body: "From dozens of verses per figure, the diviner selects what fits the querent's situation — relevance ranking, done by human expertise." },
  { ifa: "APPRENTICESHIP", cs: "TRAINING DATA", title: "Learning by example", body: "Diviners internalise the corpus through worked examples over years — pattern learning, refined by correction from teachers." },
];
