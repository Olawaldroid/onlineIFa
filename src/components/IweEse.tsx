import type { IweVerse } from "@/lib/content/iweVerses";

export function IweEse({ verse }: { verse: IweVerse }) {
  return (
    <div className="card">
      <h3 className="font-serif text-xl text-ifa-gold">Ẹsẹ Ifá</h3>
      <p className="mt-2 text-xs leading-relaxed text-ifa-cream/60">
        A source-recorded passage under this Odù. It is not a personalised ritual or prescription.
      </p>
      <article className="mt-4">
        <div className="mb-3 flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.16em]">
          <span className="rounded-full border border-ifa-sage/35 px-2.5 py-1 text-ifa-sage">
            Èsè {verse.number}
          </span>
          <span className="rounded-full border border-ifa-gold/35 px-2.5 py-1 text-ifa-gold">
            Published with permission
          </span>
        </div>
        <div className="whitespace-pre-line rounded-xl border border-ifa-border bg-ifa-bg/60 p-4 font-serif text-[15px] leading-[1.75] text-ifa-cream">
          {verse.text}
        </div>
        <p className="mb-0 mt-3 text-xs leading-relaxed text-ifa-sage">
          <span className="text-ifa-cream/55">Source · </span>
          {verse.source.compiler}, <cite>{verse.source.title}</cite> ({verse.source.publisher},{" "}
          {verse.source.copyrightYears}), pp. {verse.printedPages}.
        </p>
        <details className="mt-2 text-xs text-ifa-sage">
          <summary className="cursor-pointer select-none opacity-80 hover:text-ifa-gold hover:opacity-100">
            Source and transcription note
          </summary>
          <div className="mt-2 space-y-1.5 leading-relaxed text-ifa-cream/65">
            <p className="m-0">Local PDF pages {verse.pdfPages}. {verse.source.transcriptionNote}</p>
            <p className="m-0">{verse.source.permission.scope}</p>
          </div>
        </details>
      </article>
    </div>
  );
}
