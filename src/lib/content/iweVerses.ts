import corpusJson from "../../../content/ese-ifa/iwe-fun-odu-ifa.json";

export interface IweVerse {
  id: string;
  number: number;
  oduSlug: string;
  pdfPages: string;
  printedPages: string;
  text: string;
  excerpt: boolean;
  source: {
    title: string;
    compiler: string;
    publisher: string;
    copyrightYears: string;
    permission: {
      status: "GRANTED";
      confirmedBy: string;
      confirmedAt: string;
      scope: string;
    };
    transcriptionNote: string;
  };
}

interface RawVerse extends Omit<IweVerse, "oduSlug" | "source"> {
  prescriptionMentions: number;
}

interface IweCorpus {
  schemaVersion: number;
  source: IweVerse["source"];
  sections: Array<{ oduSlug: string; verses: RawVerse[] }>;
}

const corpus = corpusJson as IweCorpus;
const sections = new Map(corpus.sections.map((section) => [section.oduSlug, section.verses]));

function stableIndex(value: string, length: number): number {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) % length;
}

/** Select one source-recorded Èsè deterministically for a cast and Odù. */
export function iweVerseForOdu(oduSlug: string, selectionKey: string): IweVerse | null {
  const candidates = sections.get(oduSlug);
  if (!candidates?.length) return null;
  const selected = candidates[stableIndex(`${oduSlug}:${selectionKey}`, candidates.length)];
  const { prescriptionMentions: _editorialScore, ...verse } = selected;
  return { ...verse, oduSlug, source: corpus.source };
}

export function validateIweCorpus(): string[] {
  const errors: string[] = [];
  const ids = new Set<string>();
  if (corpus.schemaVersion !== 1) errors.push("Unsupported Ìwé corpus schema version.");
  if (corpus.source.permission.status !== "GRANTED") errors.push("Ìwé publication permission is not granted.");
  for (const section of corpus.sections) {
    if (!section.verses.length) errors.push(`${section.oduSlug} has no publishable Èsè.`);
    for (const verse of section.verses) {
      if (ids.has(verse.id)) errors.push(`Duplicate Ìwé passage ID: ${verse.id}`);
      ids.add(verse.id);
      if (!verse.text || !verse.pdfPages || !verse.printedPages) {
        errors.push(`${verse.id} is missing text or a page locator.`);
      }
    }
  }
  return errors;
}
