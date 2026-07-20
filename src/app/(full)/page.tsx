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

      <PageSection tone="light">
        <div className="mx-auto max-w-3xl text-center">
          <div className="font-mono text-xs uppercase tracking-[0.28em] text-ifa-rust">
            One consultation · one anchor
          </div>
          <h2 className="mt-3 font-serif text-3xl text-ifa-ink sm:text-4xl">
            A digital flow shaped by the real sequence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ifa-ink/70">
            The experience separates the principal Odù from the questions that clarify it. Rewording
            the same concern does not turn consultation into answer-shopping.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <PathCard
            number="01"
            kind="concern"
            title="Frame one concern"
            body="Name the area and the real question. Cosmetic wording changes stay with the same active consultation."
          />
          <PathCard
            number="02"
            kind="opele"
            title="Cast the principal Odù"
            body="The ọ̀pẹ̀lẹ̀ midpoint leads the throw; its free ends unfold back and settle in two parallel rows."
          />
          <PathCard
            number="03"
            kind="ibo"
            title="Clarify with Ìbò"
            body="Paired auxiliary propositions establish the favourable or cautionary orientation without replacing the Odù."
          />
        </div>
      </PageSection>

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
          <Card title="Honest casting" body="Simulated, learning, manual, or self-selected modes, each labelled for what it is." href="/consult" />
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

function PathCard({
  number,
  kind,
  title,
  body,
}: {
  number: string;
  kind: "concern" | "opele" | "ibo";
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-ifa-ink/15 bg-ifa-parchment p-5 shadow-[0_18px_40px_rgba(58,40,24,0.08)]">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs tracking-[0.18em] text-ifa-rust">{number}</span>
        <PathGlyph kind={kind} />
      </div>
      <h3 className="mt-5 font-serif text-xl text-ifa-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ifa-ink/70">{body}</p>
    </div>
  );
}

function PathGlyph({ kind }: { kind: "concern" | "opele" | "ibo" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 88 64" className="h-14 w-[77px]" fill="none">
      {kind === "concern" && (
        <>
          <circle cx="44" cy="32" r="25" stroke="#A8431F" strokeWidth="1.5" />
          <circle cx="44" cy="32" r="17" stroke="#C9A227" strokeWidth="1.5" strokeDasharray="3 4" />
          <path d="M44 20v15M44 43h.01" stroke="#3A2817" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      {kind === "opele" && (
        <>
          <path d="M44 7v8M44 15C22 18 17 31 18 57M44 15c22 3 27 16 26 42" stroke="#795B3D" strokeWidth="2" strokeLinecap="round" />
          {[22, 31, 40, 49].map((y) => (
            <g key={y}>
              <ellipse cx="20" cy={y} rx="6" ry="8" fill="#8A5A33" stroke="#5D3A20" />
              <ellipse cx="68" cy={y} rx="6" ry="8" fill="#D5B47B" stroke="#8A5A33" />
            </g>
          ))}
        </>
      )}
      {kind === "ibo" && (
        <>
          <path d="M8 34C8 20 18 11 31 12c11 1 17 10 15 22-2 13-10 21-22 20C14 53 8 46 8 34Z" fill="#E7D5AA" stroke="#8A5A33" strokeWidth="2" />
          <path d="M22 18c-6 9-6 22 1 30M34 18c6 9 5 21-2 30" stroke="#8A5A33" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M49 23c-5-5-2-11 4-12 4 0 6 2 8 5l13 23c4-2 7-1 9 2 4 5 0 12-6 11-4 0-6-3-7-6L56 23c-3 2-5 2-7 0Z" fill="#D8C8AA" stroke="#795B3D" strokeWidth="2" />
        </>
      )}
    </svg>
  );
}
