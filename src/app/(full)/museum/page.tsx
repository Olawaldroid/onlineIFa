import { PageSection } from "@/components/PageSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";
import { MUSEUM_ITEMS } from "@/lib/content/museum";

export const metadata = {
  title: "The instruments — Online Ifá",
};

export default function MuseumPage() {
  return (
    <PageSection tone="dark">
      <SectionHeading num="01" title="The instruments" />
      <p className="mb-0 mt-[18px] max-w-[620px] text-base leading-[1.65] text-ifa-cream/70">
        Five objects carry the practice. Museum collections and open cultural archives supply the
        photographs below; two instruments still await a confirmed openly-licensed photo.
      </p>
      <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {MUSEUM_ITEMS.map((m) => (
          <div key={m.slot} className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[22px] transition-colors hover:border-ifa-gold">
            <div className="h-[210px] overflow-hidden rounded-xl">
              <Photo
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
    </PageSection>
  );
}
