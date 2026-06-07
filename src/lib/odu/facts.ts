// ===========================================================================
// Read-only fact access for the UI.
// ---------------------------------------------------------------------------
// Browsing the corpus (the 256 Odù, their signatures, legs, combinations) is
// pure FACT and needs no database — it is generated deterministically. This
// lets every learning/library page render on a fresh clone before Postgres is
// provisioned. The DB layer adds the MEANING content (interpretations/verses).
// ===========================================================================

import { generateAllOdu, CombinedOduFact } from "./combine";
import { PRIMARY_ODU } from "./primary";

let cache: CombinedOduFact[] | null = null;

export function allOduFacts(): CombinedOduFact[] {
  if (!cache) cache = generateAllOdu();
  return cache;
}

export function primaryOduFacts(): CombinedOduFact[] {
  return allOduFacts().filter((o) => o.isPrimary);
}

export function combinedOduFacts(): CombinedOduFact[] {
  return allOduFacts().filter((o) => !o.isPrimary);
}

export function oduFactBySlug(slug: string): CombinedOduFact | undefined {
  return allOduFacts().find((o) => o.slug === slug);
}

/** Human-readable legs for a combined Odù. */
export function legNames(o: CombinedOduFact): { right: string; left: string } {
  const bySlug = (s: string) => PRIMARY_ODU.find((p) => p.slug === s)?.name ?? s;
  return { right: bySlug(o.rightSlug), left: bySlug(o.leftSlug) };
}

/**
 * Lightweight fact search across name, alt-names, slug and signature pattern.
 * Returns matching facts; the DB search route extends this with verses,
 * proverbs, contributors and sources.
 */
export function searchFacts(query: string): CombinedOduFact[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  // Signature pattern search: a query of only 1/2/| chars matches signatures.
  const isSignature = /^[12|]+$/.test(q);
  return allOduFacts().filter((o) => {
    if (isSignature) return o.signature.replace("|", "").includes(q.replace("|", ""));
    return (
      o.name.toLowerCase().includes(q) ||
      o.slug.includes(q) ||
      o.altNames.some((a) => a.toLowerCase().includes(q))
    );
  });
}
