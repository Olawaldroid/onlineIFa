// ===========================================================================
// Minimal Anthropic Messages API client (no SDK dependency — uses fetch).
// Only called when AI_ASSISTANT_ENABLED=true and ANTHROPIC_API_KEY is set.
// The caller passes ONLY approved, retrieved context (see retrieval.ts).
// ===========================================================================

export interface ModelResult {
  text: string;
  model: string;
}

export async function callAnthropic(
  systemPrompt: string,
  userContent: string,
): Promise<ModelResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not configured");
  const model = process.env.AI_MODEL || "claude-opus-4-8";

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Anthropic API error ${res.status}: ${detail.slice(0, 300)}`);
  }

  const json = (await res.json()) as {
    content?: { type: string; text?: string }[];
  };
  const text = (json.content ?? [])
    .filter((b) => b.type === "text")
    .map((b) => b.text ?? "")
    .join("\n")
    .trim();

  return { text, model };
}
