"use client";

import { useState } from "react";
import Link from "next/link";

// Unified search flow: Odù name, Yoruba spelling variants, English keyword,
// topic, signature pattern, proverb, verse, contributor, source.
export default function SearchPage() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<any | null>(null);
  const [busy, setBusy] = useState(false);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
    setResults(await res.json());
    setBusy(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Search</h1>
      <form onSubmit={run} className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Name, variant, keyword, signature (1111|2222), proverb…"
          className="flex-1 rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2"
        />
        <button className="btn-primary" disabled={busy}>Search</button>
      </form>

      {results && (
        <div className="space-y-6">
          <Group title={`Odù (${results.odu.length})`}>
            {results.odu.map((o: any) => (
              <Link key={o.slug} href={`/odu/${o.slug}`} className="card block hover:border-ifa-gold">
                <span className="font-medium">{o.name}</span>
                <span className="ml-2 font-mono text-sm text-ifa-gold">{o.signature}</span>
              </Link>
            ))}
          </Group>
          <Group title={`Proverbs (${results.proverbs?.length ?? 0})`}>
            {(results.proverbs ?? []).map((p: any) => (
              <div key={p.id} className="card text-sm">{p.yoruba}</div>
            ))}
          </Group>
          <Group title={`Verses (${results.verses?.length ?? 0})`}>
            {(results.verses ?? []).map((v: any) => (
              <div key={v.id} className="card text-sm">{v.textEnglish ?? v.textYoruba ?? "(verse)"}</div>
            ))}
          </Group>
          <Group title={`Sources (${results.sources?.length ?? 0})`}>
            {(results.sources ?? []).map((s: any) => (
              <div key={s.id} className="card text-sm">{s.title} — {s.author}</div>
            ))}
          </Group>
          <Group title={`Contributors (${results.contributors?.length ?? 0})`}>
            {(results.contributors ?? []).map((c: any) => (
              <div key={c.id} className="card text-sm">{c.displayName} · {c.role}</div>
            ))}
          </Group>
        </div>
      )}
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  const has = Array.isArray(children) ? children.length > 0 : !!children;
  return (
    <section>
      <h2 className="mb-2 text-sm uppercase tracking-wide text-ifa-sage">{title}</h2>
      {has ? <div className="grid gap-2">{children}</div> : <p className="text-sm text-ifa-cream/50">No results.</p>}
    </section>
  );
}
