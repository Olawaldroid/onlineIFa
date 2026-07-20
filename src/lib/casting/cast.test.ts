import assert from "node:assert/strict";
import test from "node:test";
import { simulatedCast } from "./cast";

test("a seed reproduces the principal Odù and its Àyẹ̀wò trace", () => {
  const first = simulatedCast("stable-consultation");
  const repeated = simulatedCast("stable-consultation");
  assert.deepEqual(repeated, first);
  assert.ok(first.ayewo);
  assert.equal(first.ayewo.comparisons?.length, 2);
});

test("Àyẹ̀wò selects the proposition with the senior comparison Odù", () => {
  const ayewo = simulatedCast("paired-comparison").ayewo;
  assert.ok(ayewo?.comparisons);
  const [ire, ibi] = ayewo.comparisons;
  const expected = ire.rank <= ibi.rank ? "IRE" : "IBI";
  assert.equal(ayewo.outcome, expected);
  assert.equal(ayewo.selectedObject, expected === "IRE" ? "COWRIES" : "BONE");
});

