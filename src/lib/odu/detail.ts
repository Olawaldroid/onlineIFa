// ===========================================================================
// Compose an Odù detail view: FACTS (always available) + MEANING (from DB).
// ---------------------------------------------------------------------------
// If the database is unreachable (e.g. fresh clone before `prisma migrate`),
// facts still render and the meaning layer degrades to the safe placeholder.
// ===========================================================================

import { oduFactBySlug, legNames } from "./facts";
import { CombinedOduFact } from "./combine";
import { PLACEHOLDER_INTERPRETATION, resolveDisplay } from "@/lib/interpretation/gate";
import { buildPublicVerseWhere } from "@/lib/content/versePublication";
import { versesForOdu } from "@/lib/content/verses";

export interface OduDetailView {
  fact: CombinedOduFact;
  legs: { right: string; left: string };
  meaning: {
    isPlaceholder: boolean;
    title: string | null;
    contentMd: string;
    sourceTitle: string | null;
    licence: string | null;
    citation: string | null;
    contentCategory: string;
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
    citation: null,
    contentCategory: "UNAVAILABLE",
  };
  let themes: string[] = [];
  let proverbs: { yoruba: string; english: string | null }[] = [];
  let verseCount = versesForOdu(slug).length;
  let reflectionQuestions: string[] = [];

  if (process.env.DATABASE_URL) {
    try {
      const { prisma } = await import("@/lib/db");
      const odu = await prisma.odu.findUnique({
        where: { slug },
        include: {
          interpretations: { include: { source: true, reflectionQuestions: true } },
          themes: { include: { theme: true } },
          proverbs: true,
          _count: { select: { verses: { where: buildPublicVerseWhere() } } },
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
          citation: display.sourceTitle,
          contentCategory: display.isPlaceholder ? "UNAVAILABLE" : "APPROVED_DATABASE_CONTENT",
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
  }

  // No approved DB content? Check the contribution store, so reviewed
  // contributions publish even with no database (same gate: only APPROVED,
  // unflagged submissions are ever returned by approvedForOdu).
  if (meaning.isPlaceholder) {
    try {
      const { approvedForOdu } = await import("@/lib/contributions/store");
      const approved = (await approvedForOdu(slug))[0];
      if (approved) {
        meaning = {
          isPlaceholder: false,
          title: approved.title ?? null,
          contentMd: approved.contentMd,
          sourceTitle: approved.tradition
            ? `Contributor submission (${approved.tradition})`
            : "Contributor submission (reviewed)",
          licence: approved.sourceType,
          citation: approved.citation ?? null,
          contentCategory: approved.contentCategory ?? "CONTRIBUTOR_ORIGINAL",
        };
      }
    } catch {
      // Store unreadable — fall through.
    }
  }

  // Every structurally valid Odù has an original educational fallback. The
  // 16 principal summaries are hand-authored; combined Odù are composed from
  // those reviewed summaries without copying private reference-book text.
  if (meaning.isPlaceholder) {
    const { resolveLocalDisplay } = await import("@/lib/interpretation/localDisplay");
    const local = resolveLocalDisplay(slug);
    meaning = {
      isPlaceholder: local.isPlaceholder,
      title: local.title,
      contentMd: local.contentMd,
      sourceTitle: local.sourceTitle,
      licence: local.licence,
      citation: null,
      contentCategory: "ORIGINAL_SYNTHESIS",
    };
    reflectionQuestions = local.reflectionQuestions;
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
