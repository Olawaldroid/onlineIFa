const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const local = path.join(root, ".local-research");
const sourceFile = path.join(local, "book-index-source.json");
const outputFile = path.join(local, "book-index.json");
const portuguese = /filosofia|lucum[ií]|manual_de|or[aá]culos/i;
const englishTitles = [
  [/filosofia/i, "Ifá: Philosophy and Science of Life"],
  [/lucum[ií]/i, "Ifá Lucumí: Recovering the Tradition"],
  [/manual_de/i, "Handbook of Yoruba Religious Concepts"],
  [/or[aá]culos/i, "The Oracles of Ifá: Communication with the Gods in Yoruba, Candomblé, and Santería Traditions"],
];

async function main() {
  const source = JSON.parse(await fs.readFile(sourceFile, "utf8"));
  const documents = [];
  for (const document of source.documents) {
    if (!portuguese.test(document.filename)) {
      documents.push({ ...document, sourceLanguage: "en", displayLanguage: "en" });
      continue;
    }
    const cacheFile = path.join(local, "translations", `${document.id}.json`);
    const translated = JSON.parse(await fs.readFile(cacheFile, "utf8"));
    const chunks = document.chunks.map((chunk) => {
      const content = translated.chunks[chunk.id];
      if (!content) throw new Error(`Missing English translation for ${chunk.id}`);
      return { ...chunk, content };
    });
    const title = englishTitles.find(([pattern]) => pattern.test(document.filename))?.[1] || translated.displayTitle;
    documents.push({ ...document, title, sourceLanguage: "pt", displayLanguage: "en", chunks });
  }
  await fs.writeFile(outputFile, JSON.stringify({ ...source, generatedAt: new Date().toISOString(), displayLanguage: "en", documents }, null, 2));
  console.log(`Built English-only index with ${documents.length} books: ${outputFile}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
