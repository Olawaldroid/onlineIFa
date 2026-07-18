// ===========================================================================
// Casting execution.
// ---------------------------------------------------------------------------
// Produces a structurally-valid Odù signature for each supported mode.
// The simulated cast mimics the Ọ̀pẹ̀lẹ̀ (divining chain): 8 binary draws form
// two legs of 4 marks each. We record the seed and draws so a cast is
// reproducible and auditable — transparency over mystique.
// ===========================================================================

// Type-only import: erased at compile time, so this module (pure functions,
// no I/O) stays safe to import from client components for guest-mode casting.
import type { CastingMode } from "@prisma/client";
import { PRIMARY_ODU } from "../odu/primary";

export interface CastResult {
  mode: CastingMode;
  /** "rightLeg|leftLeg", each leg 4 chars of "1"/"2". */
  signature: string;
  /** The 8 raw binary draws (right leg first), 0/1 each. */
  draws: number[];
  seed: string;
  /** Resolved Odù slug, derived from the signature. */
  oduSlug: string | null;
  meta: Record<string, unknown>;
}

/** Deterministic PRNG (mulberry32) seeded from a string, for reproducibility. */
function seededRandom(seed: string): () => number {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function legToSlug(leg: string): string | null {
  return PRIMARY_ODU.find((o) => o.leg === leg)?.slug ?? null;
}

function combinedSlug(rightLeg: string, leftLeg: string): string | null {
  const r = legToSlug(rightLeg);
  const l = legToSlug(leftLeg);
  if (!r || !l) return null;
  if (r === l) return r;
  return `${r.replace("-meji", "")}-${l.replace("-meji", "")}`;
}

/**
 * Simulated cast: 8 binary draws → two legs. Mark "1" (single) or "2" (double).
 * A `seed` may be supplied for reproducible/learning casts.
 */
export function simulatedCast(seed = `${Date.now()}-${Math.random()}`): CastResult {
  const rand = seededRandom(seed);
  const draws: number[] = [];
  for (let i = 0; i < 8; i++) draws.push(rand() < 0.5 ? 0 : 1);
  const toLeg = (bits: number[]) => bits.map((b) => (b === 0 ? "1" : "2")).join("");
  const rightLeg = toLeg(draws.slice(0, 4));
  const leftLeg = toLeg(draws.slice(4, 8));
  return {
    mode: "SIMULATED",
    signature: `${rightLeg}|${leftLeg}`,
    draws,
    seed,
    oduSlug: combinedSlug(rightLeg, leftLeg),
    meta: { method: "opele-style-8-draws" },
  };
}

/** Manual entry: a Babalawo provides the signature directly. */
export function manualCast(signature: string, babalawoId: string): CastResult {
  const [rightLeg, leftLeg] = signature.split("|");
  return {
    mode: "MANUAL_BABALAWO",
    signature,
    draws: [],
    seed: "",
    oduSlug: combinedSlug(rightLeg ?? "", leftLeg ?? ""),
    meta: { enteredBy: babalawoId },
  };
}

/** User selects a known Odù by signature. */
export function userSelectedCast(signature: string): CastResult {
  const [rightLeg, leftLeg] = signature.split("|");
  return {
    mode: "USER_SELECTED",
    signature,
    draws: [],
    seed: "",
    oduSlug: combinedSlug(rightLeg ?? "", leftLeg ?? ""),
    meta: { selected: true },
  };
}

/** Learning mode: same as simulated but flagged as a walkthrough. */
export function learningCast(seed?: string): CastResult {
  return { ...simulatedCast(seed), mode: "LEARNING", meta: { walkthrough: true } };
}
