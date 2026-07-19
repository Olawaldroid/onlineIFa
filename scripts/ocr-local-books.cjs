const crypto = require("node:crypto");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");
const pdf = require("pdf-parse");

const run = promisify(execFile);
const projectRoot = path.resolve(__dirname, "..");
const sourceDir = path.resolve(process.env.IFA_BOOKS_PATH || "C:\\Users\\info\\Documents\\Wiki\\originals");
const cacheDir = path.join(projectRoot, ".local-research", "ocr");
const tessdataDir = path.join(projectRoot, ".local-research", "tessdata");
const popplerDir = "C:\\Users\\info\\.cache\\codex-runtimes\\codex-primary-runtime\\dependencies\\native\\poppler\\Library\\bin";
const pdfInfo = path.join(popplerDir, "pdfinfo.exe");
const pdfToPpm = path.join(popplerDir, "pdftoppm.exe");
const tesseract = process.env.TESSERACT_PATH || "C:\\Program Files\\Tesseract-OCR\\tesseract.exe";

function bookId(file) {
  return crypto.createHash("sha256").update(file).digest("hex").slice(0, 16);
}

async function ocrPage(file, page, tempDir, languages, pageCacheDir) {
  const cachedPage = path.join(pageCacheDir, `${page}.txt`);
  try { return await fs.readFile(cachedPage, "utf8"); } catch {}
  const prefix = path.join(tempDir, `page-${page}`);
  const image = `${prefix}.png`;
  await run(pdfToPpm, ["-f", String(page), "-l", String(page), "-r", "150", "-png", "-singlefile", file, prefix], { maxBuffer: 1024 * 1024 * 20 });
  try {
    const { stdout } = await run(tesseract, [image, "stdout", "--tessdata-dir", tessdataDir, "-l", languages, "--psm", "3"], { maxBuffer: 1024 * 1024 * 20 });
    const value = stdout.trim();
    await fs.writeFile(cachedPage, value, "utf8");
    return value;
  } finally {
    await fs.rm(image, { force: true });
  }
}

async function ocrBook(file) {
  const id = bookId(file);
  const output = path.join(cacheDir, `${id}.txt`);
  try {
    if ((await fs.stat(output)).size > 100) {
      console.log(`OCR cached: ${path.basename(file)}`);
      return;
    }
  } catch {}
  const { stdout } = await run(pdfInfo, [file]);
  const pages = Number(stdout.match(/^Pages:\s+(\d+)/m)?.[1] || 0);
  if (!pages) throw new Error(`Could not determine page count for ${file}`);
  const languages = /filosofia|portugu|iorub/i.test(path.basename(file)) ? "por+yor+eng" : "eng+yor";
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "online-ifa-ocr-"));
  const pageCacheDir = path.join(cacheDir, "pages", id);
  await fs.mkdir(pageCacheDir, { recursive: true });
  const text = new Array(pages);
  let next = 1;
  let complete = 0;
  console.log(`OCR ${path.basename(file)} (${pages} pages, ${languages})`);
  try {
    const worker = async () => {
      while (next <= pages) {
        const page = next++;
        text[page - 1] = await ocrPage(file, page, tempDir, languages, pageCacheDir);
        complete += 1;
        if (complete % 10 === 0 || complete === pages) console.log(`  ${complete}/${pages} pages`);
      }
    };
    await Promise.all(Array.from({ length: Math.min(8, pages) }, worker));
    await fs.mkdir(cacheDir, { recursive: true });
    await fs.writeFile(output, text.map((value, index) => `\n\n[Page ${index + 1}]\n${value || ""}`).join(""), "utf8");
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function main() {
  await fs.mkdir(cacheDir, { recursive: true });
  const files = (await fs.readdir(sourceDir, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && path.extname(entry.name).toLowerCase() === ".pdf")
    .map((entry) => path.join(sourceDir, entry.name));
  for (const file of files) {
    const parsed = await pdf(await fs.readFile(file));
    if (parsed.text.trim().length < 100) await ocrBook(file);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
