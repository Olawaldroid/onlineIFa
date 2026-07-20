// ===========================================================================
// Active-consultation continuity.
// ---------------------------------------------------------------------------
// A simulated consultation receives one random seed. For a limited time, a
// materially equivalent concern on the same device reuses that seed instead
// of drawing until a preferred Odù appears. The question itself is never
// stored: only a small, hashed intent fingerprint and the reproducible seed.
//
// This is a product integrity rule for the digital consultation, not a claim
// that Ifá must metaphysically return the same Odù whenever wording is similar.
// ===========================================================================

export const ACTIVE_CONSULTATION_TTL_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = "online-ifa:active-consultations:v1";
const STORAGE_VERSION = 1;
const MAX_ACTIVE_CONSULTATIONS = 12;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface IntentFingerprint {
  area: string;
  terms: string[];
  domains: string[];
  actions: string[];
  numbers: string[];
  hasNegation: boolean;
}

interface StoredConsultation extends IntentFingerprint {
  seed: string;
  createdAt: number;
  expiresAt: number;
}

interface StoredPayload {
  version: number;
  entries: StoredConsultation[];
}

export interface ContinuityDecision {
  seed: string;
  reused: boolean;
  expiresAt: number;
  similarity: number;
}

const STOP_WORDS = new Set([
  "a", "about", "am", "an", "and", "are", "as", "at", "be", "been", "being",
  "can", "could", "did", "do", "does", "for", "from", "had", "has", "have",
  "he", "her", "hers", "him", "his", "how", "i", "if", "in", "into", "is",
  "it", "its", "me", "might", "my", "of", "on", "or", "our", "ours", "please",
  "she", "should", "that", "the", "their", "them", "they", "this", "to", "us",
  "want", "was", "we", "were", "what", "when", "where", "which", "who", "why",
  "will", "with", "would", "you", "your", "yours",
]);

const ALIASES: Record<string, string> = {
  accepted: "accept", accepting: "accept", accepts: "accept",
  boyfriend: "relationship", girlfriend: "relationship", husband: "relationship",
  marriage: "relationship", married: "relationship", partner: "relationship",
  spouse: "relationship", wife: "relationship",
  career: "work", employed: "work", employment: "work", job: "work", workplace: "work",
  resign: "leave", resigned: "leave", resigning: "leave", quit: "leave", quitting: "leave",
  leaving: "leave", left: "leave",
  begin: "start", beginning: "start", begun: "start", started: "start", starting: "start",
  choose: "decide", choosing: "decide", chose: "decide", chosen: "decide", decision: "decide",
  relocate: "move", relocated: "move", relocating: "move", moving: "move",
  bought: "buy", buying: "buy", purchased: "buy", purchasing: "buy",
  selling: "sell", sold: "sell",
  reconcile: "repair", reconciled: "repair", reconciling: "repair", restore: "repair",
  repaired: "repair", repairing: "repair",
  forgive: "forgive", forgiving: "forgive", forgiven: "forgive",
  waited: "wait", waiting: "wait",
  money: "finance", financial: "finance", finances: "finance", income: "finance",
  debt: "finance", debts: "finance", salary: "finance",
  business: "business", company: "business", venture: "business",
  child: "family", children: "family", daughter: "family", father: "family",
  mother: "family", parent: "family", parents: "family", son: "family",
  sick: "health", sickness: "health", illness: "health", medical: "health",
  travelling: "travel", traveling: "travel", journey: "travel", trip: "travel",
  argument: "conflict", arguing: "conflict", dispute: "conflict", fight: "conflict",
  fighting: "conflict", quarrel: "conflict",
  prayer: "spiritual", spiritually: "spiritual", spirituality: "spiritual",
  issue: "problem", issues: "problem", trouble: "problem", troubles: "problem",
  improve: "improve", improved: "improve", improving: "improve", better: "improve",
  change: "change", changed: "change", changing: "change",
};

const DOMAIN_TERMS: Record<string, string> = {
  work: "work", business: "work", finance: "money", relationship: "relationship",
  family: "family", health: "health", travel: "travel", move: "travel",
  conflict: "conflict", spiritual: "spiritual",
};

const ACTION_TERMS = new Set([
  "accept", "buy", "change", "decide", "forgive", "improve", "leave", "move",
  "repair", "sell", "start", "stay", "trust", "wait",
]);

const NEGATIONS = new Set(["not", "never", "no", "without", "avoid"]);

function hashPart(value: string): string {
  // FNV-1a: compact and deterministic. This is obfuscation for data minimising,
  // not a cryptographic promise; no raw question text is retained.
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(36);
}

function sortedUnique(values: string[]): string[] {
  return [...new Set(values)].sort();
}

