"use client";

import { useState } from "react";
import Link from "next/link";

// Account creation flow. Posts to /api/auth/signup (scrypt-hashed password) and
// starts a session. OAuth / magic-link can be added behind the same endpoints.
export default function SignupPage({ searchParams }: { searchParams: { next?: string } }) {
  const next = searchParams.next ?? "/learn";
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setBusy(false);
    if (res.ok) window.location.href = next;
    else setError(json.error ?? "Sign-up failed");
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Create your account</h1>
      <form onSubmit={submit} className="card space-y-3">
        <input placeholder="Name (optional)" value={form.name} onChange={(e) => set("name", e.target.value)} className="w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2" />
        <input type="email" required placeholder="Email" value={form.email} onChange={(e) => set("email", e.target.value)} className="w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2" />
        <input type="password" required minLength={8} placeholder="Password (min 8 chars)" value={form.password} onChange={(e) => set("password", e.target.value)} className="w-full rounded-lg border border-ifa-border bg-ifa-bg px-3 py-2" />
        {error && <p className="text-sm text-ifa-rust">{error}</p>}
        <button className="btn-primary w-full" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
      </form>
      <p className="text-sm text-ifa-cream/70">
        Already have an account? <Link href={`/login?next=${encodeURIComponent(next)}`}>Sign in</Link>
        {" · "}
        <Link href={next}>Continue as guest</Link>
      </p>
    </div>
  );
}
