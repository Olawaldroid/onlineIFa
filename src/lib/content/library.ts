// ===========================================================================
// Display list for /library — composes the verified public-domain registry
// (src/lib/sources/publicDomain.ts, also used for the Source/permission
// workflow) with a couple of additional openly-licensed / reference-only
// works that aren't strictly public domain. See docs/CORE_KNOWLEDGE.md §6
// for the full source registry and licence posture.
// ===========================================================================

import { PUBLIC_DOMAIN_BOOKS } from "@/lib/sources/publicDomain";
import { REFERENCE_WORKS } from "@/lib/sources/references";

export interface LibraryEntry {
  id: string;
  tag: string;
  title: string;
  author: string;
  note: string;
  href: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export const LIBRARY_ENTRIES: LibraryEntry[] = [
  ...PUBLIC_DOMAIN_BOOKS.map((b) => ({
    id: b.id,
    tag: `PUBLIC DOMAIN · ${b.year}`,
    title: b.title,
    author: b.author,
    note: b.note,
    href: b.archiveUrl,
    secondaryHref: b.fullTextUrl,
    secondaryLabel: b.fullTextUrl ? "Full text" : undefined,
  })),
  {
    id: "src-oer-coleman-fatunmbi",
    tag: "OPEN LICENCE · CC BY-NC",
    title: "African Traditional Religions: Ifa",
    author: "Coleman & Fatunmbi (OER)",
    note: "An open educational textbook chapter on Ifá — free to read and reuse non-commercially.",
    href: "https://pressbooks.pub/africantraditionalreligion/chapter/ifa/",
  },
  {
    id: "src-abimbola-1976",
    tag: "REFERENCE · FACTS ONLY",
    title: "Ifá: An Exposition of Ifá Literary Corpus",
    author: "Wándé Abímbọ́lá, 1976",
    note: "The foundational modern study. In copyright — referenced for facts, never copied.",
    href: "https://en.wikipedia.org/wiki/Wande_Abimbola",
  },
  ...REFERENCE_WORKS.map((r) => ({
    id: r.id,
    tag: `REFERENCE · FACTS ONLY · ${r.year}`,
    title: r.title,
    author: r.author,
    note: r.note,
    href: r.href,
  })),
];
