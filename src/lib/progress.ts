"use client";

// Lightweight cross-page progress tracking for the badge row on /learn#practice —
// localStorage-backed so it survives navigation and reloads (unlike an
// in-memory React context, which resets on every page change in a real
// multi-route site).

const KEY = "onlineifa:progress:v1";

export type ProgressFlag = "cast" | "odu" | "graph";

interface Progress {
  flags: Record<ProgressFlag, boolean>;
  bestStreak: number;
}

const EMPTY: Progress = { flags: { cast: false, odu: false, graph: false }, bestStreak: 0 };

function read(): Progress {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw), flags: { ...EMPTY.flags, ...JSON.parse(raw).flags } };
  } catch {
    // ignore malformed/unavailable storage
  }
  return EMPTY;
}

function write(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // ignore unavailable storage (private browsing, etc.)
  }
}

export function readProgress(): Progress {
  return read();
}

export function markProgressFlag(flag: ProgressFlag) {
  const p = read();
  if (!p.flags[flag]) write({ ...p, flags: { ...p.flags, [flag]: true } });
}

export function reportBestStreak(best: number) {
  const p = read();
  if (best > p.bestStreak) write({ ...p, bestStreak: best });
}
