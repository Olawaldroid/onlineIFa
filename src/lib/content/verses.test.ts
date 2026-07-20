import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";
import sourceCatalog from "../../../content/ese-ifa/source-catalog.json";
import {
  CLOSING_CHANT,
  ESE_SOURCE,
  ESE_VERSES,
  validateEseCorpus,
} from "./verses";
import { iweVerseForOdu, validateIweCorpus } from "./iweVerses";

test("public Ẹsẹ corpus has complete, valid provenance", () => {
  assert.deepEqual(validateEseCorpus(), []);
  assert.equal(ESE_VERSES.length, 4);
  assert.equal(CLOSING_CHANT.printedPages, "22");
  assert.equal(ESE_SOURCE.licence.spdx, "CC-BY-NC-SA-4.0");
  assert.match(ESE_SOURCE.doi, /^10\./);

  for (const verse of ESE_VERSES) {
    assert.ok(verse.id.startsWith("ese-"));
    assert.ok(verse.printedPages);
    assert.ok(verse.pdfPages);
    assert.equal(verse.source.id, ESE_SOURCE.id);
  }
});

test("catalog entry and local source copy match the published corpus", () => {
  const catalogEntry = sourceCatalog.sources.find((source) => source.id === ESE_SOURCE.id);
  assert.ok(catalogEntry);
  assert.equal(catalogEntry.sha256, ESE_SOURCE.localCopy.sha256);
  assert.equal(catalogEntry.localPath, ESE_SOURCE.localCopy.path);
  assert.equal(catalogEntry.pages, ESE_SOURCE.localCopy.pageCount);

  const localPath = path.resolve(ESE_SOURCE.localCopy.path);
  if (!existsSync(localPath)) return;

  const bytes = readFileSync(localPath);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), ESE_SOURCE.localCopy.sha256);
});

test("every archived source has a stable checksum and explicit review state", () => {
  for (const source of sourceCatalog.sources) {
    assert.match(source.sha256, /^[a-f0-9]{64}$/);
    assert.ok(source.status);
    assert.ok(source.use);
    assert.match(source.canonicalUrl, /^https:\/\//);
  }
});

test("permission-cleared Ìwé verses are valid and selected deterministically", () => {
  assert.deepEqual(validateIweCorpus(), []);
  const first = iweVerseForOdu("ogbe-meji", "stable-cast");
  const repeated = iweVerseForOdu("ogbe-meji", "stable-cast");
  assert.ok(first);
  assert.deepEqual(repeated, first);
  assert.equal(first.source.permission.status, "GRANTED");
  assert.ok(first.pdfPages);
  assert.equal(iweVerseForOdu("ofun-ogbe", "stable-cast"), null);
});
