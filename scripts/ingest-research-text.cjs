#!/usr/bin/env node
// ===========================================================================
// Ingest a PUBLIC-DOMAIN or openly-licensed text into the private research
// index (.local-research/book-index.json) used by the similarity guard and
// `npm run books:notes`. Dependency-free.
//
//   npm run books:ingest -- --file path/to/text.txt --id farrow-1926 --title "Farrow 1926 — Faith, Fancies and Fetich"
//   npm run books:ingest -- --url  https://archive.org/stream/<item>/<item>_djvu.txt --id ellis-1894 --title "Ellis 1894"
//   npm run books:ingest -- --dir  .local-research/incoming        # every .txt inside, id/title from filename
//
// ONLY ingest texts you may legally hold: public domain (e.g. pre-1929
// archive.org full texts), open access, or your own private research copies.
// The index never leaves .local-research/ (gitignored) and is never deployed.
// After ingesting, run `npm run books:notes` to refresh source-linked notes.
// ===========================================================================

const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const local = path.join(root, ".local-research");
const INDEX = path.join(local, "book-index.json");
const CHUNK_WORDS = 1200;

function arg(name) {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function slugify(value) {
  return value.toLocaleLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
}

function chunk(text) {
  const words = text.replace(/\s+/g, " ").trim().split(" ");
  const chunks = [];
  for (let i = 0; i < words.length; i += CHUNK_WORDS) {
    chunks.push(words.slice(i, i + CHUNK_WORDS).join(" "));
  }
  return chunks;
}

async function loadIndex() {
  try {
    return JSON.parse(await fs.readFile(INDEX, "utf8"));
  } catch {
    return { documents: [] };
  }
}

async function fetchUrl(url) {
  const res = await fetch(url, { headers: { "user-agent": "online-ifa-research-ingest (public-domain texts only)" } });
  if (!res.ok) throw new Error(`Download failed: HTTP ${res.status} for ${url}`);
  return res.text();
}

async function ingestOne(index, { id, title, text, origin }) {
  const chunks = chunk(text).map((content, i) => ({ id: `${id}-c${i + 1}`, content }));
  if (!chunks.length) throw new Error(`No text found in ${origin}`);
  index.documents = index.documents.filter((d) => d.id !== id);
  index.documents.push({ id, title, origin, ingestedAt: new Date().toISOString(), chunks });
  console.log(`Ingested "${title}" (${id}): ${chunks.length} chunks from ${origin}`);
}

async function main() {
  await fs.mkdir(local, { recursive: true });
  const index = await loadIndex();
  const file = arg("file");
  const url = arg("url");
  const dir = arg("dir");

  if (url || file) {
    const origin = url ?? path.resolve(file);
    const fallback = slugify(path.basename(origin).replace(/\.[a-z]+$/i, ""));
    const id = arg("id") ?? fallback;
    const title = arg("title") ?? fallback;
    const text = url ? await fetchUrl(url) : await fs.readFile(file, "utf8");
    await ingestOne(index, { id, title, text, origin });
  } else {
    const source = dir ?? path.join(local, "incoming");
    let entries = [];
    try {
      entries = (await fs.readdir(source)).filter((n) => n.endsWith(".txt"));
    } catch {
      console.error(`Nothing to ingest: pass --file/--url, or put .txt files in ${source}`);
      process.exit(1);
    }
    if (!entries.length) {
      console.error(`No .txt files in ${source}. Pass --file, --url, or add files there.`);
      process.exit(1);
    }
    for (const name of entries) {
      const base = slugify(name.replace(/\.txt$/i, ""));
      const text = await fs.readFile(path.join(source, name), "utf8");
      await ingestOne(index, { id: base, title: base, text, origin: path.join(source, name) });
    }
  }

  await fs.writeFile(INDEX, JSON.stringify(index, null, 2));
  console.log(`Index now holds ${index.documents.length} documents → ${INDEX}`);
  console.log("Next: npm run books:notes  (refresh source-linked Odù notes)");
}

main().catch((error) => {
  console.error(error.message ?? error);
  process.exit(1);
});
