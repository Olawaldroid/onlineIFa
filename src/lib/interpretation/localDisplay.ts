// ===========================================================================
// Guest-mode interpretation display — zero DB dependency.
// ---------------------------------------------------------------------------
// Mirrors src/lib/interpretation/gate.ts's resolveDisplay(), but sources the
// meaning layer from the static ORIGINAL_INTERPRETATIONS module instead of a
// Prisma query, so consultations can be cast and read entirely client-side
// (no account, no database) — the same original, reviewed content, just not
// round-tripped through the server. DB-backed contributor interpretations
// (beyond the 16 principal Odù) still only ever show up via the DB-gated path.
// ===========================================================================

import { ORIGINAL_INTERPRETATIONS } from "@/lib/odu/interpretations";
import { oduFactBySlug } from "@/lib/odu/facts";
import { PLACEHOLDER_INTERPRETATION } from "@/lib/interpretation/placeholder";

export interface LocalDisplay {
  isPlaceholder: boolean;
  contentMd: string;
  title: string | null;
  sourceTitle: string | null;
  licence: string | null;
  reflectionQuestions: string[];
}

export function resolveLocalDisplay(oduSlug: string | null): LocalDisplay {
  const found = oduSlug
    ? ORIGINAL_INTERPRETATIONS.find((i) => i.oduSlug === oduSlug)
    : undefined;

  if (!found && oduSlug) {
    const fact = oduFactBySlug(oduSlug);
    if (fact && !fact.isPrimary) {
      const right = ORIGINAL_INTERPRETATIONS.find((item) => item.oduSlug === fact.rightSlug);
      const left = ORIGINAL_INTERPRETATIONS.find((item) => item.oduSlug === fact.leftSlug);
      if (right && left) {
        const themes = [...new Set([...right.themes.slice(0, 2), ...left.themes.slice(0, 2)])];
        return {
          isPlaceholder: false,
          title: `${fact.name} — bringing two teachings into conversation`,
          contentMd:
            `## ${fact.name}\n\n` +
            `${fact.name} is a combined Odù whose right leg is **${right.title.split(" — ")[0]}** ` +
            `and whose left leg is **${left.title.split(" — ")[0]}**. In this original educational ` +
            `synthesis, the right leg frames the leading movement while the left leg adds context, ` +
            `tension, or support.\n\n` +
            `The paired themes are **${themes.join("**, **")}**. Read together, they invite a person ` +
            `to consider both what is trying to move forward and what must be understood, completed, ` +
            `or cared for before that movement can become wise action. Neither leg erases the other; ` +
            `the teaching is in their relationship.\n\n` +
            `For reflection, notice which leg most resembles the visible situation and which one names ` +
            `a quieter influence. A grounded response holds both perspectives, proceeds without haste, ` +
            `and remains open to guidance from knowledgeable people.\n\n` +
            `*This is original educational content composed by Online Ifá from its reviewed principal-Odù ` +
            `summaries. It is not a copied verse, a prediction, or a substitute for consultation with a trained Babalawo.*`,
          sourceTitle: "Online Ifá — original combined-Odù synthesis",
          licence: "ORIGINAL_APP_LICENCE",
          reflectionQuestions: [
            `What does the ${right.title.split(" — ")[0]} side of this pairing highlight in your situation?`,
            `What additional perspective does ${left.title.split(" — ")[0]} ask you to include?`,
            "What balanced next step respects both influences without treating this reading as a prediction?",
          ],
        };
      }
    }
  }

  if (!found) {
    return {
      isPlaceholder: true,
      contentMd: PLACEHOLDER_INTERPRETATION,
      title: null,
      sourceTitle: null,
      licence: null,
      reflectionQuestions: [],
    };
  }

  return {
    isPlaceholder: false,
    contentMd: found.contentMd,
    title: found.title,
    sourceTitle: "Online Ifá — original editorial content",
    licence: "ORIGINAL_APP_LICENCE",
    reflectionQuestions: found.reflectionQuestions,
  };
}
