// ===========================================================================
// Compose an Odù detail view: FACTS (always available) + MEANING (from DB).
// ---------------------------------------------------------------------------
// If the database is unreachable (e.g. fresh clone before `prisma migrate`),
// facts still render and the meaning layer degrades to the safe placeholder.
// ===========================================================================

import { oduFactBySlug, legNames } from "./facts";
import { CombinedOduFact } from "./combine";
import { PLACEHOLDER_INTERPRETATION, resolveDisplay } from "@/lib/interpretation/gate";

export interface OduDetailView {
  fact: CombinedOduFact;
  legs: { right: string; left: string };
  meaning: {
    isPlaceholder: boolean;
    title: string | null;
    contentMd: string;
    sourceTitle: string | null;
    licence: string | null;
  };
  themes: string[];
  proverbs: { yoruba: string; english: string | null }[];
  verseCount: number;
  reflectionQuestions: string[];
}

export async function getOduDetail(slug: string): Promise<OduDetailView | null> {
  const fact = oduFactBySlug(slug);
  if (!fact) return null;

  // Default (DB-free) meaning layer: safe placeholder.
  let meaning: OduDetailView["meaning"] = {
    isPlaceholder: true,
    title: null,
    contentMd: PLACEHOLDER_INTERPRETATION,
    sourceTitle: null,
    licence: null,
  };
  let themes: string[] = [];
  let proverbs: { yoruba: string; english: string | null }[] = [];
  let verseCount = 0;
  let reflectionQuestions: string[] = [];

  try {
    const { prisma } = await import("@/lib/db");
    const odu = await prisma.odu.findUnique({
      where: { slug },
      include: {
        interpretations: { include: { source: true, reflectionQuestions: true } },
        themes: { include: { theme: true } },
        proverbs: true,
        _count: { select: { verses: true } },
      },
    });

    if (odu) {
      const display = resolveDisplay(odu.interpretations);
      meaning = {
        isPlaceholder: display.isPlaceholder,
        title: display.title,
        contentMd: display.contentMd,
        sourceTitle: display.sourceTitle,
        licence: display.licence,
      };
      themes = odu.themes.map((t) => t.theme.label);
      proverbs = odu.proverbs.map((p) => ({ yoruba: p.yoruba, english: p.english }));
      verseCount = odu._count.verses;
      const visible = odu.interpretations.find((i) => !display.isPlaceholder && i.contentMd === display.contentMd);
      reflectionQuestions = visible?.reflectionQuestions.map((r) => r.prompt) ?? [];
    }
  } catch {
    // DB not available — facts-only mode. Placeholder meaning already set.
  }

  return {
    fact,
    legs: legNames(fact),
    meaning,
    themes,
    proverbs,
    verseCount,
    reflectionQuestions,
  };
}
