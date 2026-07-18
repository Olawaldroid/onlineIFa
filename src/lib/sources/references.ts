// ===========================================================================
// Reference shelf — copyrighted works we hold privately and use for FACTS ONLY.
// ---------------------------------------------------------------------------
// These books inform docs/CORE_KNOWLEDGE.md and our ORIGINAL summaries. Their
// text is NEVER reproduced in the app (see CONTENT_LICENSING.md); the digital
// copies live in the project owner's private Drive, not in this repo and not
// on the site. Each entry links only to a public bibliographic page.
// permissionStatus for all of these: PENDING (facts + attribution only).
// ===========================================================================

export interface ReferenceWork {
  id: string;
  title: string;
  author: string;
  year: string;
  language: "en" | "pt";
  note: string;
  /** Public bibliographic page (archive.org lending page, WorldCat, etc.). */
  href: string;
}

export const REFERENCE_WORKS: ReferenceWork[] = [
  {
    id: "ref-bascom-1969",
    title: "Ifa Divination: Communication Between Gods and Men in West Africa",
    author: "William Bascom",
    year: "1969",
    language: "en",
    note: "The landmark academic study — procedure, instruments, ordering conventions, and 186 recorded verses. Our primary fact-checking reference.",
    href: "https://archive.org/details/ifadivinationcomOOOObasc",
  },
  {
    id: "ref-abraham-1958",
    title: "Dictionary of Modern Yoruba",
    author: "R. C. Abraham",
    year: "1958",
    language: "en",
    note: "The classic Yorùbá dictionary — our authority for spellings, tone marks and glossary entries.",
    href: "https://search.worldcat.org/search?q=Dictionary+of+Modern+Yoruba+Abraham",
  },
  {
    id: "ref-gleason-1973",
    title: "A Recitation of Ifa, Oracle of the Yoruba",
    author: "Judith Gleason with Awotunde Aworinde & John Olaniyi Ogundipe",
    year: "1973",
    language: "en",
    note: "A recorded recitation with commentary — useful for verse structure and performance context.",
    href: "https://search.worldcat.org/search?q=A+Recitation+of+Ifa+Oracle+of+the+Yoruba+Gleason",
  },
  {
    id: "ref-emanuel-2000",
    title: "Ọdun Ifá: Ifá Festival",
    author: "Abosede Emanuel",
    year: "2000",
    language: "en",
    note: "A Lagos-published study of the Ifá festival with extensive Yorùbá liturgical material.",
    href: "https://search.worldcat.org/search?q=Odun+Ifa+festival+Abosede+Emanuel",
  },
  {
    id: "ref-ibie-v1",
    title: "Ifism: The Complete Work of Ọrunmila, Vol. 1",
    author: "C. Osamaro Ibie",
    year: "1986",
    language: "en",
    note: "Odù-by-Odù treatment from a practitioner-author — useful for cross-checking themes and orderings across lineages.",
    href: "https://search.worldcat.org/search?q=Ifism+Complete+Work+of+Orunmila+Ibie",
  },
  {
    id: "ref-ibie-v8-9",
    title: "Ifism: The Complete Work of Ọrunmila, Vols. 8–9",
    author: "C. Osamaro Ibie",
    year: "1992",
    language: "en",
    note: "Later volumes covering the minor Odù — a key cross-reference as our 240 combined-Odù notes develop.",
    href: "https://search.worldcat.org/search?q=Ifism+Complete+Work+of+Orunmila+Ibie",
  },
  {
    id: "ref-fatunmbi-ori",
    title: "Inner Peace: The Ifá Concept of Orí (Ifá Theology, Vol. 1)",
    author: "Awo Fá'lokun Fatunmbi",
    year: "2000s",
    language: "en",
    note: "Orí, ara, orí-inú and related concepts of self — informs our glossary and concept pages.",
    href: "https://search.worldcat.org/search?q=Fatunmbi+Inner+Peace+Ifa+Concept+of+Ori",
  },
  {
    id: "ref-fatunmbi-esu",
    title: "Èṣù-Ẹlẹ́gbà: Ifá and the Spirit of the Divine Messenger",
    author: "Awo Fá'lokun Fatunmbi",
    year: "1992",
    language: "en",
    note: "The role of Èṣù in divination — informs the museum and consultation copy.",
    href: "https://search.worldcat.org/search?q=Fatunmbi+Esu+Elegba+Divine+Messenger",
  },
  {
    id: "ref-karade-handbook",
    title: "The Handbook of Yoruba Religious Concepts",
    author: "Baba Ifa Karade",
    year: "1994 (rev. 2020; PT ed. 2025)",
    language: "en",
    note: "A widely-read introduction; held in English and Portuguese editions.",
    href: "https://search.worldcat.org/search?q=Handbook+of+Yoruba+Religious+Concepts+Karade",
  },
  {
    id: "ref-lopes-2020",
    title: "Ifá Lucumí: o resgate da tradição",
    author: "Nei Lopes",
    year: "2020",
    language: "pt",
    note: "A Brazilian study of the Lucumí lineage — directly relevant to our open Lukumí-ordering question.",
    href: "https://search.worldcat.org/search?q=Ifa+Lucumi+o+resgate+da+tradicao+Nei+Lopes",
  },
  {
    id: "ref-aderonmu",
    title: "Ifá: filosofia e ciência da vida",
    author: "Otunba Adekunle Aderonmu",
    year: "1st ed.",
    language: "pt",
    note: "A Portuguese-language practitioner treatment of Ifá philosophy.",
    href: "https://search.worldcat.org/search?q=Ifa+filosofia+e+ciencia+da+vida+Aderonmu",
  },
  {
    id: "ref-matias",
    title: "IFÁ: A Universal Concept of All Life, A Complex System",
    author: "Frank Matias",
    year: "2020s",
    language: "en",
    note: "A systems-oriented modern treatment — read critically alongside academic sources.",
    href: "https://search.worldcat.org/search?q=Ifa+Universal+Concept+All+Life+Frank+Matias",
  },
  {
    id: "ref-silva",
    title: "Ifá: The Ultimate Guide to a System of Divination",
    author: "Mari Silva",
    year: "2020s",
    language: "en",
    note: "A popular introduction — low scholarly weight; used only to gauge common presentations, never as a fact source on its own.",
    href: "https://search.worldcat.org/search?q=Ifa+Ultimate+Guide+Divination+Mari+Silva",
  },
  {
    id: "ref-isale-oyo-trays",
    title: "Ifá Divination Trays from Isale-Ọyọ",
    author: "Journal article (Isale-Ọyọ tray corpus)",
    year: "2000s",
    language: "en",
    note: "A study of carved ọpọn Ifá from Isale-Ọyọ — informs the museum section's descriptions of tray iconography.",
    href: "https://search.worldcat.org/search?q=Ifa+divination+trays+Isale+Oyo",
  },
];
