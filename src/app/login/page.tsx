"use client";

import { useState } from "react";
import Link from "next/link";

// Login flow. Posts to /api/auth/login and redirects to `next` on success.
export default function LoginPage({ searchParams }: { searchParams: { next?: string } }) {
  const next = searchParams.next ?? "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    setBusy(false);
    if (res.ok) window.location.href = next;
    else setError(json.error ?? "Login failed");
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Sign in</h1>
      <form onSubmit={submit} className="card space-y-3">
        <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2" />
        <input type="password" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2" />
        {error && <p className="text-sm text-ifa-rust">{error}</p>}
        <button className="btn-primary w-full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
      <p className="text-sm text-ifa-cream/70">
        No account? <Link href={`/signup?next=${encodeURIComponent(next)}`}>Create one</Link>
      </p>
    </div>
  );
}
