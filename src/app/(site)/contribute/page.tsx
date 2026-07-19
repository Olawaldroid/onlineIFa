"use client";

import { useState } from "react";

// Contributor flow: submit an original interpretation for review.
// Required fields mirror the schema: Odù, language, tradition/lineage, author,
// source type, licence, review status (set by system), content, notes.
const SOURCE_TYPES = ["ORIGINAL_APP", "CONTRIBUTOR", "PUBLIC_DOMAIN", "LICENSED", "ORAL_TRADITION", "ACADEMIC"];
const CONTENT_CATEGORIES = [
  ["CONTRIBUTOR_ORIGINAL", "My original teaching"],
  ["ORIGINAL_SYNTHESIS", "Original synthesis of research"],
  ["PUBLIC_DOMAIN_VERSE", "Public-domain verse"],
  ["LICENSED_VERSE", "Licensed verse"],
  ["ORAL_TRADITION", "Attributed oral tradition"],
] as const;

export default function ContributePage() {
  const [form, setForm] = useState({
    oduSlug: "",
    language: "en",
    tradition: "",
    title: "",
    contentMd: "",
    notes: "",
    sourceType: "CONTRIBUTOR",
    contentCategory: "CONTRIBUTOR_ORIGINAL",
    citation: "",
    permissionConfirmed: false,
  });
  const [status, setStatus] = useState<string | null>(null);

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function setPermission(value: boolean) {
    setForm((current) => ({ ...current, permissionConfirmed: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Submitting…");
    const res = await fetch("/api/interpretations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setStatus(res.ok ? "Submitted for review. Thank you!" : `Error: ${json.error}`);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Contribute</h1>
        <p className="mt-1 text-sm text-ifa-cream/70">
          Submit <strong>original</strong> interpretation. Do not paste copyrighted
          book text. Submissions are reviewed by an admin before publishing and are
          fully versioned.
        </p>
      </header>

      <div className="card text-sm text-ifa-cream/75">
        Roles: Babalawo · researcher · translator · editor · admin. Account &
        role assignment is handled in the contributor onboarding (auth phase).
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Field label="Odù slug (e.g. ogbe-meji)">
          <input required value={form.oduSlug} onChange={(e) => set("oduSlug", e.target.value)} className="input" />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Language"><input value={form.language} onChange={(e) => set("language", e.target.value)} className="input" /></Field>
          <Field label="Tradition / lineage"><input value={form.tradition} onChange={(e) => set("tradition", e.target.value)} className="input" /></Field>
        </div>
        <Field label="Title"><input value={form.title} onChange={(e) => set("title", e.target.value)} className="input" /></Field>
        <Field label="Source type">
          <select value={form.sourceType} onChange={(e) => set("sourceType", e.target.value)} className="input">
            {SOURCE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Content category">
          <select value={form.contentCategory} onChange={(e) => set("contentCategory", e.target.value)} className="input">
            {CONTENT_CATEGORIES.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </Field>
        <Field label="Citation / attribution">
          <input value={form.citation} onChange={(e) => set("citation", e.target.value)} className="input" placeholder="Title, author or lineage, edition and page/section" />
        </Field>
        {form.contentCategory === "LICENSED_VERSE" && (
          <label className="flex gap-2 text-sm text-ifa-cream/80">
            <input type="checkbox" checked={form.permissionConfirmed} onChange={(e) => setPermission(e.target.checked)} />
            I confirm written publication permission is on file and can be shown to an admin.
          </label>
        )}
        <Field label="Content (Markdown)">
          <textarea required rows={8} value={form.contentMd} onChange={(e) => set("contentMd", e.target.value)} className="input font-mono" />
        </Field>
        <Field label="Notes (for reviewers)">
          <textarea rows={3} value={form.notes} onChange={(e) => set("notes", e.target.value)} className="input" />
        </Field>
        <p className="text-xs leading-relaxed text-ifa-cream/60">
          Research may inform original summaries, but they need a new structure and wording. Public-domain,
          licensed, and oral material requires precise attribution; licensed text also requires permission.
        </p>
        <button className="btn-primary">Submit for review</button>
        {status && <p className="text-sm text-ifa-sage">{status}</p>}
      </form>

      <style jsx global>{`
        .input {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid #3a2c20;
          background: #1a140f;
          padding: 0.5rem 0.75rem;
          color: #f3e9d9;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block text-ifa-cream/80">{label}</span>
      {children}
    </label>
  );
}
