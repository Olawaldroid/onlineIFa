import { BOOKS, GLOSSARY } from "../content";
import { SectionHeading } from "./SectionHeading";

export function LibrarySection() {
  return (
    <section id="library" className="bg-ifa-paper px-10 pb-[120px] pt-[110px] text-ifa-ink">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="10" title="Library" light />
        <p className="mb-0 mt-[18px] max-w-[640px] text-base leading-[1.65] text-ifa-ink/[0.72]">
          Public-domain and openly-licensed sources you can read today. Copyrighted scholarship is
          referenced for facts only — never copied.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-4">
          {BOOKS.map((bk) => (
            <div
              key={bk.title}
              className="flex flex-col rounded-[14px] border border-ifa-border/[0.16] bg-ifa-parchment p-6 transition-colors hover:border-ifa-rust"
            >
              <div className="mb-2.5 font-mono text-[10.5px] text-ifa-rust">{bk.tag}</div>
              <h3 className="m-0 font-serif text-[19px] font-medium leading-[1.3]">{bk.title}</h3>
              <div className="mt-1.5 text-[12.5px] text-ifa-ink/60">{bk.author}</div>
              <p className="mb-0 mt-2.5 flex-1 text-[13px] leading-relaxed text-ifa-ink/70">{bk.note}</p>
            </div>
          ))}
        </div>
        <h3 className="mb-0 mt-14 font-serif text-3xl font-medium">Glossary &amp; pronunciation</h3>
        <div className="mt-6 grid grid-cols-4 gap-3.5">
          {GLOSSARY.map((g) => (
            <div key={g.term} className="rounded-xl border border-ifa-border/[0.16] bg-ifa-parchment p-[18px]">
              <div className="font-serif text-lg">{g.term}</div>
              <div className="mt-1 font-mono text-[11px] text-ifa-rust">{g.pron}</div>
              <p className="mb-0 mt-2 text-[12.5px] leading-[1.55] text-ifa-ink/70">{g.def}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
