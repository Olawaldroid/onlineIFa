// ===========================================================================
// The 16 primary Odù (Olódù / Méjì) — FACTS ONLY.
// ---------------------------------------------------------------------------
// Names, seniority order, signatures and alternate spellings are
// culturally-shared facts. This file contains NO divinatory interpretation.
//
// Signature notation
//   Each Odù has two legs (right + left). Each leg has 4 positions.
//   "1" = single mark (Òkan), "2" = double mark (Èjì).
//   We store the right leg first, then the left, separated by "|".
//   For the 16 méjì both legs are identical.
//
// Seniority (rank 1..16) follows the widely-taught Yoruba ordering.
// ===========================================================================

export interface PrimaryOduFact {
  rank: number;
  slug: string;
  name: string;
  altNames: string[];
  /** 4-mark leg pattern, e.g. "1111". Both legs identical for méjì. */
  leg: string;
  /** Short, factual, culturally-shared note (NOT an interpretation). */
  factualSummary: string;
}

export const PRIMARY_ODU: PrimaryOduFact[] = [
  {
    rank: 1,
    slug: "ogbe-meji",
    name: "Èjì Ogbè",
    altNames: ["Ogbè Méjì", "Eji Ogbe", "Ogbe Meji"],
    leg: "1111",
    factualSummary:
      "The most senior of the sixteen principal Odù; both legs show four single marks.",
  },
  {
    rank: 2,
    slug: "oyeku-meji",
    name: "Ọ̀yẹ̀kú Méjì",
    altNames: ["Oyeku Meji", "Oyeku Meji", "Òyèkú Méjì"],
    leg: "2222",
    factualSummary:
      "The second principal Odù; both legs show four double marks, structurally the inverse of Èjì Ogbè.",
  },
  {
    rank: 3,
    slug: "iwori-meji",
    name: "Ìwòrì Méjì",
    altNames: ["Iwori Meji", "Iworimeji"],
    leg: "2112",
    factualSummary: "Third principal Odù.",
  },
  {
    rank: 4,
    slug: "odi-meji",
    name: "Òdí Méjì",
    altNames: ["Odi Meji", "Edi Meji"],
    leg: "1221",
    factualSummary: "Fourth principal Odù.",
  },
  {
    rank: 5,
    slug: "irosun-meji",
    name: "Ìrosùn Méjì",
    altNames: ["Irosun Meji", "Iroso Meji"],
    leg: "1122",
    factualSummary: "Fifth principal Odù.",
  },
  {
    rank: 6,
    slug: "owonrin-meji",
    name: "Ọ̀wọ́nrín Méjì",
    altNames: ["Owonrin Meji", "Owanrin Meji", "Owonrin"],
    leg: "2211",
    factualSummary: "Sixth principal Odù.",
  },
  {
    rank: 7,
    slug: "obara-meji",
    name: "Ọ̀bàrà Méjì",
    altNames: ["Obara Meji", "Obara"],
    leg: "1222",
    factualSummary: "Seventh principal Odù.",
  },
  {
    rank: 8,
    slug: "okanran-meji",
    name: "Ọ̀kànràn Méjì",
    altNames: ["Okanran Meji", "Okonron Meji"],
    leg: "2221",
    factualSummary: "Eighth principal Odù.",
  },
  {
    rank: 9,
    slug: "ogunda-meji",
    name: "Ògúndá Méjì",
    altNames: ["Ogunda Meji", "Oguda Meji"],
    leg: "1112",
    factualSummary: "Ninth principal Odù.",
  },
  {
    rank: 10,
    slug: "osa-meji",
    name: "Ọ̀sá Méjì",
    altNames: ["Osa Meji"],
    leg: "2111",
    factualSummary: "Tenth principal Odù.",
  },
  {
    rank: 11,
    slug: "ika-meji",
    name: "Ìká Méjì",
    altNames: ["Ika Meji"],
    leg: "2122",
    factualSummary: "Eleventh principal Odù.",
  },
  {
    rank: 12,
    slug: "oturupon-meji",
    name: "Òtúrúpọ̀n Méjì",
    altNames: ["Oturupon Meji", "Otorupon Meji", "Ologbon Meji"],
    leg: "2212",
    factualSummary: "Twelfth principal Odù.",
  },
  {
    rank: 13,
    slug: "otura-meji",
    name: "Òtúrá Méjì",
    altNames: ["Otura Meji", "Otua Meji"],
    leg: "1211",
    factualSummary: "Thirteenth principal Odù.",
  },
  {
    rank: 14,
    slug: "irete-meji",
    name: "Ìrẹtẹ̀ Méjì",
    altNames: ["Irete Meji", "Irete"],
    leg: "1121",
    factualSummary: "Fourteenth principal Odù.",
  },
  {
    rank: 15,
    slug: "ose-meji",
    name: "Ọ̀ṣẹ́ Méjì",
    altNames: ["Ose Meji", "Oshe Meji"],
    leg: "1212",
    factualSummary: "Fifteenth principal Odù.",
  },
  {
    rank: 16,
    slug: "ofun-meji",
    name: "Òfún Méjì",
    altNames: ["Ofun Meji", "Orangun Meji", "Ọ̀ràngún Méjì"],
    leg: "2121",
    factualSummary:
      "Sixteenth principal Odù, also known as Ọ̀ràngún Méjì.",
  },
];

/** Lookup the primary Odù definition by slug. */
export function primaryBySlug(slug: string): PrimaryOduFact | undefined {
  return PRIMARY_ODU.find((o) => o.slug === slug);
}

/** Lookup the primary Odù definition by seniority rank (1..16). */
export function primaryByRank(rank: number): PrimaryOduFact | undefined {
  return PRIMARY_ODU.find((o) => o.rank === rank);
}

/** Full signature string for a primary (méjì) Odù: identical legs. */
export function primarySignature(o: PrimaryOduFact): string {
  return `${o.leg}|${o.leg}`;
}
