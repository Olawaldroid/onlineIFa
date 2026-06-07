"use client";

import { useState } from "react";

// AI assistant flow. The assistant only answers from approved DB content,
// cites what it used, and says when content is missing. It never invents Odù
// and never claims to replace a Babalawo.
export default function AssistantPage() {
  const [oduSlug, setOduSlug] = useState("ogbe-meji");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oduSlug, question }),
    });
    setAnswer(await res.json());
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Study assistant</h1>
        <p className="mt-1 text-sm text-ifa-cream/70">
          Answers come only from approved content, with citations. It will tell
          you when something has not been added yet, and it does not replace a
          trained Babalawo.
        </p>
      </header>

      <form onSubmit={ask} className="card space-y-3">
        <label className="block text-sm">
          Odù slug
          <input value={oduSlug} onChange={(e) => setOduSlug(e.target.value)} className="mt-1 w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2" />
        </label>
        <label className="block text-sm">
          Question (optional)
          <input value={question} onChange={(e) => setQuestion(e.target.value)} className="mt-1 w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2" placeholder="Explain, compare, summarise, translate…" />
        </label>
        <button className="btn-primary" disabled={busy}>Ask</button>
      </form>

      {answer && (
        <div className="card space-y-3">
          <p className="text-ifa-cream/90">{answer.answer}</p>
          {answer.contentMissing && (
            <p className="rounded-lg bg-ifa-rust/20 px-3 py-2 text-sm">
              Content is missing for this request — nothing has been fabricated.
            </p>
          )}
          {answer.citations?.length > 0 && (
            <div className="text-xs text-ifa-sage">
              <p className="font-semibold">Citations</p>
              <ul className="list-disc pl-4">
                {answer.citations.map((c: any, i: number) => (
                  <li key={i}>{JSON.stringify(c)}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
