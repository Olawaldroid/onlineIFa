import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  retrieveForOdu,
  isAssistantEnabled,
  AI_SYSTEM_PROMPT,
  RetrievedContext,
} from "@/lib/ai/retrieval";
import { callAnthropic } from "@/lib/ai/anthropic";

/** Build the user message from APPROVED context only — never outside knowledge. */
function buildContextMessage(ctx: RetrievedContext, question?: string): string {
  const lines: string[] = [];
  lines.push(`Odù: ${ctx.odu?.name} (signature ${ctx.odu?.signature}).`);
  if (ctx.odu?.factualSummary) lines.push(`Factual summary: ${ctx.odu.factualSummary}`);
  ctx.interpretations.forEach((i, n) => {
    lines.push(
      `\nApproved interpretation #${n + 1}` +
        (i.title ? ` "${i.title}"` : "") +
        (i.sourceTitle ? ` [source: ${i.sourceTitle}; licence: ${i.licence}]` : "") +
        `:\n${i.contentMd}`,
    );
  });
  ctx.verses.forEach((v, n) => {
    if (v.textEnglish) lines.push(`\nVerse #${n + 1} [source: ${v.sourceTitle}]:\n${v.textEnglish}`);
  });
  lines.push(
    `\nUser question: ${question || "Explain this Odù using only the context above."}`,
  );
  lines.push(
    `\nAnswer using ONLY the context above. Cite the Odù and sources. If the context does not answer the question, say so.`,
  );
  return lines.join("\n");
}

const Body = z.object({
  oduSlug: z.string(),
  question: z.string().max(1000).optional(),
});

// POST /api/assistant — retrieval-augmented assistant.
// It NEVER invents Odù and answers ONLY from approved DB content, always
// citing what it used. If nothing approved exists, it says so.
export async function POST(req: NextRequest) {
  try {
    const body = Body.parse(await req.json());
    const context = await retrieveForOdu(body.oduSlug);

    if (!context.odu) {
      return NextResponse.json({
        answer: "I could not find that Odù in the database, so I cannot answer.",
        citations: [],
        contentMissing: true,
      });
    }

    if (context.isEmpty) {
      return NextResponse.json({
        answer:
          `There is no approved interpretation or permission-cleared verse for ${context.odu.name} yet, ` +
          `so I cannot offer meaning for it. The factual signature is ${context.odu.signature}. ` +
          `A contributor can add original content for review.`,
        citations: [{ odu: context.odu.name, signature: context.odu.signature }],
        contentMissing: true,
      });
    }

    // When no model provider is configured, return a deterministic, fully-cited
    // summary built directly from approved content (no fabrication).
    if (!isAssistantEnabled()) {
      const cites = [
        ...context.interpretations.map((i) => ({ type: "interpretation", title: i.title, source: i.sourceTitle, licence: i.licence })),
        ...context.verses.map((v) => ({ type: "verse", source: v.sourceTitle })),
      ];
      return NextResponse.json({
        answer:
          `Here is the approved content for ${context.odu.name} ` +
          `(signature ${context.odu.signature}). The AI model is not enabled, so this is a ` +
          `direct, unembellished summary of reviewed material. Online Ifá does not replace a trained Babalawo.`,
        context,
        citations: cites,
        contentMissing: false,
      });
    }

    // Provider enabled: call the model with AI_SYSTEM_PROMPT + retrieved
    // context ONLY. No outside knowledge is ever passed in.
    try {
      const userContent = buildContextMessage(context, body.question);
      const { text, model } = await callAnthropic(AI_SYSTEM_PROMPT, userContent);
      return NextResponse.json({
        answer: text,
        model,
        citations: [
          { odu: context.odu.name, signature: context.odu.signature },
          ...context.interpretations.map((i) => ({ source: i.sourceTitle, licence: i.licence })),
        ],
        contentMissing: false,
      });
    } catch (modelErr) {
      // Fail safe: never fabricate. Return the approved content directly.
      return NextResponse.json({
        answer:
          `The AI model is enabled but the request failed (${modelErr}). ` +
          `Here is the approved content for ${context.odu.name} without model commentary.`,
        context,
        citations: [{ odu: context.odu.name }],
        contentMissing: false,
      });
    }
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
