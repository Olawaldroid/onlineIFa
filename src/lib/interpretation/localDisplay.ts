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
