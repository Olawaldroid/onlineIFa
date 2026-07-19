import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";

interface LocalBookIndex {
  generatedAt: string;
  documents: Array<{ id: string; title: string; filename: string; chunks: Array<{ id: string; content: string }> }>;
}

export interface LocalBookResult {
  bookId: string;
  chunkId: string;
  title: string;
  filename: string;
  excerpt: string;
  score: number;
}

const indexPath = path.join(process.cwd(), ".local-research", "book-index.json");

export async function localBookIndexStatus() {
  try {
    const index = JSON.parse(await fs.readFile(indexPath, "utf8")) as LocalBookIndex;
    return { available: true as const, generatedAt: index.generatedAt, books: index.documents.length, searchableBooks: index.documents.filter((document) => document.chunks.length > 0).length };
  } catch {
    return { available: false as const, generatedAt: null, books: 0, searchableBooks: 0 };
  }
}

export async function searchLocalBooks(query: string, limit = 12): Promise<LocalBookResult[]> {
  const terms = query.toLocaleLowerCase().split(/[^\p{L}\p{N}]+/u).filter((term) => term.length > 2).slice(0, 12);
  if (!terms.length) return [];
  let index: LocalBookIndex;
  try { index = JSON.parse(await fs.readFile(indexPath, "utf8")) as LocalBookIndex; } catch { return []; }
  const results: LocalBookResult[] = [];
  for (const document of index.documents) {
    for (const chunk of document.chunks) {
      const lower = chunk.content.toLocaleLowerCase();
      const score = terms.reduce((sum, term) => sum + Math.min(lower.split(term).length - 1, 5), 0);
      if (!score) continue;
      const firstMatch = Math.min(...terms.map((term) => lower.indexOf(term)).filter((at) => at >= 0));
      const start = Math.max(0, firstMatch - 180);
      results.push({ bookId: document.id, chunkId: chunk.id, title: document.title, filename: document.filename, excerpt: `${start > 0 ? "…" : ""}${chunk.content.slice(start, start + 650)}${start + 650 < chunk.content.length ? "…" : ""}`, score });
    }
  }
  return results.sort((a, b) => b.score - a.score).slice(0, Math.max(1, Math.min(limit, 30)));
}