function sameSet(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function normaliseQuestion(question: string): string[] {
  const expanded = question
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bcan't\b/g, "can not")
    .replace(/n't\b/g, " not");

  return expanded.match(/[a-z0-9]+/g) ?? [];
}

export function fingerprintIntent(area: string, question: string): IntentFingerprint {
  const raw = normaliseQuestion(question);
  const hasNegation = raw.some((token) => NEGATIONS.has(token));
  const numbers = sortedUnique(raw.filter((token) => /^\d+$/.test(token)).map(hashPart));
  const canonical = raw
    .filter((token) => !STOP_WORDS.has(token) && !NEGATIONS.has(token) && !/^\d+$/.test(token))
    .map((token) => ALIASES[token] ?? token);

  const domains = sortedUnique(
    [area.toLowerCase(), ...canonical.map((token) => DOMAIN_TERMS[token]).filter(Boolean)]
      .map(hashPart),
  );
  const actions = sortedUnique(canonical.filter((token) => ACTION_TERMS.has(token)).map(hashPart));
  const terms = sortedUnique(canonical.map(hashPart));

  return {
    area: area.toUpperCase(),
    terms,
    domains,
    actions,
    numbers,
    hasNegation,
  };
}

export function intentSimilarity(a: IntentFingerprint, b: IntentFingerprint): number {
  if (
    a.area !== b.area ||
    a.hasNegation !== b.hasNegation ||
    !sameSet(a.numbers, b.numbers) ||
    !sameSet(a.domains, b.domains) ||
    !sameSet(a.actions, b.actions)
  ) {
    return 0;
  }

  if (sameSet(a.terms, b.terms)) return 1;
  if (a.terms.length === 0 || b.terms.length === 0) return 0;

  const bTerms = new Set(b.terms);
  const intersection = a.terms.filter((term) => bTerms.has(term)).length;
  const union = new Set([...a.terms, ...b.terms]).size;
  const jaccard = intersection / union;
  const containment = intersection / Math.min(a.terms.length, b.terms.length);

  // Very short questions need exact agreement; longer paraphrases need at
  // least two shared concepts after synonyms and filler words are collapsed.
  if (Math.min(a.terms.length, b.terms.length) < 2 || intersection < 2) return 0;
  return Math.max(jaccard, containment * 0.9);
}

export function materiallySameIntent(a: IntentFingerprint, b: IntentFingerprint): boolean {
  return intentSimilarity(a, b) >= 0.6;
}

function newSeed(now: number): string {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const values = new Uint32Array(4);
    crypto.getRandomValues(values);
    return `${now}-${Array.from(values, (value) => value.toString(36)).join("-")}`;
  }
  return `${now}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
}

function browserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function readEntries(storage: StorageLike, now: number): StoredConsultation[] {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const payload = JSON.parse(raw) as StoredPayload;
    if (payload.version !== STORAGE_VERSION || !Array.isArray(payload.entries)) return [];
    return payload.entries.filter(
      (entry) =>
        typeof entry?.seed === "string" &&
        typeof entry?.expiresAt === "number" &&
        entry.expiresAt > now &&
        typeof entry.area === "string" &&
        typeof entry.hasNegation === "boolean" &&
        Array.isArray(entry.terms) &&
        Array.isArray(entry.domains) &&
        Array.isArray(entry.actions) &&
        Array.isArray(entry.numbers),
    );
  } catch {
    return [];
  }
}

function writeEntries(storage: StorageLike, entries: StoredConsultation[]): void {
  try {
    const payload: StoredPayload = { version: STORAGE_VERSION, entries };
    storage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Storage may be disabled or full. Casting should still work; it simply
    // cannot promise continuity across a reload in that browser.
  }
}

export function resolveConsultationSeed({
  area,
  question,
  now = Date.now(),
  ttlMs = ACTIVE_CONSULTATION_TTL_MS,
  storage = browserStorage(),
}: {
  area: string;
  question: string;
  now?: number;
  ttlMs?: number;
  storage?: StorageLike | null;
}): ContinuityDecision {
  const fingerprint = fingerprintIntent(area, question);
  if (!storage) {
    return { seed: newSeed(now), reused: false, expiresAt: now + ttlMs, similarity: 0 };
  }

  const entries = readEntries(storage, now);
  let best: StoredConsultation | null = null;
  let bestSimilarity = 0;
  for (const entry of entries) {
    const similarity = intentSimilarity(fingerprint, entry);
    if (similarity > bestSimilarity) {
      best = entry;
      bestSimilarity = similarity;
    }
  }

  if (best && bestSimilarity >= 0.6) {
    writeEntries(storage, entries);
    return {
      seed: best.seed,
      reused: true,
      expiresAt: best.expiresAt,
      similarity: bestSimilarity,
    };
  }

  const created: StoredConsultation = {
    ...fingerprint,
    seed: newSeed(now),
    createdAt: now,
    expiresAt: now + ttlMs,
  };
  writeEntries(
    storage,
    [created, ...entries]
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, MAX_ACTIVE_CONSULTATIONS),
  );
  return { seed: created.seed, reused: false, expiresAt: created.expiresAt, similarity: 0 };
}

