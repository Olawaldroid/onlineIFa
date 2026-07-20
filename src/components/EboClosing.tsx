import { CLOSING_CHANT, eseSourceAllowsCurrentPublication } from "@/lib/content/verses";

// One source-recorded closing pattern. We do not universalise this passage or
// invent a specific ẹbọ; only a trained practitioner determines that in life.
export function EboClosing() {
  const v = CLOSING_CHANT;
  if (!eseSourceAllowsCurrentPublication(v.source)) return null;
  return (
    <div className="card border-ifa-gold/30">
      <div className="mb-1 font-mono text-[10.5px] tracking-[0.24em] text-ifa-gold">
        ÌPARÍ · A RECORDED CLOSING PATTERN
      </div>
      <h3 className="mb-2 font-serif text-xl text-ifa-cream">Ẹbọ in one recorded narrative pattern</h3>
      <p className="mb-3 text-[13px] leading-relaxed text-ifa-cream/70">
        Pogoson and Akande document these lines as a way many narratives close after the person in the
        story performs the prescribed sacrifice. It is an example from their Isale-Ọyọ record, not a
        universal ending and not a prescription for this digital consultation.
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
        In a living consultation, a trained practitioner determines whether any ẹbọ is called for and
        what it means. This app does not prescribe one.
      </p>
      <p className="mb-0 mt-3 text-xs leading-relaxed text-ifa-sage">
        <span className="text-ifa-cream/55">Source · </span>
        <a href={v.source.canonicalUrl} target="_blank" rel="noreferrer">
          {v.source.authors.join(" & ")} ({v.source.year}), <cite>{v.source.title}</cite>
        </a>
        , p. {v.printedPages}.{" "}
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
            Printed page {v.printedPages}; local PDF page {v.pdfPages}. {v.source.translationCredit}
          </p>
          <p className="m-0">{v.source.transcriptionNote}</p>
          <p className="m-0">{v.source.reviewNote}</p>
        </div>
      </details>
    </div>
  );
}
