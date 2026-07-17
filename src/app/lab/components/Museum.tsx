import { MUSEUM_ITEMS } from "../content";
import { ImageSlot } from "./ImageSlot";
import { SectionHeading } from "./SectionHeading";

export function Museum() {
  return (
    <section id="museum" className="bg-ifa-bg px-10 pb-[130px] pt-[110px]">
      <div className="mx-auto max-w-[1120px]">
        <SectionHeading num="11" title="The instruments" />
        <p className="mb-0 mt-[18px] max-w-[620px] text-base leading-[1.65] text-ifa-cream/70">
          Five objects carry the practice. Drop photographs or 360° captures of real pieces into
          each frame — museum collections and open cultural archives are good sources.
        </p>
        <div className="mt-11 grid grid-cols-3 gap-5">
          {MUSEUM_ITEMS.map((m) => (
            <div
              key={m.slot}
              className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[22px] transition-colors hover:border-ifa-gold"
            >
              <div className="h-[210px] overflow-hidden rounded-xl">
                <ImageSlot
                  src={m.src || undefined}
                  alt={`${m.name} — ${m.role.toLowerCase()}`}
                  placeholder={m.placeholder}
                  credit={m.credit || undefined}
                  creditHref={m.creditHref || undefined}
                />
              </div>
              <h3 className="mb-0 mt-[18px] font-serif text-[23px] font-medium text-ifa-cream">{m.name}</h3>
              <div className="mt-1 font-mono text-[11px] text-ifa-gold">{m.role}</div>
              <p className="mb-0 mt-2.5 text-[13.5px] leading-[1.65] text-ifa-cream/75">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
