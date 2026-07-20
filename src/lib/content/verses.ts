// ===========================================================================
// Ẹsẹ Ifá — public, source-verified passages.
// ---------------------------------------------------------------------------
// The public corpus is loaded from a tracked provenance record. A PDF merely
// appearing on the local research shelf never makes it into this module.
// See content/ese-ifa/README.md for the publication workflow.
// ===========================================================================

import corpusJson from "../../../content/ese-ifa/pogoson-akande-2011.json";
import { oduFactBySlug } from "@/lib/odu/facts";

export interface EseLicence {
  spdx: string;
  label: string;
  url: string;
  policyUrl: string;
  verifiedAt: string;
  scopeNote: string;
}

export interface EseSource {
  id: string;
  title: string;
  authors: string[];
  year: number;
  journal: string;
  issue: string;
  articlePages: string;
  doi: string;
  canonicalUrl: string;
  licence: EseLicence;
  localCopy: {
    path: string;
    sha256: string;
    pageCount: number;
  };
  translationCredit: string;
  transcriptionNote: string;
  reviewNote: string;
}

export interface EsePassage {
  id: string;
  recordedFrom: string;
  recordedPlace: string;
  recordedYear: number;
  context: string;
  printedPages: string;
  pdfPages: string;
  yoruba: string[];
  english: string[];
  excerpt: boolean;
  source: EseSource;
}

export interface EseVerse extends EsePassage {
  oduSlug: string;
}

interface RawVerse extends Omit<EseVerse, "source"> {}

interface RawSupplementaryPassage extends Omit<EsePassage, "source"> {
  kind: "RECORDED_CLOSING_PATTERN";
}

interface RawCorpus {
  schemaVersion: number;
  source: EseSource;
  verses: RawVerse[];
  supplementaryPassages: RawSupplementaryPassage[];
}

const corpus = corpusJson as RawCorpus;

/** Complete provenance shared by every currently published passage. */
export const ESE_SOURCE: EseSource = corpus.source;

/** Only rights-cleared, source-verified passages belong in this export. */
export const ESE_VERSES: EseVerse[] = corpus.verses.map((verse) => ({
  ...verse,
  source: ESE_SOURCE,
}));

/** One documented closing pattern—not a universal ending or prescription. */
export const CLOSING_CHANT: EsePassage = {
  ...corpus.supplementaryPassages[0],
  source: ESE_SOURCE,
};

export function eseSourceAllowsCurrentPublication(source = ESE_SOURCE): boolean {
  const commercial = process.env.NEXT_PUBLIC_SITE_COMMERCIAL === "true";
  return !commercial || !source.licence.spdx.includes("-NC-");
}

export function versesForOdu(oduSlug: string): EseVerse[] {
  if (!eseSourceAllowsCurrentPublication()) return [];
  return ESE_VERSES.filter((verse) => verse.oduSlug === oduSlug);
}

/**
 * Validate the checked-in public corpus. Kept dependency-free so the same
 * contract can run in CI, the seed importer, and local editorial tooling.
 */
export function validateEseCorpus(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  const passages: (EseVerse | EsePassage)[] = [...ESE_VERSES, CLOSING_CHANT];

  if (corpus.schemaVersion !== 1) errors.push("Unsupported Ẹsẹ corpus schema version.");
  if (ESE_SOURCE.licence.spdx !== "CC-BY-NC-SA-4.0") {
    errors.push("Pogoson/Akande must retain its exact CC-BY-NC-SA-4.0 licence.");
  }
  if (!/^https:\/\//.test(ESE_SOURCE.canonicalUrl)) errors.push("Source URL must use HTTPS.");
  if (!/^https:\/\//.test(ESE_SOURCE.licence.url)) errors.push("Licence URL must use HTTPS.");
  if (!/^[a-f0-9]{64}$/.test(ESE_SOURCE.localCopy.sha256)) errors.push("Source SHA-256 is invalid.");

  for (const passage of passages) {
    if (ids.has(passage.id)) errors.push(`Duplicate passage ID: ${passage.id}`);
    ids.add(passage.id);
    if (!passage.printedPages || !passage.pdfPages) {
      errors.push(`${passage.id} is missing an exact page locator.`);
    }
    if (passage.yoruba.length === 0 || passage.english.length === 0) {
      errors.push(`${passage.id} is missing bilingual text.`);
    }
    if (passage.yoruba.length !== passage.english.length) {
      errors.push(`${passage.id} has unaligned Yorùbá and English lines.`);
    }
  }

  for (const verse of ESE_VERSES) {
    if (!oduFactBySlug(verse.oduSlug)) errors.push(`${verse.id} names an unknown Odù slug.`);
  }

  return errors;
}
