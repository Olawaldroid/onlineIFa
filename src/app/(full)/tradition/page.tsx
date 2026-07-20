import { PageSection } from "@/components/PageSection";
import { Photo } from "@/components/Photo";
import { SectionHeading } from "@/components/SectionHeading";
import { ERAS } from "@/lib/content/history";
import { GALLERY_ITEMS, LIVING_ITEMS, MUSEUM_ITEMS } from "@/lib/content/museum";

export const metadata = {
  title: "Tradition — Online Ifá",
  description: "The history, instruments, art, and living practice of Ifá.",
};

export default function TraditionPage() {
  return (
    <>
      <PageSection id="history" tone="dark">
        <SectionHeading num="01" title="A living history in six movements" />
        <p className="mb-0 mt-4 max-w-2xl text-[15px] leading-relaxed text-ifa-cream/65">
          A compact arc through the tradition. History gives the objects below their context; the
          living practice keeps both from becoming museum relics.
        </p>
        <div className="-mx-6 mt-11 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-5 sm:-mx-10 sm:px-10">
          {ERAS.map((era) => (
            <article
              key={era.when}
              className="w-[min(340px,84vw)] flex-none snap-start rounded-[18px] border border-ifa-border bg-ifa-surface p-[30px] transition-colors hover:border-ifa-gold"
            >
              <div className="font-mono text-xs text-ifa-gold">{era.when}</div>
              <h3 className="mb-0 mt-3 font-serif text-[26px] font-medium text-ifa-cream">{era.title}</h3>
              <div className="my-4 h-0.5 w-11 bg-ifa-rust" />
              <p className="m-0 text-sm leading-[1.7] text-ifa-cream/[0.78]">{era.body}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="objects" tone="light">
        <SectionHeading num="02" title="The instruments" light />
        <p className="mb-0 mt-[18px] max-w-[680px] text-base leading-[1.65] text-ifa-ink/70">
          Five working objects carry the practice. Each documentary photograph comes from a museum
          or open cultural archive and is credited at the image.
        </p>
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MUSEUM_ITEMS.map((item) => (
            <article
              key={item.slot}
              className="rounded-[18px] border border-ifa-ink/15 bg-ifa-parchment p-[22px] transition-colors hover:border-ifa-rust"
            >
              <div className="h-[210px] overflow-hidden rounded-xl">
                <Photo
                  src={item.src || undefined}
                  alt={`${item.name} — ${item.role.toLowerCase()}`}
                  placeholder={item.placeholder}
                  credit={item.credit || undefined}
                  creditHref={item.creditHref || undefined}
                />
              </div>
              <h3 className="mb-0 mt-[18px] font-serif text-[23px] font-medium text-ifa-ink">{item.name}</h3>
              <div className="mt-1 font-mono text-[11px] text-ifa-rust">{item.role}</div>
              <p className="mb-0 mt-2.5 text-[13.5px] leading-[1.65] text-ifa-ink/70">{item.desc}</p>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="collections" tone="deep">
        <SectionHeading num="03" title="Across collections" />
        <p className="mb-0 mt-[18px] max-w-[680px] text-base leading-[1.65] text-ifa-cream/70">
          Ifá objects sit in collections from Lagos to Brooklyn, Cologne to Rio—carried through
          trade, colonialism, and diaspora. Openly licensed images let us examine their distinct
          regional carving without inventing a generic visual language.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item) => (
            <article key={item.slot} className="flex flex-col overflow-hidden rounded-2xl border border-ifa-border bg-ifa-surface transition-colors hover:border-ifa-gold">
              <div className="h-[230px]">
                <Photo src={item.src} alt={item.name} placeholder={item.name} credit={item.credit} creditHref={item.creditHref} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="m-0 font-serif text-[19px] font-medium leading-[1.3] text-ifa-cream">{item.name}</h3>
                <div className="mt-1.5 font-mono text-[10.5px] text-ifa-gold">{item.origin}</div>
                <p className="mb-0 mt-2.5 flex-1 text-[13px] leading-relaxed text-ifa-cream/70">{item.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection id="living" tone="dark">
        <SectionHeading num="04" title="The living tradition" />
        <p className="mb-0 mt-[18px] max-w-[660px] text-base leading-[1.65] text-ifa-cream/70">
          Ifá remains a daily practice across West Africa and the diaspora. Its groves, shrines,
          practitioners, poetry, and consultations belong to the present—not only the archive.
        </p>
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LIVING_ITEMS.map((item) => (
            <article key={item.slot} className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[22px] transition-colors hover:border-ifa-gold">
              <div className="h-[210px] overflow-hidden rounded-xl">
                <Photo src={item.src} alt={item.name} placeholder={item.name} credit={item.credit} creditHref={item.creditHref} />
              </div>
              <h3 className="mb-0 mt-[18px] font-serif text-[23px] font-medium text-ifa-cream">{item.name}</h3>
              <div className="mt-1 font-mono text-[11px] text-ifa-gold">{item.origin}</div>
              <p className="mb-0 mt-2.5 text-[13.5px] leading-[1.65] text-ifa-cream/75">{item.desc}</p>
            </article>
          ))}
        </div>
      </PageSection>
    </>
  );
}
