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
import { ReviewStatus, PermissionStatus } from "@prisma/client";

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

/**
 * Retrieve ONLY approved, permission-clean content for a given Odù.
 * This is the single gate the assistant is allowed to read through.
 */
export async function retrieveForOdu(oduSlug: string): Promise<RetrievedContext> {
  const odu = await prisma.odu.findUnique({
    where: { slug: oduSlug },
    include: {
      interpretations: {
        where: { reviewStatus: ReviewStatus.APPROVED, flagged: false },
        include: { source: true },
      },
      verses: {
        where: {
          reviewStatus: ReviewStatus.APPROVED,
          source: { permissionStatus: { in: [PermissionStatus.GRANTED, PermissionStatus.NOT_REQUIRED] } },
        },
        include: { source: true },
      },
    },
  });

  if (!odu) {
    return { odu: null, interpretations: [], verses: [], isEmpty: true };
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

  return {
    odu: {
      id: odu.id,
      slug: odu.slug,
      name: odu.name,
      signature: odu.signature,
      factualSummary: odu.factualSummary,
    },
    interpretations,
    verses,
    isEmpty: interpretations.length === 0 && verses.length === 0,
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
