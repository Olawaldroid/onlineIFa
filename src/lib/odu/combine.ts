// ===========================================================================
// Combination engine for the 256 Odù.
// ---------------------------------------------------------------------------
// A complete corpus of Ifá is 256 Odù: 16 principal (méjì) + 240 combined.
// A combined Odù is formed from two legs, each one of the 16 principal Odù:
//   right leg = one Odù, left leg = another.
//
// Convention used here: the RIGHT leg is named first. When right === left the
// result is a principal (méjì) Odù. All output is FACT (structure only).
// ===========================================================================

import { PRIMARY_ODU, PrimaryOduFact } from "./primary";

export interface CombinedOduFact {
  slug: string;
  name: string;
  altNames: string[];
  rank: number;
  signature: string; // "rightLeg|leftLeg"
  rightSlug: string;
  leftSlug: string;
  isPrimary: boolean;
  factualSummary: string;
}

// A handful of combined Odù have widely-used contracted names. Where we don't
// have a verified contracted form we fall back to "Right Left" composition,
// which is itself a valid and commonly-used way to refer to a combined Odù.
const CONTRACTED_NAMES: Record<string, string> = {
  "ogbe-oyeku": "Ogbè Yẹkú",
  "ogbe-iwori": "Ogbè Wèyín",
  "ogbe-odi": "Ogbè Dí",
  "oyeku-ogbe": "Ọ̀yẹ̀kú Lógbè",
};

function buildName(right: PrimaryOduFact, left: PrimaryOduFact): string {
  const key = `${right.slug.replace("-meji", "")}-${left.slug.replace("-meji", "")}`;
  if (CONTRACTED_NAMES[key]) return CONTRACTED_NAMES[key];
  // Generic compound form: strip "Méjì" suffix and join the two stems.
  const stem = (n: string) => n.replace(/\s*Méjì$/u, "").trim();
  return `${stem(right.name)} ${stem(left.name)}`;
}

function buildSlug(right: PrimaryOduFact, left: PrimaryOduFact): string {
  const r = right.slug.replace("-meji", "");
  const l = left.slug.replace("-meji", "");
  return r === l ? `${r}-meji` : `${r}-${l}`;
}

/**
 * Generate the full set of 256 Odù as facts.
 * Ranking: principal Odù keep ranks 1..16; combined Odù are ranked 17.. in a
 * stable order (by right rank, then left rank), so the corpus is fully ordered.
 */
export function generateAllOdu(): CombinedOduFact[] {
  const result: CombinedOduFact[] = [];

  // Principal Odù first, preserving their canonical seniority.
  for (const o of PRIMARY_ODU) {
    result.push({
      slug: o.slug,
      name: o.name,
      altNames: o.altNames,
      rank: o.rank,
      signature: `${o.leg}|${o.leg}`,
      rightSlug: o.slug,
      leftSlug: o.slug,
      isPrimary: true,
      factualSummary: o.factualSummary,
    });
  }

  // Combined Odù.
  let rank = 17;
  for (const right of PRIMARY_ODU) {
    for (const left of PRIMARY_ODU) {
      if (right.slug === left.slug) continue; // méjì already added
      result.push({
        slug: buildSlug(right, left),
        name: buildName(right, left),
        altNames: [],
        rank: rank++,
        signature: `${right.leg}|${left.leg}`,
        rightSlug: right.slug,
        leftSlug: left.slug,
        isPrimary: false,
        factualSummary: `Combined Odù: right leg ${right.name}, left leg ${left.name}.`,
      });
    }
  }

  return result;
}

/** Total corpus size — should always be 256. */
export const TOTAL_ODU = 16 + 16 * 15; // 256
