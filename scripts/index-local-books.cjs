/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const path = require("node:path");
const pdf = require("pdf-parse");
const { EPub } = require("epub2");

const projectRoot = path.resolve(__dirname, "..");
const sourceDir = path.resolve(
  process.env.IFA_BOOKS_PATH || "C:\\Users\\info\\Documents\\Wiki\\originals",
);
const outputDir = path.join(projectRoot, ".local-research");
const outputFile = path.join(outputDir, "book-index-source.json");
const supported = new Set([".pdf", ".epub"]);
const knownTitles = [
  [/iwe-fun-odu-ifa/i, "Ìwé fún Odù Ifá — Ancient Afrikan Sacred Text"],
];

function displayTitle(file, extractedTitle) {
  const known = knownTitles.find(([pattern]) => pattern.test(path.basename(file)));
  return known?.[1] || extractedTitle;
}

function cleanText(value) {
  return value
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function chunks(text, size = 1800, overlap = 250) {
  const result = [];
  for (let start = 0; start < text.length; start += size - overlap) {
    const value = text.slice(start, start + size).trim();
    if (value) result.push(value);
  }
  return result;
}

async function extractPdf(file, id) {
  const parsed = await pdf(await fs.readFile(file));
  let text = parsed.text;
  if (text.trim().length < 100) {
    try {
      text = await fs.readFile(path.join(outputDir, "ocr", `${id}.txt`), "utf8");
    } catch {}
  }
  return { title: parsed.info?.Title || path.basename(file, path.extname(file)), text };
}

async function extractEpub(file) {
  return new Promise((resolve, reject) => {
    const epub = new EPub(file);
    epub.on("error", reject);
    epub.on("end", async () => {
      try {
        const sections = await Promise.all(
          epub.flow.map(
            (item) =>
              new Promise((sectionResolve, sectionReject) => {
                epub.getChapterRaw(item.id, (error, html) =>
                  error ? sectionReject(error) : sectionResolve(cleanText(html || "")),
                );
              }),
          ),
        );
        resolve({
          title: epub.metadata?.title || path.basename(file, path.extname(file)),
          text: sections.join("\n\n"),
        });
      } catch (error) {
        reject(error);
      }
    });
    epub.parse();
  });
}

async function main() {
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  const files = entries
    .filter((entry) => entry.isFile() && supported.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => path.join(sourceDir, entry.name));

  const documents = [];
  for (const file of files) {
    const extension = path.extname(file).toLowerCase();
    process.stdout.write(`Indexing ${path.basename(file)} ... `);
    try {
      const id = crypto.createHash("sha256").update(file).digest("hex").slice(0, 16);
      const extracted = extension === ".pdf" ? await extractPdf(file, id) : await extractEpub(file);
      const text = cleanText(extracted.text);
      documents.push({
        id,
        title: displayTitle(file, extracted.title),
        filename: path.basename(file),
        format: extension.slice(1),
        classification: "LOCAL_RESEARCH_ONLY",
        permissionStatus: "PENDING",
        chunks: chunks(text).map((content, index) => ({ id: `${id}:${index}`, content })),
      });
      console.log(`${text.length.toLocaleString()} characters`);
    } catch (error) {
      console.log(`skipped (${error.message})`);
    }
  }

  await fs.mkdir(outputDir, { recursive: true });
  await fs.writeFile(
    outputFile,
    JSON.stringify({ version: 1, generatedAt: new Date().toISOString(), sourceDir, documents }, null, 2),
  );
  console.log(`\nIndexed ${documents.length}/${files.length} books into ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
