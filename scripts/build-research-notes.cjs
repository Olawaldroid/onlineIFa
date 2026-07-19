const fs = require("node:fs/promises");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const local = path.join(root, ".local-research");

function normalise(value) {
  return value.toLocaleLowerCase().normalize("NFKD").replace(/\p{M}/gu, "");
}

async function main() {
  const index = JSON.parse(await fs.readFile(path.join(local, "book-index.json"), "utf8"));
  const primarySource = await fs.readFile(path.join(root, "src", "lib", "odu", "primary.ts"), "utf8");
  const rows = [...primarySource.matchAll(/slug:\s*"([^"]+)"[\s\S]{0,180}?name:\s*"([^"]+)"/g)];
  const notes = rows.map(([, slug, name]) => {
    const terms = [...new Set([name, name.replace(/\s+Meji$/i, ""), slug.replaceAll("-", " ")].map(normalise))];
    const matches = [];
    for (const document of index.documents) {
      for (const chunk of document.chunks) {
        const text = normalise(chunk.content);
        if (terms.some((term) => term.length > 3 && text.includes(term))) {
          matches.push({ sourceId: document.id, sourceTitle: document.title, chunkId: chunk.id });
        }
      }
    }
    return { oduSlug: slug, oduName: name, sourceLinks: matches.slice(0, 60), editorialStatus: "PRIVATE_RESEARCH_ONLY" };
  });
  const output = path.join(local, "odu-research-notes.json");
  await fs.writeFile(output, JSON.stringify({ generatedAt: new Date().toISOString(), language: "en", notes }, null, 2));
  console.log(`Built private source-linked notes for ${notes.length} principal Odù: ${output}`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
