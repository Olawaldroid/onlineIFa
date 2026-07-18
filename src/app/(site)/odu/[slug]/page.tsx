import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getOduDetail } from "@/lib/odu/detail";
import { SignatureDisplay } from "@/components/SignatureDisplay";

// Odù library detail flow — shows name, slug, signature, rank, legs, type,
// themes, related Odù, verses, interpretations by source, contributor notes,
// and source/licence status.
export default async function OduDetailPage({ params }: { params: { slug: string } }) {
  const detail = await getOduDetail(params.slug);
  if (!detail) notFound();

  const { fact, legs, meaning, themes, proverbs, verseCount } = detail;

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="eyebrow">
            Rank {fact.rank} · {fact.isPrimary ? "Principal Odù" : "Combined Odù"}
          </p>
          <h1 className="section-title mt-2 text-4xl text-ifa-gold">{fact.name}</h1>
          <p className="mt-1 font-mono text-sm text-ifa-cream/60">/{fact.slug}</p>
          {fact.altNames.length > 0 && (
            <p className="mt-1 text-sm text-ifa-cream/60">
              Also: {fact.altNames.join(", ")}
            </p>
          )}
        </div>
        <SignatureDisplay signature={fact.signature} />
      </header>

      {/* FACT LAYER */}
      <section className="grid gap-4 sm:grid-cols-2">
        <Fact label="Signature" value={fact.signature} mono />
        <Fact label="Type" value={fact.isPrimary ? "Principal (Méjì)" : "Combined"} />
        <Fact label="Right leg" value={legs.right} href={`/odu/${fact.rightSlug}`} />
        <Fact label="Left leg" value={legs.left} href={`/odu/${fact.leftSlug}`} />
      </section>

      {fact.factualSummary && (
        <section className="card">
          <h2 className="text-sm uppercase tracking-wide text-ifa-sage">Factual summary</h2>
          <p className="mt-1 text-ifa-cream/85">{fact.factualSummary}</p>
        </section>
      )}

      {themes.length > 0 && (
        <section>
          <h2 className="mb-2 text-sm uppercase tracking-wide text-ifa-sage">Themes</h2>
          <div className="flex flex-wrap gap-2">
            {themes.map((t) => (
              <span key={t} className="rounded-full border border-ifa-border px-3 py-1 text-sm">{t}</span>
            ))}
          </div>
        </section>
      )}

      {/* MEANING LAYER (gated) */}
      <section className="card">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-ifa-gold">
            Interpretation
          </h2>
          {meaning.isPlaceholder ? (
            <span className="rounded-full bg-ifa-rust/30 px-3 py-1 text-xs text-ifa-cream">
              Awaiting review
            </span>
          ) : (
            <span className="rounded-full bg-ifa-sage/30 px-3 py-1 text-xs text-ifa-cream">
              Approved · {meaning.sourceTitle}
            </span>
          )}
        </div>
        {meaning.title && <h3 className="mb-2 font-serif text-lg">{meaning.title}</h3>}
        <div className="prose-ifa">
          <ReactMarkdown>{meaning.contentMd}</ReactMarkdown>
        </div>
        {meaning.isPlaceholder && (
          <p className="mt-4 text-sm text-ifa-cream/70">
            Are you a Babalawo, researcher, or translator?{" "}
            <Link href="/contribute">Contribute an original interpretation →</Link>
          </p>
        )}
        {meaning.licence && (
          <p className="mt-4 text-xs text-ifa-sage">
            Source: {meaning.sourceTitle} · Licence: {meaning.licence}
          </p>
        )}
      </section>

      {proverbs.length > 0 && (
        <section className="card">
          <h2 className="text-sm uppercase tracking-wide text-ifa-sage">Proverbs</h2>
          <ul className="mt-2 space-y-2">
            {proverbs.map((p, i) => (
              <li key={i}>
                <span className="text-ifa-cream">{p.yoruba}</span>
                {p.english && <span className="block text-sm text-ifa-cream/60">{p.english}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-wrap gap-4 text-sm text-ifa-cream/70">
        <span>Available verses: {verseCount}</span>
        <Link href={`/consult?odu=${fact.slug}`} className="btn-secondary">
          Use this Odù in a consultation
        </Link>
      </section>
    </div>
  );
}

function Fact({ label, value, mono, href }: { label: string; value: string; mono?: boolean; href?: string }) {
  const body = (
    <>
      <dt className="text-xs uppercase tracking-wide text-ifa-sage">{label}</dt>
      <dd className={`mt-1 ${mono ? "font-mono text-ifa-gold" : "text-ifa-cream"}`}>{value}</dd>
    </>
  );
  return href ? (
    <Link href={href} className="card block hover:border-ifa-gold">{body}</Link>
  ) : (
    <div className="card">{body}</div>
  );
}
