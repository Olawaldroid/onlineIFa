import { CS_CARDS } from "../content";
import { SectionHeading } from "./SectionHeading";

export function IfaCs() {
  return (
    <section id="cs" className="bg-ifa-paper px-10 pb-[120px] pt-[110px] text-ifa-ink">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="07" title={<>Ifá &amp; Computer Science</>} light />
        <p className="mb-0 mt-5 max-w-[680px] text-[16.5px] leading-[1.7] text-ifa-ink/75">
          The structures of Ifá and the structures of computing rhyme in striking ways. These are
          comparisons between ideas — Ifá did not invent computing, and computing does not explain
          Ifá. Each system deserves to be understood on its own terms.
        </p>
        <div className="mt-[46px] grid grid-cols-3 gap-[18px]">
          {CS_CARDS.map((c) => (
            <div
              key={c.title}
              className="rounded-[14px] border border-ifa-border/[0.16] bg-ifa-parchment p-[26px] transition-colors hover:border-ifa-rust"
            >
              <div className="mb-3.5 flex justify-between font-mono text-[11px]">
                <span className="text-ifa-rust">{c.ifa}</span>
                <span className="text-ifa-ink/50">{c.cs}</span>
              </div>
              <h3 className="m-0 font-serif text-[21px] font-medium">{c.title}</h3>
              <p className="mb-0 mt-2.5 text-[13.5px] leading-[1.65] text-ifa-ink/70">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
