import { LIBRARY_ENTRIES } from "@/lib/content/library";
import { GLOSSARY } from "@/lib/content/glossary";
import { PageSection } from "@/components/PageSection";
import { SectionHeading } from "@/components/SectionHeading";

// Library. Surfaces public-domain and openly-licensed sources so users can
// read the actual works — bibliographic references + links, not reproduced
// text (see src/lib/sources/publicDomain.ts and CONTENT_LICENSING.md).
export const metadata = {
  title: "Library — Online Ifá",
};

export default function LibraryPage() {
  return (
    <PageSection tone="light">
      <SectionHeading num="01" title="Library" light />
      <p className="mb-0 mt-[18px] max-w-[640px] text-base leading-[1.65] text-ifa-ink/[0.72]">
        Public-domain and openly-licensed sources you can read today. Copyrighted scholarship is
        referenced for facts only — never copied.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LIBRARY_ENTRIES.map((b) => (
          <article key={b.id} className="flex flex-col rounded-2xl border border-ifa-border/[0.16] bg-ifa-parchment p-6 transition-colors hover:border-ifa-rust">
            <div className="mb-2.5 font-mono text-[10.5px] text-ifa-rust">{b.tag}</div>
            <h3 className="m-0 font-serif text-[19px] font-medium leading-[1.3]">{b.title}</h3>
            <div className="mt-1.5 text-[12.5px] text-ifa-ink/60">{b.author}</div>
            <p className="mb-0 mt-2.5 flex-1 text-[13px] leading-relaxed text-ifa-ink/70">{b.note}</p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a href={b.href} target="_blank" rel="noreferrer" className="btn-primary">
                Read {b.tag.startsWith("PUBLIC DOMAIN") ? "on archive.org" : "more"}
              </a>
              {b.secondaryHref && (
                <a href={b.secondaryHref} target="_blank" rel="noreferrer" className="btn-secondary border-ifa-ink/25 text-ifa-ink hover:border-ifa-rust hover:text-ifa-ink">
                  {b.secondaryLabel}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      <div className="card mt-8 text-sm text-ifa-cream/75">
        <h2 className="font-serif text-lg text-ifa-gold">About these sources</h2>
        <p className="mt-2">
          Public-domain titles were published before 1929 and are out of copyright in the United
          States. The colonial-era ethnographies (Ellis, Dennett, Frobenius) reflect the biases of
          their time — we use them for factual and historical grounding and read their
          interpretation critically, preferring Yorùbá-authored and contemporary scholarship for
          meaning. Any passage quoted in the app is added by a contributor with an exact page
          citation and reviewed before publishing.
        </p>
      </div>

      <h3 className="mb-0 mt-14 font-serif text-2xl font-medium sm:text-3xl">Glossary &amp; pronunciation</h3>
      <div className="mt-6 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {GLOSSARY.map((g) => (
          <div key={g.term} className="rounded-xl border border-ifa-border/[0.16] bg-ifa-parchment p-[18px]">
            <div className="font-serif text-lg">{g.term}</div>
            <div className="mt-1 font-mono text-[11px] text-ifa-rust">{g.pron}</div>
            <p className="mb-0 mt-2 text-[12.5px] leading-[1.55] text-ifa-ink/70">{g.def}</p>
          </div>
        ))}
      </div>
    </PageSection>
  );
}
