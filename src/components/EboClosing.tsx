import { CLOSING_CHANT } from "@/lib/content/verses";

// The way a real Ifá reading closes: after the ẹsẹ is told, Ifá's counsel is
// almost always to make ẹbọ (an offering / sacrifice), and the story ends with
// the person who obeyed finding relief. This is the universal closing pattern
// of ẹsẹ recitation — shown bilingually, honestly framed. We do NOT invent a
// specific ẹbọ for the seeker; only a trained babaláwo names that.
export function EboClosing() {
  const v = CLOSING_CHANT;
  return (
    <div className="card border-ifa-gold/30">
      <div className="mb-1 font-mono text-[10.5px] tracking-[0.24em] text-ifa-gold">ÌPARÍ · HOW THE READING CLOSES</div>
      <h3 className="mb-2 font-serif text-xl text-ifa-cream">Ẹbọ — the offering</h3>
      <p className="mb-3 text-[13px] leading-relaxed text-ifa-cream/70">
        Once the ẹsẹ is told, Ifá&rsquo;s counsel is almost always to make ẹbọ. In the stories, the one
        who listens and offers finds their way; the one who refuses does not. Every recitation carries
        this same close:
      </p>
      <div className="grid gap-4 rounded-xl border border-ifa-border bg-ifa-bg/60 p-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 font-mono text-[10.5px] tracking-[0.2em] text-ifa-sage">YORÙBÁ</div>
          {v.yoruba.map((line, i) => (
            <p key={i} className="m-0 font-serif text-[15px] italic leading-[1.7] text-ifa-cream">
              {line}
            </p>
          ))}
        </div>
        <div className="border-t border-ifa-border pt-3 sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
          <div className="mb-2 font-mono text-[10.5px] tracking-[0.2em] text-ifa-sage">ENGLISH</div>
          {v.english.map((line, i) => (
            <p key={i} className="m-0 text-[13.5px] leading-[1.7] text-ifa-cream/85">
              {line}
            </p>
          ))}
        </div>
      </div>
      <p className="mb-0 mt-3 text-xs leading-relaxed text-ifa-cream/70">
        In a real consultation the babaláwo names the specific ẹbọ. This app never does — it shows the
        tradition, not a prescription.
      </p>
      <details className="mt-2 text-xs text-ifa-sage">
        <summary className="cursor-pointer select-none opacity-80 hover:text-ifa-gold hover:opacity-100">
          Show reference
        </summary>
        <p className="mb-0 mt-1.5 leading-relaxed">
          The traditional closing pattern of an ẹsẹ recitation.{" "}
          <a href={v.sourceHref} target="_blank" rel="noreferrer">
            {v.source}
          </a>
          .
        </p>
      </details>
    </div>
  );
}
