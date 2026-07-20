import assert from "node:assert/strict";
import test from "node:test";
import {
  ACTIVE_CONSULTATION_TTL_MS,
  fingerprintIntent,
  materiallySameIntent,
  resolveConsultationSeed,
  type StorageLike,
} from "./continuity";

class MemoryStorage implements StorageLike {
  private values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  dump() {
    return [...this.values.values()].join("\n");
  }
}

test("minor rewording is treated as the same concern", () => {
  const first = fingerprintIntent("WORK", "Should I leave my current job?");
  const reworded = fingerprintIntent("WORK", "Is it time to quit this work?");
  assert.equal(materiallySameIntent(first, reworded), true);
});

test("a changed decision or area starts a new concern", () => {
  const leave = fingerprintIntent("WORK", "Should I leave this job?");
  const promotion = fingerprintIntent("WORK", "Should I accept a promotion at work?");
  const relationship = fingerprintIntent("MARRIAGE", "Should I leave this relationship?");
  assert.equal(materiallySameIntent(leave, promotion), false);
  assert.equal(materiallySameIntent(leave, relationship), false);
});

test("negation and numeric time horizons are material", () => {
  assert.equal(
    materiallySameIntent(
      fingerprintIntent("WORK", "Should I leave work this year?"),
      fingerprintIntent("WORK", "Should I not leave work this year?"),
    ),
    false,
  );
  assert.equal(
    materiallySameIntent(
      fingerprintIntent("WORK", "Should I leave work in 2026?"),
      fingerprintIntent("WORK", "Should I leave work in 2027?"),
    ),
    false,
  );
});

test("the active consultation reuses its seed and expires after one day", () => {
  const storage = new MemoryStorage();
  const now = 1_000_000;
  const first = resolveConsultationSeed({
    area: "WORK",
    question: "Should I leave my current job?",
    now,
    storage,
  });
  const repeated = resolveConsultationSeed({
    area: "WORK",
    question: "Is it time to quit this work?",
    now: now + 60_000,
    storage,
  });
  const expired = resolveConsultationSeed({
    area: "WORK",
    question: "Should I leave my current job?",
    now: now + ACTIVE_CONSULTATION_TTL_MS + 1,
    storage,
  });

  assert.equal(first.reused, false);
  assert.equal(repeated.reused, true);
  assert.equal(repeated.seed, first.seed);
  assert.equal(expired.reused, false);
  assert.notEqual(expired.seed, first.seed);
  assert.equal(storage.dump().includes("Should I leave"), false);
  assert.equal(storage.dump().includes("job"), false);
});

