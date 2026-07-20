import Link from "next/link";
import { primaryOduFacts, combinedOduFacts } from "@/lib/odu/facts";
import { SignatureDisplay } from "@/components/SignatureDisplay";
import { TOTAL_ODU } from "@/lib/odu/combine";
import { PageSection } from "@/components/PageSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Photo } from "@/components/Photo";
import { MathExplorer } from "@/components/MathExplorer";
import { IfagrithmAccordion } from "@/components/IfagrithmAccordion";
import { GamesPanel } from "@/components/GamesPanel";
import { FACETS, CS_CARDS } from "@/lib/content/learn";

// Learn Ifá — what Ifá is, how the corpus combines, the mathematics behind
// it, its parallels with computer science, and the IFÀGRÌTHM field notes.
export default function LearnPage() {
  const primary = primaryOduFacts();
  const combinedCount = combinedOduFacts().length;

  return (
    <>
      <PageSection tone="light">
        <SectionHeading num="01" title="What is Ifá?" light />
        <div className="mt-6 grid items-center gap-8 lg:grid-cols-[1fr_400px]">
          <p className="m-0 text-[17.5px] leading-[1.7] text-ifa-ink/75">
            Ifá is a body of knowledge of the Yorùbá people of West Africa — a living tradition
            carried across Nigeria, Benin and Togo, and throughout the Americas. It is not magic. It
            is a system of memory, ethics and decision-making, transmitted orally for centuries
            through the wisdom of Ọ̀rúnmìlà and the training of the babaláwo and ìyánífá.
          </p>
          <div className="rounded-2xl border border-ifa-border/25 bg-ifa-parchment p-2.5 shadow-[0_16px_36px_rgba(36,27,20,.14)]">
            <div className="h-[280px] overflow-hidden rounded-lg">
              <Photo
                src="https://commons.wikimedia.org/wiki/Special:FilePath/Ifa%20divination%20tray%20(%20Opele%20Ifa).jpg?width=900"
                alt="A carved Ifá divination tray (ọpọn Ifá)"
                placeholder="Drop a photo of an Ọpọn Ifá"
                credit="Wiki Loves Monuments Nigeria — CC BY-SA 4.0"
                creditHref="https://commons.wikimedia.org/wiki/File:Ifa_divination_tray_(_Opele_Ifa).jpg"
              />
            </div>
            <div className="px-1.5 pb-1 pt-2.5 font-mono text-[10.5px] text-ifa-ink/55">
              A carved divination tray (ọpọn Ifá), photographed in a Nigerian museum collection.
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FACETS.map((f) => (
            <div key={f.num} className="rounded-2xl border border-ifa-border/[0.16] bg-ifa-parchment px-6 py-6 transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(36,27,20,.12)]">
              <div className="mb-3 font-mono text-xs text-ifa-rust">{f.num}</div>
              <h3 className="m-0 font-serif text-xl font-medium">{f.title}</h3>
              <p className="mb-0 mt-2.5 text-[14.5px] leading-[1.65] text-ifa-ink/70">{f.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection tone="dark">
        <SectionHeading num="02" title="The 16 principal Odù" />
        <p className="mb-0 mt-5 max-w-2xl text-base leading-[1.7] text-ifa-cream/80">
          The Ifá corpus has {TOTAL_ODU} Odù: 16 principal (Méjì) and {combinedCount} combined. A
          combined Odù is formed from two legs, each one of the 16 principal Odù: the{" "}
          <strong className="text-ifa-cream">right leg</strong> is named first, the{" "}
          <strong className="text-ifa-cream">left leg</strong> second. When both legs are the same
          principal Odù, the result is one of the 16 Méjì. 16 × 16 = 256 total signatures. A mark of{" "}
          <span className="signature-mark text-ifa-gold">|</span> is a single mark; a mark of{" "}
          <span className="signature-mark text-ifa-gold">| |</span> is a double mark.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {primary.map((o) => (
            <Link key={o.slug} href={`/odu/${o.slug}`} className="card block hover:border-ifa-gold">
              <span className="font-mono text-xs text-ifa-sage">Rank {o.rank}</span>
              <h3 className="mt-1 font-serif text-lg text-ifa-cream">{o.name}</h3>
              <div className="mt-3">
                <SignatureDisplay signature={o.signature} />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="card flex flex-wrap items-center justify-between gap-4 border-ifa-gold/30 bg-gradient-to-br from-ifa-gold/10 to-transparent">
            <div>
              <h3 className="font-serif text-lg text-ifa-gold">All 256 Odù</h3>
              <p className="text-sm text-ifa-cream/70">Browse every principal and combined Odù.</p>
            </div>
            <Link href="/odu" className="btn-primary">Open the library</Link>
          </div>
          <div className="card flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg text-ifa-gold">Search the corpus</h3>
              <p className="text-sm text-ifa-cream/70">By name, signature, topic, proverb, or source.</p>
            </div>
            <Link href="/search" className="btn-secondary">Go to search</Link>
          </div>
        </div>
      </PageSection>

      <PageSection id="practice" tone="dark">
        <SectionHeading num="03" title="Practice reading the figures" />
        <p className="mb-0 mt-5 max-w-[660px] text-base leading-[1.7] text-ifa-cream/75">
          Train your eye on the principal Odù and their marks. This is learning practice, separate
          from consultation.
        </p>
        <GamesPanel />
      </PageSection>

      <PageSection tone="light">
        <SectionHeading num="04" title="The Mathematics of Ifá" light />
        <p className="mb-0 mt-5 max-w-[660px] text-[16.5px] leading-[1.7] text-ifa-ink/75">
          Each figure of Ifá is written as two columns of four positions, and each position holds a
          single or a double mark. Eight binary positions: 2⁸ = 256 figures. The structure has been
          studied in academic and computer-science literature — a byte before the byte had a name.
        </p>
        <MathExplorer />
      </PageSection>

      <PageSection tone="light">
        <SectionHeading num="05" title="Ifá & Computer Science" light />
        <p className="mb-0 mt-5 max-w-[680px] text-[16.5px] leading-[1.7] text-ifa-ink/75">
          The structures of Ifá and the structures of computing rhyme in striking ways. These are
          comparisons between ideas — Ifá did not invent computing, and computing does not explain
          Ifá. Each system deserves to be understood on its own terms.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CS_CARDS.map((c) => (
            <div key={c.title} className="rounded-2xl border border-ifa-border/[0.16] bg-ifa-parchment p-6 transition-colors hover:border-ifa-rust">
              <div className="mb-3.5 flex justify-between font-mono text-[11px]">
                <span className="text-ifa-rust">{c.ifa}</span>
                <span className="text-ifa-ink/50">{c.cs}</span>
              </div>
              <h3 className="m-0 font-serif text-xl font-medium">{c.title}</h3>
              <p className="mb-0 mt-2.5 text-[13.5px] leading-[1.65] text-ifa-ink/70">{c.body}</p>
            </div>
          ))}
        </div>
      </PageSection>

      <PageSection tone="deep">
        <div className="mb-3.5 text-xs tracking-[0.34em] text-ifa-peri">SECTION 06 · FIELD NOTES</div>
        <h2 className="m-0 font-serif text-4xl font-medium leading-[1.1] text-ifa-cream sm:text-[54px]">
          IFÀGRÌTHM<span className="text-ifa-gold">.</span>
        </h2>
        <IfagrithmAccordion />
      </PageSection>
    </>
  );
}
