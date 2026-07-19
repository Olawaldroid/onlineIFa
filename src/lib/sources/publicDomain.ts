// ===========================================================================
// Public-domain source books registry.
// ---------------------------------------------------------------------------
// Verified, openly-accessible works (pre-1929 publication → public domain in
// the US) that mention Yorùbá religion / Ifá. We surface them so users can read
// the ACTUAL books, and register them as `Source` rows (permission NOT_REQUIRED)
// so contributors can extract specific passages WITH page citations through the
// review workflow.
//
// IMPORTANT: We do NOT auto-extract or paraphrase verse/proverb text from these
// books here — colonial-era transcriptions are error-prone and OCR is unreliable.
// Any quoted text must be added by a contributor with an exact page citation and
// reviewed. These entries are bibliographic FACTS + links, not content.
//
// archive.org identifiers verified June 2026.
// ===========================================================================

export interface PublicDomainBook {
  id: string;
  title: string;
  author: string;
  year: number;
  /** archive.org item URL (readable online + downloadable). */
  archiveUrl: string;
  /** Optional direct full-text URL. */
  fullTextUrl?: string;
  /** One-line note on relevance + caveats. */
  note: string;
}

export const PUBLIC_DOMAIN_BOOKS: PublicDomainBook[] = [
  {
    id: "src-johnson-1921",
    title: "The History of the Yorubas",
    author: "Samuel Johnson (ed. Obadiah Johnson)",
    year: 1921,
    archiveUrl: "https://archive.org/details/historyofyorubas00john",
    fullTextUrl: "https://archive.org/stream/historyofyorubas00john/historyofyorubas00john_djvu.txt",
    note: "Foundational Yorùbá-authored history; covers religion, Ifá and customs. Public domain.",
  },
  {
    id: "src-ellis-1894",
    title:
      "The Yoruba-Speaking Peoples of the Slave Coast of West Africa",
    author: "A. B. Ellis",
    year: 1894,
    archiveUrl: "https://archive.org/details/yorubaspeakingpe0000elli",
    fullTextUrl: "https://archive.org/stream/yorubaspeakingp00elligoog/yorubaspeakingp00elligoog_djvu.txt",
    note: "Early ethnography of Yorùbá religion incl. Ifá. Colonial-era framing — use for facts, read critically.",
  },
  {
    id: "src-dennett-1910",
    title: "Nigerian Studies: or, The Religious and Political System of the Yoruba",
    author: "R. E. Dennett",
    year: 1910,
    archiveUrl: "https://archive.org/details/nigerianstudieso00dennuoft",
    note: "Study of Yorùbá religion and political system. Colonial-era framing — read critically.",
  },
  {
    id: "src-frobenius-1913",
    title: "The Voice of Africa (Vol. 1)",
    author: "Leo Frobenius",
    year: 1913,
    archiveUrl: "https://archive.org/details/voiceofafricabei01frob",
    note: "Travel/ethnography incl. Yorùbá (Ifè) material. Colonial-era framing — read critically.",
  },
  // --- Added 2026-07-19 (online scrub; identifiers verified via archive.org) ---
  {
    id: "src-farrow-1926",
    title: "Faith, Fancies and Fetich: or, Yoruba Paganism",
    author: "Stephen S. Farrow",
    year: 1926,
    archiveUrl: "https://archive.org/details/in.ernet.dli.2015.506397",
    fullTextUrl: "https://archive.org/stream/dli.ministry.02052/20775.155.E.397._djvu.txt",
    note: "A missionary-scholar study with a substantial chapter on Ifá divination. Colonial/missionary framing — read critically.",
  },
  {
    id: "src-wyndham-1921",
    title: "Myths of Ífè",
    author: "John Wyndham",
    year: 1921,
    archiveUrl: "https://archive.org/details/mythsofife00wynd",
    note: "Blank-verse renderings of Ifè creation narratives, with Ifá figures throughout. A literary retelling, not a transcription.",
  },
  {
    id: "src-dennett-1906",
    title: "At the Back of the Black Man's Mind",
    author: "R. E. Dennett",
    year: 1906,
    archiveUrl: "https://archive.org/details/atbackofblackman00denn",
    note: "Includes an appendix with extracts from Bishop James Johnson's 'Yoruba Heathenism' (1899) — one of the earliest Yorùbá-clergy accounts of Ifá. Read critically.",
  },
  {
    id: "src-talbot-1926",
    title: "The Peoples of Southern Nigeria",
    author: "P. Amaury Talbot",
    year: 1926,
    archiveUrl: "https://archive.org/details/peoplesofsouther0000perc",
    note: "Colonial survey of Southern Nigeria with chapters on religion and divination. Colonial-era framing — read critically.",
  },
];
