import Link from "next/link";
import { primaryOduFacts, combinedOduFacts } from "@/lib/odu/facts";
import { SignatureDisplay } from "@/components/SignatureDisplay";
import { TOTAL_ODU } from "@/lib/odu/combine";

// Learn Ifá flow — overview of the corpus and how combinations work.
export default function LearnPage() {
  const primary = primaryOduFacts();
  const combinedCount = combinedOduFacts().length;

  return (
    <div className="space-y-12">
      <header>
        <p className="eyebrow">Learn</p>
        <h1 className="section-title mt-2 text-4xl">Learn Ifá</h1>
        <p className="mt-3 max-w-2xl text-ifa-cream/80">
          The Ifá corpus has {TOTAL_ODU} Odù: 16 principal (Méjì) and{" "}
          {combinedCount} combined. Each Odù has a binary-style signature made of
          two legs of four marks.
        </p>
      </header>

      <section className="card">
        <h2 className="font-serif text-xl text-ifa-gold">How combinations work</h2>
        <p className="mt-2 text-sm text-ifa-cream/80">
          A combined Odù is formed from two legs, each one of the 16 principal
          Odù: the <strong className="text-ifa-cream">right leg</strong> is named first, the{" "}
          <strong className="text-ifa-cream">left leg</strong> second. When both legs are the same principal
          Odù, the result is one of the 16 Méjì. 16 × 16 = 256 total signatures.
        </p>
        <p className="mt-2 text-sm text-ifa-cream/70">
          A mark of <span className="signature-mark text-ifa-gold">|</span> is a single mark; a
          mark of <span className="signature-mark text-ifa-gold">| |</span> is a double mark.
        </p>
      </section>

      <section>
        <h2 className="mb-4 font-serif text-xl text-ifa-gold">
          The 16 principal Odù
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {primary.map((o) => (
            <Link key={o.slug} href={`/odu/${o.slug}`} className="card block hover:border-ifa-gold">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-ifa-sage">Rank {o.rank}</span>
              </div>
              <h3 className="mt-1 font-serif text-lg text-ifa-cream">{o.name}</h3>
              <div className="mt-3">
                <SignatureDisplay signature={o.signature} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card flex flex-wrap items-center justify-between gap-4 border-ifa-gold/30 bg-gradient-to-br from-ifa-gold/10 to-transparent">
        <div>
          <h2 className="font-serif text-xl text-ifa-gold">All 256 Odù</h2>
          <p className="text-sm text-ifa-cream/70">
            Browse every principal and combined Odù in the library.
          </p>
        </div>
        <Link href="/odu" className="btn-primary">Open the library</Link>
      </section>

      <section className="card">
        <h2 className="font-serif text-xl text-ifa-gold">Search the corpus</h2>
        <p className="mt-2 text-sm text-ifa-cream/70">
          Search by name, Yoruba spelling variant, English keyword, topic,
          signature pattern, proverb, verse, contributor, or source.
        </p>
        <Link href="/search" className="btn-secondary mt-3">Go to search</Link>
      </section>

      <section className="card">
        <h2 className="font-serif text-xl text-ifa-gold">Want the full illustrated tour?</h2>
        <p className="mt-2 text-sm text-ifa-cream/70">
          IFA LAB walks through the mathematics, history, and a transparent casting simulator in one
          animated page.
        </p>
        <Link href="/lab#learn" className="btn-secondary mt-3">Open IFA LAB</Link>
      </section>
    </div>
  );
}
