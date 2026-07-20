// ===========================================================================
// AI assistant — retrieval plan.
// ---------------------------------------------------------------------------
// HARD RULES (enforced here, not just prompted):
//   1. The assistant NEVER invents Odù. It can only reference Odù that exist
//      in the database.
//   2. It answers ONLY from APPROVED interpretations / GRANTED-permission
//      verses. Nothing else is retrievable.
//   3. Every answer must cite the Odù, the source, and the interpretation used.
//   4. When content is missing, it must say so — never fabricate.
//   5. It must never claim to replace a Babalawo.
//
// This module defines the retrieval contract. The actual model call is made by
// the API route only when AI_ASSISTANT_ENABLED=true and a provider is set.
// ===========================================================================

import { prisma } from "@/lib/db";
import { ReviewStatus } from "@prisma/client";
import { buildPublicVerseWhere } from "@/lib/content/versePublication";
import { oduFactBySlug } from "@/lib/odu/facts";
import { resolveLocalDisplay } from "@/lib/interpretation/localDisplay";
import { versesForOdu } from "@/lib/content/verses";
import { iweVerseForOdu } from "@/lib/content/iweVerses";

export interface RetrievedContext {
  odu: {
    id: string;
    slug: string;
    name: string;
    signature: string;
    factualSummary: string | null;
  } | null;
  interpretations: {
    id: string;
    title: string | null;
    contentMd: string;
    sourceTitle: string | null;
    licence: string | null;
  }[];
  verses: {
    id: string;
    textEnglish: string | null;
    sourceTitle: string | null;
  }[];
  /** True when there is no approved content to answer from. */
  isEmpty: boolean;
}

/** Checked-in, reviewed context used when Postgres is absent or unavailable. */
export function retrieveStaticForOdu(oduSlug: string): RetrievedContext {
  const fact = oduFactBySlug(oduSlug);
  if (!fact) return { odu: null, interpretations: [], verses: [], isEmpty: true };

  const display = resolveLocalDisplay(oduSlug);
  const interpretations = display.isPlaceholder
    ? []
    : [{
        id: `static-interpretation:${oduSlug}`,
        title: display.title,
        contentMd: display.contentMd,
        sourceTitle: display.sourceTitle,
        licence: display.licence,
      }];
  const recordedVerses = versesForOdu(oduSlug).map((verse) => ({
    id: verse.id,
    textEnglish: verse.english.join("\n"),
    sourceTitle: verse.source.title,
  }));
  const iweVerse = iweVerseForOdu(oduSlug, "study-assistant");
  if (iweVerse) {
    recordedVerses.push({
      id: iweVerse.id,
      textEnglish: iweVerse.text,
      sourceTitle: iweVerse.source.title,
    });
  }

  return {
    odu: {
      id: `static-odu:${oduSlug}`,
      slug: fact.slug,
      name: fact.name,
      signature: fact.signature,
      factualSummary: fact.factualSummary,
    },
    interpretations,
    verses: recordedVerses,
    isEmpty: interpretations.length === 0 && recordedVerses.length === 0,
  };
}

/**
 * Retrieve ONLY approved, permission-clean content for a given Odù.
 * This is the single gate the assistant is allowed to read through.
 */
export async function retrieveForOdu(oduSlug: string): Promise<RetrievedContext> {
  const staticContext = retrieveStaticForOdu(oduSlug);
  if (!process.env.DATABASE_URL) return staticContext;

  const queryDatabase = () => prisma.odu.findUnique({
    where: { slug: oduSlug },
    include: {
      interpretations: {
        where: { reviewStatus: ReviewStatus.APPROVED, flagged: false },
        include: { source: true },
      },
      verses: {
        where: buildPublicVerseWhere(),
        include: { source: true },
      },
    },
  });
  let odu: Awaited<ReturnType<typeof queryDatabase>>;
  try {
    odu = await queryDatabase();
  } catch {
    return staticContext;
  }

  if (!odu) {
    return staticContext;
  }

  const interpretations = odu.interpretations.map((i) => ({
    id: i.id,
    title: i.title,
    contentMd: i.contentMd,
    sourceTitle: i.source?.title ?? null,
    licence: i.source?.licenceType ?? null,
  }));

  const verses = odu.verses.map((v) => ({
    id: v.id,
    textEnglish: v.textEnglish,
    sourceTitle: v.source?.title ?? null,
  }));

  const combinedInterpretations = [...interpretations, ...staticContext.interpretations];
  const knownVerseIds = new Set(verses.map((verse) => verse.id));
  const combinedVerses = [
    ...verses,
    ...staticContext.verses.filter((verse) => !knownVerseIds.has(verse.id)),
  ];

  return {
    odu: {
      id: odu.id,
      slug: odu.slug,
      name: odu.name,
      signature: odu.signature,
      factualSummary: odu.factualSummary,
    },
    interpretations: combinedInterpretations,
    verses: combinedVerses,
    isEmpty: combinedInterpretations.length === 0 && combinedVerses.length === 0,
  };
}

/** The system prompt that encodes the assistant's hard rules. */
export const AI_SYSTEM_PROMPT = `You are the Online Ifá study assistant.

You help people learn about Ifá and the Odù. You operate under strict rules:

- You may ONLY use the provided CONTEXT. Never use outside knowledge to state
  facts about specific Odù, verses, or interpretations.
- You must NEVER invent Odù, verses, or interpretations.
- Always CITE the Odù name, the source, and the interpretation you used.
- If the CONTEXT does not contain an answer, say clearly that the content has
  not yet been added or reviewed. Do not guess.
- You can explain, compare, summarise, translate, and ask reflection questions.
- You must make clear, when relevant, that you do not replace a trained
  Babalawo and that this is an educational tool.

If asked to perform divination or claim spiritual authority, decline politely
and explain that real divination is performed by a qualified Babalawo.`;

export function isAssistantEnabled(): boolean {
  return process.env.AI_ASSISTANT_ENABLED === "true";
}
