// Static knowledge-graph content for /graph — nodes/edges connecting Odù,
// òrìṣà, concepts, mathematics, history, instruments and virtues.

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
  /** Percent coordinates within the graph stage. */
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
  N("ife", "Ilé-Ifẹ̀", "history", 14, 68, "The ancestral city of the Yorùbá, traditional home of the tradition's origins."),
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
