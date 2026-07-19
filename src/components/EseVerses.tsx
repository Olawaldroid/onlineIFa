import { EseVerse } from "@/lib/content/verses";

// Bilingual ẹsẹ Ifá display: Yorùbá on one side, English on the other
// (stacked on small screens). Server-safe — no hooks — so it renders in both
// the Odù detail page and the consultation result. Every verse carries its
// recorded source and a link; quotation is verbatim from an open-access
// scholarly record (see src/lib/content/verses.ts).
export function EseVerses({ verses, heading = "Ẹsẹ Ifá — a recorded verse" }: { verses: EseVerse[]; heading?: string }) {
  if (!verses.length) return null;
  return (
    <div className="card">
      <h3 className="mb-1 font-serif text-xl text-ifa-gold">{heading}</h3>
      {verses.map((v, i) => (
        <div key={i} className={i > 0 ? "mt-6 border-t border-ifa-border pt-5" : "mt-2"}>
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
          <p className="mb-0 mt-2.5 text-xs leading-relaxed text-ifa-sage">
            {v.excerpt ? "Excerpt. " : ""}As recited by {v.recordedFrom}.{" "}
            <a href={v.sourceHref} target="_blank" rel="noreferrer">
              {v.source}
            </a>
            .
          </p>
        </div>
      ))}
    </div>
  );
}
