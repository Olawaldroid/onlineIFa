// ===========================================================================
// IFA LAB corpus view — built on the canonical fact modules in src/lib/odu.
// Adds the short, original educational summaries + theme lines the lab page
// displays for the 16 principal Odù (same editorial rules as
// src/lib/odu/interpretations.ts: original text, themes only, no authority).
// ===========================================================================

import { generateAllOdu, CombinedOduFact } from "@/lib/odu/combine";
import { PRIMARY_ODU } from "@/lib/odu/primary";

export interface LabPrimaryContent {
  themes: string;
  orisa: string;
  summary: string;
}

/** Original educational display copy for the 16 méjì, keyed by slug. */
export const LAB_PRIMARY_CONTENT: Record<string, LabPrimaryContent> = {
  "ogbe-meji": {
    themes: "light · beginnings · clarity · leadership",
    orisa: "",
    summary:
      "The most senior of the sixteen principal Odù — four single marks on each leg, the most open pattern in the corpus. Widely taught through themes of light, new beginnings, clarity of purpose, and the responsibility that comes with good fortune.",
  },
  "oyeku-meji": {
    themes: "endings · cycles · transformation · renewal",
    orisa: "",
    summary:
      "The structural inverse of Èjì Ogbè — four double marks on each leg. Taught through endings and the close of a cycle: darkness understood as rest, stillness, and the ground from which new things grow.",
  },
  "iwori-meji": {
    themes: "deep insight · inner fire · hidden truth",
    orisa: "",
    summary:
      "The deep seer. Associated with looking beneath the surface of a situation, honest self-knowledge, and passion guided by insight.",
  },
  "odi-meji": {
    themes: "foundation · protection · boundaries",
    orisa: "",
    summary:
      "The seal. Taught through foundation, containment and protection — the home, family bonds, and the stability that makes growth possible.",
  },
  "irosun-meji": {
    themes: "ancestry · lineage · memory",
    orisa: "",
    summary:
      "Grounded in what came before — memory, ancestry, and the lessons of lineage as stable ground for the present.",
  },
  "owonrin-meji": {
    themes: "change · disruption · adaptation",
    orisa: "",
    summary:
      "The reversed head. Taught through disruption and change — chaos resolving into clarity, and the skill of adaptation.",
  },
  "obara-meji": {
    themes: "strength · speech · abundance · integrity",
    orisa: "",
    summary:
      "Associated with strength, the power of speech and communication, abundance, and integrity in how both are used.",
  },
  "okanran-meji": {
    themes: "courage · focus · consequence",
    orisa: "",
    summary:
      "Taught through courage and decisive, directed change — and the consequences that follow every decisive act.",
  },
  "ogunda-meji": {
    themes: "clearing the path · action · justice",
    orisa: "Ògún",
    summary:
      "Iron and the cleared road. Associated with Ògún: decisive action, honest labour, and justice that opens the way forward.",
  },
  "osa-meji": {
    themes: "sudden change · resilience · revealed truth",
    orisa: "Ṣàngó · Ọya",
    summary:
      "Storms and lightning — sudden change, resilience under pressure, and truths that weather reveals. Commonly associated with Ṣàngó and Ọya.",
  },
  "ika-meji": {
    themes: "discernment · ethical power · caution",
    orisa: "",
    summary:
      "The controller. Taught through discernment and the ethical use of power and speech — caution as a form of wisdom.",
  },
  "oturupon-meji": {
    themes: "endurance · humility · perseverance",
    orisa: "",
    summary:
      "The bearer. Associated with endurance, carrying burdens with humility, and perseverance through long seasons.",
  },
  "otura-meji": {
    themes: "peace · reconciliation · vision",
    orisa: "",
    summary:
      "The comforter. Taught through peace, harmony, reconciliation, and far-seeing wisdom.",
  },
  "irete-meji": {
    themes: "vitality · long life · hope",
    orisa: "",
    summary: "Vitality and long life — prosperity, hope, and gratitude as active practices.",
  },
  "ose-meji": {
    themes: "fertility · increase · sweetness",
    orisa: "Ọ̀ṣun",
    summary:
      "Fertility, increase and sweetness — nurture and generous exchange. Commonly associated with Ọ̀ṣun of the rivers.",
  },
  "ofun-meji": {
    themes: "ancient wisdom · blessing · completion",
    orisa: "",
    summary:
      "Also called Ọ̀ràngún Méjì. Ancient wisdom, blessing, completion and generosity — the elder’s white light.",
  },
};

export type LabOdu = CombinedOduFact;

/** The full ordered corpus (16 méjì then 240 àmúlù), generated once. */
export const ALL_ODU: LabOdu[] = generateAllOdu();

/** Lookup by "rightLeg|leftLeg" signature, e.g. "1111|2222". */
export const ODU_BY_SIG: Record<string, LabOdu> = Object.fromEntries(
  ALL_ODU.map((o) => [o.signature, o]),
);

export const ODU_BY_SLUG: Record<string, LabOdu> = Object.fromEntries(
  ALL_ODU.map((o) => [o.slug, o]),
);

export { PRIMARY_ODU };

/** Single mark ǀ for "1", double mark ǁ for "2". */
export const markGlyph = (c: string) => (c === "1" ? "ǀ" : "ǁ");

export const rightLegOf = (o: LabOdu) => o.signature.slice(0, 4);
export const leftLegOf = (o: LabOdu) => o.signature.slice(5);

/** 4-line glyph block: left column then right column, matching tray layout. */
export function glyphOf(o: LabOdu): string {
  const R = rightLegOf(o);
  const L = leftLegOf(o);
  return [0, 1, 2, 3].map((i) => `${markGlyph(L[i])}  ${markGlyph(R[i])}`).join("\n");
}

/** Signature in 1/0 binary notation, space-separated legs: "1111 0000". */
export function binOf(sig: string): string {
  return sig.replace(/2/g, "0").replace("|", " ");
}

/** 4-bit number → vertical leg glyph, 1 = ǀ, 0 = ǁ. */
export function legGlyphOfNumber(n: number): string {
  return n
    .toString(2)
    .padStart(4, "0")
    .split("")
    .map((b) => (b === "1" ? "ǀ" : "ǁ"))
    .join("\n");
}

export function summaryOf(o: LabOdu): string {
  if (o.isPrimary) return LAB_PRIMARY_CONTENT[o.slug].summary;
  const right = ODU_BY_SLUG[o.rightSlug];
  const left = ODU_BY_SLUG[o.leftSlug];
  return `A combined Odù (àmúlù): the right leg is ${right.name}, the left leg ${left.name}. Its meaning has not yet been reviewed by a contributor — the structure shown is factual; interpretation awaits reviewed, clearly-sourced content.`;
}

export function themesOf(o: LabOdu): string {
  return o.isPrimary ? LAB_PRIMARY_CONTENT[o.slug].themes : "awaiting reviewed interpretation";
}

export function relatedTextOf(o: LabOdu): string {
  if (o.isPrimary) {
    const kids = ALL_ODU.filter((x) => !x.isPrimary && x.rightSlug === o.slug)
      .slice(0, 4)
      .map((x) => x.name);
    return "Related — combined figures on this right leg: " + kids.join(", ") + "…";
  }
  return `Related — parents: ${ODU_BY_SLUG[o.rightSlug].name} (right leg) and ${ODU_BY_SLUG[o.leftSlug].name} (left leg).`;
}
