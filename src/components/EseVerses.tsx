import type { EseVerse } from "@/lib/content/verses";

// Bilingual ẹsẹ Ifá display: Yorùbá on one side, English on the other
// (stacked on small screens). Server-safe — no hooks — so it renders in both
// the Odù detail page and the consultation result. Every verse carries its
// recorded source, exact pages and reuse licence. These are educational source
// quotations; a live diviner still determines which verse speaks to a person.
export function EseVerses({
  verses,
  heading = "A recorded Ẹsẹ associated with this Odù",
}: {
  verses: EseVerse[];
  heading?: string;
}) {
  if (!verses.length) return null;
  return (
    <div className="card">
      <h3 className="mb-1 font-serif text-xl text-ifa-gold">{heading}</h3>
      <p className="mb-4 mt-2 max-w-3xl text-xs leading-relaxed text-ifa-cream/60">
        This is a documented verse linked to the Odù, not a personalised verse selection. In a living
        consultation, a trained practitioner determines which Ẹsẹ is relevant.
      </p>
      {verses.map((v, i) => (
        <article key={v.id} className={i > 0 ? "mt-6 border-t border-ifa-border pt-5" : "mt-2"}>
          <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.16em]">
            <span className="rounded-full border border-ifa-sage/35 px-2.5 py-1 text-ifa-sage">
              Source-verified
            </span>
            {v.excerpt && (
              <span className="rounded-full border border-ifa-gold/35 px-2.5 py-1 text-ifa-gold">
                Excerpt
              </span>
            )}
          </div>
          <p className="mb-3 text-[13px] leading-relaxed text-ifa-cream/70">{v.context}</p>
          <div className="grid gap-4 rounded-xl border border-ifa-border bg-ifa-bg/60 p-4 sm:grid-cols-2">
            <div>
              <div className="mb-2 font-mono text-[10.5px] tracking-[0.2em] text-ifa-sage">YORÙBÁ</div>
              {v.yoruba.map((line, k) => (
                <p key={k} className="m-0 font-serif text-[15px] italic leading-[1.7] text-ifa-cream">
                  {line}
                </p>
              ))}
            </div>
            <div className="border-t border-ifa-border pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
              <div className="mb-2 font-mono text-[10.5px] tracking-[0.2em] text-ifa-sage">ENGLISH</div>
              {v.english.map((line, k) => (
                <p key={k} className="m-0 text-[13.5px] leading-[1.7] text-ifa-cream/85">
                  {line}
                </p>
              ))}
            </div>
          </div>
          <p className="mb-0 mt-3 text-xs leading-relaxed text-ifa-sage">
            <span className="text-ifa-cream/55">Source · </span>
            <a href={v.source.canonicalUrl} target="_blank" rel="noreferrer">
              {v.source.authors.join(" & ")} ({v.source.year}), <cite>{v.source.title}</cite>
            </a>
            , pp. {v.printedPages}.{" "}
            <a href={`https://doi.org/${v.source.doi}`} target="_blank" rel="noreferrer">
              DOI {v.source.doi}
            </a>
            .{" "}
            <a href={v.source.licence.url} target="_blank" rel="noreferrer">
              {v.source.licence.label}
            </a>
            .
          </p>
          <details className="mt-2 text-xs text-ifa-sage">
            <summary className="cursor-pointer select-none opacity-80 hover:text-ifa-gold hover:opacity-100">
              Full provenance and transcription note
            </summary>
            <div className="mt-2 space-y-1.5 leading-relaxed text-ifa-cream/65">
              <p className="m-0">
                Recorded from {v.recordedFrom}, {v.recordedPlace} ({v.recordedYear}). Printed pages{" "}
                {v.printedPages}; local PDF pages {v.pdfPages}.
              </p>
              <p className="m-0">{v.source.translationCredit}</p>
              <p className="m-0">{v.source.transcriptionNote}</p>
              <p className="m-0">{v.source.reviewNote}</p>
              <p className="m-0">{v.source.licence.scopeNote}</p>
            </div>
          </details>
        </article>
      ))}
    </div>
  );
}
