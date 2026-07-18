import { PageSection } from "@/components/PageSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";
import { MUSEUM_ITEMS, GALLERY_ITEMS, LIVING_ITEMS } from "@/lib/content/museum";

export const metadata = {
  title: "Museum — Online Ifá",
};

export default function MuseumPage() {
  return (
    <>
      <PageSection tone="dark">
        <SectionHeading num="01" title="The instruments" />
        <p className="mb-0 mt-[18px] max-w-[620px] text-base leading-[1.65] text-ifa-cream/70">
          Five objects carry the practice. Every photograph below comes from a museum collection or
          open cultural archive under an open licence, credited in place.
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

      <PageSection tone="light">
        <SectionHeading num="02" title="Across the world's collections" light />
        <p className="mb-0 mt-[18px] max-w-[640px] text-base leading-[1.65] text-ifa-ink/[0.72]">
          Ifá objects sit in museums from Lagos to Brooklyn, Cologne to Rio — carried there by trade,
          colonialism and the diaspora. These openly-licensed photographs let you study the carving up
          close.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((g) => (
            <article key={g.slot} className="flex flex-col overflow-hidden rounded-2xl border border-ifa-border/[0.16] bg-ifa-parchment transition-colors hover:border-ifa-rust">
              <div className="h-[230px]">
                <Photo src={g.src} alt={g.name} placeholder={g.name} credit={g.credit} creditHref={g.creditHref} />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="m-0 font-serif text-[19px] font-medium leading-[1.3]">{g.name}</h3>
                <div className="mt-1.5 font-mono text-[10.5px] text-ifa-rust">{g.origin}</div>
                <p className="mb-0 mt-2.5 flex-1 text-[13px] leading-relaxed text-ifa-ink/70">{g.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </PageSection>

      <PageSection tone="deep">
        <SectionHeading num="03" title="The living tradition" />
        <p className="mb-0 mt-[18px] max-w-[620px] text-base leading-[1.65] text-ifa-cream/70">
          These objects are not relics. Ifá remains a daily practice — inscribed by UNESCO as
          intangible cultural heritage of humanity — and its groves, shrines and diviners are part of
          the present, not the past.
        </p>
        <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LIVING_ITEMS.map((m) => (
            <div key={m.slot} className="rounded-[18px] border border-ifa-border bg-ifa-surface p-[22px] transition-colors hover:border-ifa-gold">
              <div className="h-[210px] overflow-hidden rounded-xl">
                <Photo src={m.src} alt={m.name} placeholder={m.name} credit={m.credit} creditHref={m.creditHref} />
              </div>
              <h3 className="mb-0 mt-[18px] font-serif text-[23px] font-medium text-ifa-cream">{m.name}</h3>
              <div className="mt-1 font-mono text-[11px] text-ifa-gold">{m.origin}</div>
              <p className="mb-0 mt-2.5 text-[13.5px] leading-[1.65] text-ifa-cream/75">{m.desc}</p>
            </div>
          ))}
        </div>
        <p className="mb-0 mt-10 max-w-[640px] text-[13px] leading-relaxed text-ifa-sage">
          Want to add a photograph? Openly-licensed captures of instruments, shrines and practice —
          especially from practitioners and Nigerian institutions — are welcome via the contribute
          page, with credit and licence recorded for each image.
        </p>
      </PageSection>
    </>
  );
}
