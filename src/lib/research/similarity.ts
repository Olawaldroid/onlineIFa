import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

interface PrivateIndex {
  documents: Array<{ title: string; chunks: Array<{ id: string; content: string }> }>;
}

export interface SimilarityReport {
  checked: boolean;
  blocked: boolean;
  maxScore: number;
  matchedTitle?: string;
  matchedChunkId?: string;
  reason: string;
}

const INDEX_PATH = path.join(process.cwd(), ".local-research", "book-index.json");
const MIN_WORDS = 18;
const SHINGLE_SIZE = 8;
const BLOCK_SCORE = 0.42;

function words(value: string) {
  return value.toLocaleLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").match(/[\p{L}\p{N}]+/gu) ?? [];
}

function shingles(tokens: string[]) {
  const result = new Set<string>();
  for (let index = 0; index <= tokens.length - SHINGLE_SIZE; index += 1) {
    result.add(tokens.slice(index, index + SHINGLE_SIZE).join(" "));
  }
  return result;
}

export async function checkPrivateBookSimilarity(content: string): Promise<SimilarityReport> {
  const submittedWords = words(content);
  if (submittedWords.length < MIN_WORDS) {
    return { checked: true, blocked: false, maxScore: 0, reason: "Too short for a meaningful long-form similarity match." };
  }

  let index: PrivateIndex;
  try {
    index = JSON.parse(await fs.readFile(INDEX_PATH, "utf8")) as PrivateIndex;
  } catch {
    return { checked: false, blocked: false, maxScore: 0, reason: "Private research index unavailable; admin review is required." };
  }

  const submitted = shingles(submittedWords);
  let best = { score: 0, title: "", chunkId: "" };
  for (const document of index.documents) {
    for (const chunk of document.chunks) {
      const source = shingles(words(chunk.content));
      if (!source.size) continue;
      let matches = 0;
      for (const shingle of submitted) if (source.has(shingle)) matches += 1;
      const score = matches / Math.max(1, submitted.size);
      if (score > best.score) best = { score, title: document.title, chunkId: chunk.id };
    }
  }

  return {
    checked: true,
    blocked: best.score >= BLOCK_SCORE,
    maxScore: Number(best.score.toFixed(3)),
    matchedTitle: best.title || undefined,
    matchedChunkId: best.chunkId || undefined,
    reason: best.score >= BLOCK_SCORE
      ? "This draft is too close to text in the private research shelf. Rewrite it in your own structure and language."
      : "No close long-form match was found in the private research shelf.",
  };
}
