// ===========================================================================
// Guest-mode interpretation display — zero DB dependency.
// ---------------------------------------------------------------------------
// Mirrors src/lib/interpretation/gate.ts's resolveDisplay(), but sources the
// meaning layer from static modules instead of a Prisma query, so
// consultations can be cast and read entirely client-side (no account, no
// database).
//
// Resolution for a cast Odù:
//   1. One of the 16 méjì → its reviewed ORIGINAL_INTERPRETATIONS summary.
//   2. A combined Odù → an original STRUCTURAL reading composed from its two
//      legs' reviewed summaries. This is honest derivation, not invention:
//      the right leg is senior and read first (a verified structural fact —
//      docs/CORE_KNOWLEDGE.md §3), and the composition says plainly that a
//      fuller reviewed interpretation is still to come.
//   3. Unknown slug → the safe placeholder.
// Contributor/DB interpretations still take precedence when available — the
// consultation flow asks the server first and only falls back to this.
// ===========================================================================

import { ORIGINAL_INTERPRETATIONS } from "@/lib/odu/interpretations";
import { PLACEHOLDER_INTERPRETATION } from "@/lib/interpretation/placeholder";
import { oduFactBySlug } from "@/lib/odu/facts";
import { COMBINED_ODU_NOTES, RIGHT_LEG_CHILD_NOTE } from "@/lib/odu/combinedNotes";

export interface LocalDisplay {
  isPlaceholder: boolean;
  contentMd: string;
  title: string | null;
  sourceTitle: string | null;
  licence: string | null;
  reflectionQuestions: string[];
}

const PLACEHOLDER: LocalDisplay = {
  isPlaceholder: true,
  contentMd: PLACEHOLDER_INTERPRETATION,
  title: null,
  sourceTitle: null,
  licence: null,
  reflectionQuestions: [],
};

/** "Èjì Ogbè — light, beginnings, and clear potential" → the theme phrase. */
function essenceOf(title: string): string {
  const parts = title.split("—");
  return (parts[1] ?? parts[0]).trim();
}

function mejiDisplay(found: (typeof ORIGINAL_INTERPRETATIONS)[number]): LocalDisplay {
  return {
    isPlaceholder: false,
    contentMd: found.contentMd,
    title: found.title,
    sourceTitle: "Online Ifá — original editorial content",
    licence: "ORIGINAL_APP_LICENCE",
    reflectionQuestions: found.reflectionQuestions,
  };
}

/** Original structural reading for a combined Odù, derived from its two legs. */
function composedDisplay(slug: string): LocalDisplay {
  const fact = oduFactBySlug(slug);
  if (!fact || fact.isPrimary) return PLACEHOLDER;
  const right = ORIGINAL_INTERPRETATIONS.find((i) => i.oduSlug === fact.rightSlug);
  const left = ORIGINAL_INTERPRETATIONS.find((i) => i.oduSlug === fact.leftSlug);
  const rightFact = oduFactBySlug(fact.rightSlug);
  const leftFact = oduFactBySlug(fact.leftSlug);
  if (!right || !left || !rightFact || !leftFact) return PLACEHOLDER;

  const themes = Array.from(new Set([...right.themes, ...left.themes]));
  const note = COMBINED_ODU_NOTES[slug];
  const contentMd =
    `## ${fact.name}\n\n` +
    `**${fact.name}** is a combined Odù. **${rightFact.name}** stands on the right leg ` +
    `and **${leftFact.name}** on the left. The right leg is read first and carries ` +
    `seniority; the left leg colours and qualifies it. ${RIGHT_LEG_CHILD_NOTE}\n\n` +
    (note ? `**What tradition records of this Odù:** ${note}\n\n` : "") +
    `**From the right leg — ${rightFact.name}:** ${essenceOf(right.title)}.\n\n` +
    `**From the left leg — ${leftFact.name}:** ${essenceOf(left.title)}.\n\n` +
    `Read structurally, this pairing sets ${essenceOf(right.title)} in the foreground, ` +
    `approached through ${essenceOf(left.title)}. Themes to sit with: ` +
    themes.map((t) => `**${t}**`).join(", ") +
    ".\n\n" +
    "*This is an original structural reading composed from this Odù's two legs. A fuller " +
    "reviewed interpretation for this specific Odù has not yet been published — you can " +
    "help write one on the contribute page. This is educational content, not a substitute " +
    "for divination by a trained Babalawo.*";

  return {
    isPlaceholder: false,
    contentMd,
    title: `${fact.name} — a structural reading`,
    sourceTitle: "Online Ifá — original structural composition from the two legs",
    licence: "ORIGINAL_APP_LICENCE",
    reflectionQuestions: [
      right.reflectionQuestions[0],
      left.reflectionQuestions[0],
      "Which of the two legs speaks more directly to your situation right now?",
    ].filter(Boolean),
  };
}

export function resolveLocalDisplay(oduSlug: string | null): LocalDisplay {
  if (!oduSlug) return PLACEHOLDER;
  const found = ORIGINAL_INTERPRETATIONS.find((i) => i.oduSlug === oduSlug);
  if (found) return mejiDisplay(found);
  return composedDisplay(oduSlug);
}
