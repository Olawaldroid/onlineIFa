const crypto = require("node:crypto");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const catalogPath = path.join(projectRoot, "content", "ese-ifa", "source-catalog.json");
const catalog = JSON.parse(fs.readFileSync(catalogPath, "utf8"));
const requireAll = process.argv.includes("--require-all");
let failures = 0;

for (const source of catalog.sources) {
  const localPath = path.resolve(projectRoot, source.localPath);
  if (!localPath.startsWith(projectRoot + path.sep)) {
    console.error(`FAIL ${source.id}: localPath escapes the project`);
    failures += 1;
    continue;
  }
  if (!fs.existsSync(localPath)) {
    console.log(`MISS ${source.id}: ${source.localPath}`);
    if (requireAll) failures += 1;
    continue;
  }

  const bytes = fs.readFileSync(localPath);
  const digest = crypto.createHash("sha256").update(bytes).digest("hex");
  const sizeMatches = bytes.length === source.bytes;
  const hashMatches = digest === source.sha256;

  if (!sizeMatches || !hashMatches) {
    console.error(
      `FAIL ${source.id}: expected ${source.bytes} bytes / ${source.sha256}, got ${bytes.length} / ${digest}`,
    );
    failures += 1;
    continue;
  }
  console.log(`OK   ${source.id}: ${bytes.length} bytes, SHA-256 ${digest}`);
}

if (failures) {
  process.exitCode = 1;
} else {
  console.log(`Verified ${catalog.sources.length} Ẹsẹ source records.`);
}
