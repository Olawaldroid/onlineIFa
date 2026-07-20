"use client";

import { useState, type FormEvent } from "react";

interface AssistantResponse {
  answer?: string;
  error?: string;
  citations?: Record<string, unknown>[];
  contentMissing?: boolean;
}

interface OduAssistantProps {
  initialOduSlug: string;
  allowOduEdit?: boolean;
  compact?: boolean;
}

function citationLabel(citation: Record<string, unknown>): string {
  const values = [citation.title, citation.source, citation.odu, citation.signature]
    .filter((value): value is string => typeof value === "string" && value.length > 0);
  return values.length > 0 ? values.join(" · ") : "Reviewed Online Ifá material";
}

export function OduAssistant({
  initialOduSlug,
  allowOduEdit = false,
  compact = false,
}: OduAssistantProps) {
  const [oduSlug, setOduSlug] = useState(initialOduSlug);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AssistantResponse | null>(null);
  const [busy, setBusy] = useState(false);

  async function ask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setAnswer(null);

    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oduSlug, question }),
      });
      const result = (await response.json()) as AssistantResponse;
      setAnswer(response.ok ? result : { error: result.error ?? "The study assistant could not answer that request." });
    } catch {
      setAnswer({ error: "The study assistant is unavailable right now." });
    } finally {
      setBusy(false);
    }
  }

  const form = (
    <form onSubmit={ask} className="space-y-3">
      {allowOduEdit && (
        <label className="block text-sm text-ifa-cream/80">
          Odù slug
          <input
            value={oduSlug}
            onChange={(event) => setOduSlug(event.target.value)}
            className="mt-1 w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2 text-ifa-cream"
          />
        </label>
      )}
      <label className="block text-sm text-ifa-cream/80">
        What would you like to study?
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          className="mt-1 w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2 text-ifa-cream"
          placeholder="Explain, compare, summarise, or translate reviewed material…"
          maxLength={1000}
          aria-describedby="study-question-hint"
        />
        <span id="study-question-hint" className="mt-1 block text-xs text-ifa-cream/45">
          Leave blank for a general explanation.
        </span>
      </label>
      <button type="submit" className="btn-primary" disabled={busy || !oduSlug.trim()}>
        {busy ? "Checking reviewed sources…" : "Ask about this Odù"}
      </button>
    </form>
  );

  const response = answer && (
    <div className="mt-4 rounded-xl border border-ifa-border bg-ifa-bg/55 p-4" aria-live="polite">
      <p className="m-0 whitespace-pre-line text-sm leading-relaxed text-ifa-cream/90">
        {answer.answer ?? answer.error ?? "No answer was returned."}
      </p>
      {answer.contentMissing && (
        <p className="mb-0 mt-3 rounded-lg bg-ifa-rust/20 px-3 py-2 text-xs text-ifa-cream/75">
          Reviewed content is missing for this request; nothing has been invented.
        </p>
      )}
      {answer.citations && answer.citations.length > 0 && (
        <details className="mt-3 text-xs text-ifa-sage">
          <summary className="cursor-pointer">Sources used</summary>
          <ul className="mb-0 mt-2 list-disc space-y-1 pl-4">
            {answer.citations.map((citation, index) => (
              <li key={`${index}-${JSON.stringify(citation)}`}>{citationLabel(citation)}</li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );

  if (compact) {
    return (
      <section className="card">
        <details>
          <summary className="cursor-pointer font-serif text-xl text-ifa-gold">Ask about this Odù</summary>
          <p className="mt-2 text-xs leading-relaxed text-ifa-cream/60">
            Answers use reviewed material available on this site. The assistant says when the
            available sources do not contain an answer.
          </p>
          <div className="mt-4">{form}</div>
          {response}
        </details>
      </section>
    );
  }

  return (
    <section className="card space-y-4">
      <header>
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Study assistant</h1>
        <p className="mt-1 text-sm text-ifa-cream/70">
          Answers come only from reviewed material with citations. This is a study tool, not a
          substitute for a trained practitioner.
        </p>
      </header>
      {form}
      {response}
    </section>
  );
}
