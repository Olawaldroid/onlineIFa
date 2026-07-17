import { ERAS } from "../content";
import { SectionHeading } from "./SectionHeading";

export function Timeline() {
  return (
    <section id="timeline" className="bg-ifa-bg pb-[120px] pt-[110px]">
      <div className="mx-auto max-w-[1120px] px-10">
        <SectionHeading num="06" title="A history in six movements" />
        <p className="mb-0 mt-4 text-[15px] text-ifa-cream/65">
          Scroll sideways through the arc of the tradition →
        </p>
      </div>
      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-10 pb-5 pt-11">
        {ERAS.map((e) => (
          <div
            key={e.when}
            className="w-[340px] flex-none snap-start rounded-[18px] border border-ifa-border bg-ifa-surface p-[30px] transition-colors duration-300 hover:border-ifa-gold"
          >
            <div className="font-mono text-xs text-ifa-gold">{e.when}</div>
            <h3 className="mb-0 mt-3 font-serif text-[26px] font-medium text-ifa-cream">{e.title}</h3>
            <div className="my-4 h-0.5 w-11 bg-ifa-rust" />
            <p className="m-0 text-sm leading-[1.7] text-ifa-cream/[0.78]">{e.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
