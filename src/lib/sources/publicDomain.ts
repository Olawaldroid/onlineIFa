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
];
