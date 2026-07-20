import assert from "node:assert/strict";
import test from "node:test";
import { retrieveForOdu, retrieveStaticForOdu } from "./retrieval";

test("study assistant retrieves checked-in content without DATABASE_URL", async () => {
  const previous = process.env.DATABASE_URL;
  delete process.env.DATABASE_URL;
  try {
    const context = await retrieveForOdu("irosun-meji");
    assert.ok(context.odu);
    assert.equal(context.odu.slug, "irosun-meji");
    assert.equal(context.isEmpty, false);
    assert.ok(context.interpretations.length > 0);
    assert.ok(context.verses.some((verse) => verse.sourceTitle?.includes("Ìwé fún Odù Ifá")));
  } finally {
    if (previous === undefined) delete process.env.DATABASE_URL;
    else process.env.DATABASE_URL = previous;
  }
});

test("static assistant retrieval rejects unknown Odù", () => {
  const context = retrieveStaticForOdu("not-an-odu");
  assert.equal(context.odu, null);
  assert.equal(context.isEmpty, true);
});
