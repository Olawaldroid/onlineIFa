const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const localDir = path.join(root, ".local-research");
const incomingDir = path.join(localDir, "incoming");
const sourceIndexFile = path.join(localDir, "book-index-source.json");
const displayIndexFile = path.join(localDir, "book-index.json");

function parseArgs(values) {
  const result = {};
  const positional = [];
  for (let index = 0; index < values.length; index += 1) {
    if (!values[index].startsWith("--")) {
      positional.push(values[index]);
      continue;
    }
    result[values[index].slice(2)] = values[index + 1];
    index += 1;
  }
  // Some npm/Windows combinations consume unknown option names while passing
  // their values through to the script. Preserve the documented command form.
  if (!result.url && !result.file && positional.length >= 2) {
    if (/^https?:\/\//i.test(positional[0])) result.url = positional[0];
    else result.file = positional[0];
    result.id ||= positional[1];
    result.title ||= positional[2];
  }
  return result;
}

function cleanText(value) {
  return value.replace(/\r\n/g, "\n").replace(/[\t ]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function makeChunks(text, id, size = 1800, overlap = 250) {
  const result = [];
  for (let start = 0, index = 0; start < text.length; start += size - overlap, index += 1) {
    const content = text.slice(start, start + size).trim();
    if (content) result.push({ id: `${id}:${index}`, content });
  }
  return result;
}

async function readIndex(file) {
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    return { version: 1, generatedAt: new Date().toISOString(), documents: [] };
  }
}

function safeId(value) {
  const id = value.toLocaleLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (!id) throw new Error("A usable --id is required.");
  return id;
}

async function sourceFromArgs(args) {
  if (args.url) {
    const response = await fetch(args.url);
    if (!response.ok) throw new Error(`Download failed (${response.status}) for ${args.url}`);
    return { text: await response.text(), filename: path.basename(new URL(args.url).pathname), sourceUrl: args.url };
  }
  if (args.file) {
    const file = path.resolve(args.file);
    return { text: await fs.readFile(file, "utf8"), filename: path.basename(file) };
  }
  return null;
}

async function ingest(input, indexes) {
  const id = safeId(input.id);
  const text = cleanText(input.text);
  if (text.length < 100) throw new Error(`${input.filename} does not contain enough text to index.`);
  const existing = indexes.display.documents.find((item) => item.id === id);
  const document = {
    id,
    title: input.title || existing?.title || path.basename(input.filename, path.extname(input.filename)),
    filename: input.filename,
    format: "txt",
    classification: "LOCAL_RESEARCH_ONLY",
    permissionStatus: "PENDING",
    sourceLanguage: "en",
    displayLanguage: "en",
    ...(input.sourceUrl ? { sourceUrl: input.sourceUrl } : {}),
    chunks: makeChunks(text, id),
  };
  for (const index of [indexes.source, indexes.display]) {
    index.documents = index.documents.filter((item) => item.id !== id);
    index.documents.push(document);
    index.generatedAt = new Date().toISOString();
  }
  console.log(`Ingested ${document.title}: ${text.length.toLocaleString()} characters, ${document.chunks.length} chunks`);
}

async function main() {
  await fs.mkdir(incomingDir, { recursive: true });
  const args = parseArgs(process.argv.slice(2));
  const indexes = { source: await readIndex(sourceIndexFile), display: await readIndex(displayIndexFile) };
  const single = await sourceFromArgs(args);
  if (single) {
    if (!args.id) throw new Error("--id is required with --url or --file.");
    await ingest({ ...single, id: args.id, title: args.title }, indexes);
  } else {
    const files = (await fs.readdir(incomingDir, { withFileTypes: true }))
      .filter((entry) => entry.isFile() && path.extname(entry.name).toLocaleLowerCase() === ".txt");
    if (!files.length) console.log(`No .txt files found in ${incomingDir}`);
    for (const entry of files) {
      const file = path.join(incomingDir, entry.name);
      await ingest({
        id: path.basename(entry.name, ".txt"),
        filename: entry.name,
        text: await fs.readFile(file, "utf8"),
      }, indexes);
    }
  }
  await fs.writeFile(sourceIndexFile, JSON.stringify(indexes.source, null, 2));
  await fs.writeFile(displayIndexFile, JSON.stringify(indexes.display, null, 2));
}

main().catch((error) => { console.error(error.message); process.exitCode = 1; });
