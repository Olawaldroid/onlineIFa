import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PageSection } from "@/components/PageSection";
import { SignatureDisplay } from "@/components/SignatureDisplay";
import { allOduFacts } from "@/lib/odu/facts";
import { resolveLocalDisplay } from "@/lib/interpretation/localDisplay";
import { versesForOdu } from "@/lib/content/verses";

// Homepage — entry to the onboarding flow.
// User lands here, then chooses Learn or Start Consultation. Both paths route
// through the disclaimer before the protected experience.

// Re-render hourly so the Odù of the day stays current without going dynamic.
export const revalidate = 3600;

/** Deterministic daily pick cycling through all 256 in rank order. */
function oduOfTheDay() {
  const facts = allOduFacts();
  const daysSinceEpoch = Math.floor(Date.now() / 86_400_000);
  return facts[daysSinceEpoch % facts.length];
}

export default function HomePage() {
  const daily = oduOfTheDay();
  const display = resolveLocalDisplay(daily.slug);
  const hasVerse = versesForOdu(daily.slug).length > 0;

  return (
    <>
      <Hero />

      <PageSection tone="dark">
        <div className="card mb-8 sm:flex sm:items-center sm:gap-6">
          <div className="flex items-center gap-5">
            <SignatureDisplay signature={daily.signature} />
            <div>
              <div className="eyebrow">ODÙ OF THE DAY</div>
              <h2 className="m-0 mt-1 font-serif text-2xl text-ifa-gold sm:text-3xl">{daily.name}</h2>
            </div>
          </div>
          <div className="mt-3 flex-1 sm:mt-0">
            <p className="m-0 text-sm leading-relaxed text-ifa-cream/75">
              {display.title ?? daily.factualSummary}
              {hasVerse && (
                <span className="ml-2 rounded-full bg-ifa-gold/[0.15] px-2.5 py-0.5 text-[11px] text-ifa-gold">
                  has a recorded ẹsẹ
                </span>
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link href={`/odu/${daily.slug}`} className="btn-secondary text-sm">
                Read {daily.name}
              </Link>
              <Link href={`/consult?odu=${daily.slug}`} className="text-sm text-ifa-gold">
                Sit with it in consultation →
              </Link>
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <Card title="16 + 240 = 256 Odù" body="Browse all principal and combined Odù with their binary-style signatures and combination structure." href="/odu" />
          <Card title="Facts, then meaning" body="Names, ranks, and signatures are facts. Meaning lives in clearly-sourced, reviewed interpretations." href="/learn" />
          <Card title="Honest casting" body="Simulated, learning, manual, or self-selected modes — clearly labelled, with no false spiritual authority." href="/consult" />
        </div>

        <div className="card mt-8">
          <h2 className="font-serif text-lg text-ifa-gold">A note on respect &amp; safety</h2>
          <p className="mt-2 text-sm text-ifa-cream/80">
            This app is educational and cultural. It is not a substitute for a
            trained Babalawo, nor for medical, legal, financial, or mental-health
            professionals. Sensitive questions are redirected to appropriate help.
          </p>
        </div>
      </PageSection>
    </>
  );
}

function Card({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className="card block hover:border-ifa-gold">
      <h3 className="font-serif text-lg text-ifa-cream">{title}</h3>
      <p className="mt-2 text-sm text-ifa-cream/70">{body}</p>
    </Link>
  );
}
