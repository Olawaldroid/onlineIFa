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
import { oduFactBySignature } from "../odu/facts";

export type AyewoOutcome = "IRE" | "IBI";

export interface AyewoComparisonCast {
  proposition: AyewoOutcome;
  signature: string;
  oduSlug: string | null;
  oduName: string;
  rank: number;
  draws: number[];
}

export interface AyewoResult {
  /** The selected proposition, not a replacement for the consultation's Odù. */
  outcome: AyewoOutcome;
  /** Conventional visible object for this app's declared protocol. */
  selectedObject: "COWRIES" | "BONE";
  method: "PAIRED_ODU_SENIORITY" | "PRACTITIONER_RECORDED";
  /** Present for simulated/learning casts; absent for a manually recorded result. */
  comparisons: [AyewoComparisonCast, AyewoComparisonCast] | null;
  selectedBy: "SENIORITY" | "FIRST_CAST_CONFIRMS_TIE" | "PRACTITIONER";
  protocol: string;
}

export interface CastResult {
  mode: CastingMode;
  /** "rightLeg|leftLeg", each leg 4 chars of "1"/"2". */
  signature: string;
  /** The 8 raw binary draws (right leg first), 0/1 each. */
  draws: number[];
  seed: string;
  /** Resolved Odù slug, derived from the signature. */
  oduSlug: string | null;
  /** Secondary Ìbò/Àyẹ̀wò determination, where the mode supports one. */
  ayewo: AyewoResult | null;
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

function drawSignature(seed: string): {
  signature: string;
  draws: number[];
  oduSlug: string | null;
} {
  const rand = seededRandom(seed);
  const draws: number[] = [];
  for (let i = 0; i < 8; i++) draws.push(rand() < 0.5 ? 0 : 1);
  const toLeg = (bits: number[]) => bits.map((b) => (b === 0 ? "1" : "2")).join("");
  const rightLeg = toLeg(draws.slice(0, 4));
  const leftLeg = toLeg(draws.slice(4, 8));
  return {
    signature: `${rightLeg}|${leftLeg}`,
    draws,
    oduSlug: combinedSlug(rightLeg, leftLeg),
  };
}

function comparisonCast(seed: string, proposition: AyewoOutcome): AyewoComparisonCast {
  const cast = drawSignature(seed);
  const fact = oduFactBySignature(cast.signature);
  return {
    proposition,
    signature: cast.signature,
    oduSlug: cast.oduSlug,
    oduName: fact?.name ?? cast.signature,
    rank: fact?.rank ?? Number.MAX_SAFE_INTEGER,
    draws: cast.draws,
  };
}

/**
 * Simulate one Ìbò/Àyẹ̀wò inquiry using a declared paired-cast protocol.
 * The first throw represents the favourable proposition and the second the
 * cautionary proposition; the more senior Odù selects the proposition. A tie
 * confirms the first throw. These are auxiliary comparison casts, not fresh
 * principal consultation Odù.
 */
export function simulatedAyewo(seed: string): AyewoResult {
  const ire = comparisonCast(`${seed}:ayewo:ire`, "IRE");
  const ibi = comparisonCast(`${seed}:ayewo:ibi`, "IBI");
  const tie = ire.rank === ibi.rank;
  const outcome: AyewoOutcome = tie || ire.rank < ibi.rank ? "IRE" : "IBI";
  return {
    outcome,
    selectedObject: outcome === "IRE" ? "COWRIES" : "BONE",
    method: "PAIRED_ODU_SENIORITY",
    comparisons: [ire, ibi],
    selectedBy: tie ? "FIRST_CAST_CONFIRMS_TIE" : "SENIORITY",
    protocol: "Yorùbá paired-alternative comparison · app seniority order v1",
  };
}

function recordedAyewo(outcome: AyewoOutcome): AyewoResult {
  return {
    outcome,
    selectedObject: outcome === "IRE" ? "COWRIES" : "BONE",
    method: "PRACTITIONER_RECORDED",
    comparisons: null,
    selectedBy: "PRACTITIONER",
    protocol: "Recorded from the physical consultation; lineage protocol not inferred",
  };
}

/**
 * Simulated cast: 8 binary draws → two legs. Mark "1" (single) or "2" (double).
 * A `seed` may be supplied for reproducible/learning casts.
 */
export function simulatedCast(seed = `${Date.now()}-${Math.random()}`): CastResult {
  const cast = drawSignature(seed);
  return {
    mode: "SIMULATED",
    signature: cast.signature,
    draws: cast.draws,
    seed,
    oduSlug: cast.oduSlug,
    ayewo: simulatedAyewo(seed),
    meta: { method: "opele-style-8-draws", ayewoProtocol: "paired-odu-seniority-v1" },
  };
}

/** Manual entry: a Babalawo provides the signature directly. */
export function manualCast(
  signature: string,
  babalawoId: string,
  ayewoOutcome?: AyewoOutcome,
): CastResult {
  const [rightLeg, leftLeg] = signature.split("|");
  return {
    mode: "MANUAL_BABALAWO",
    signature,
    draws: [],
    seed: "",
    oduSlug: combinedSlug(rightLeg ?? "", leftLeg ?? ""),
    ayewo: ayewoOutcome ? recordedAyewo(ayewoOutcome) : null,
    meta: { enteredBy: babalawoId, ayewoOutcome: ayewoOutcome ?? null },
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
    ayewo: null,
    meta: { selected: true },
  };
}

/** Learning mode: same as simulated but flagged as a walkthrough. */
export function learningCast(seed?: string): CastResult {
  return { ...simulatedCast(seed), mode: "LEARNING", meta: { walkthrough: true } };
}
