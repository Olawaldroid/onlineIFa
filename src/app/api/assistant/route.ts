import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  retrieveForOdu,
  isAssistantEnabled,
  AI_SYSTEM_PROMPT,
} from "@/lib/ai/retrieval";

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

    // With a provider enabled, the route would call the model here, passing
    // AI_SYSTEM_PROMPT + the retrieved context ONLY. Left as an integration
    // point so the flow exists from day one without leaking unapproved data.
    return NextResponse.json({
      answer: "Model provider configured — wire the call here using AI_SYSTEM_PROMPT and the retrieved context only.",
      systemPrompt: AI_SYSTEM_PROMPT,
      context,
      citations: [{ odu: context.odu.name }],
      contentMissing: false,
    });
  } catch (err) {
    return NextResponse.json({ error: `${err}` }, { status: 400 });
  }
}
