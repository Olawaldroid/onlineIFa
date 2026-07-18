import Link from "next/link";
import { OduEmblem } from "@/components/OduEmblem";

// Homepage — entry to the onboarding flow.
// User lands here, then chooses Learn or Start Consultation. Both paths route
// through the disclaimer before the protected experience.
export default function HomePage() {
  return (
    <div className="space-y-14">
      <section className="text-center">
        <OduEmblem />
        <div style={{ animation: "omFadeUp 1s ease .1s both" }}>
          <p className="eyebrow mt-8">The digital house of Ifá</p>
          <h1 className="mt-3 font-serif text-5xl font-medium tracking-[0.02em] text-ifa-cream sm:text-6xl">
            Online <span className="text-ifa-gold">Ifá</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ifa-cream/80">
            A respectful, educational space to learn about the 256 Odù of Ifá and
            to explore consultation. We separate verifiable facts about each Odù
            from interpretation, and every interpretation is original, licensed,
            or contributor-reviewed — never copied.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4" style={{ animation: "omFadeUp 1s ease .3s both" }}>
          <Link href="/disclaimer?next=/learn" className="btn-primary">
            Learn Ifá
          </Link>
          <Link href="/disclaimer?next=/consult" className="btn-secondary">
            Start Consultation
          </Link>
          <Link href="/lab" className="btn-secondary">
            Explore IFA LAB ↗
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card title="16 + 240 = 256 Odù" body="Browse all principal and combined Odù with their binary-style signatures and combination structure." href="/odu" />
        <Card title="Facts, then meaning" body="Names, ranks, and signatures are facts. Meaning lives in clearly-sourced, reviewed interpretations." href="/learn" />
        <Card title="Honest casting" body="Simulated, learning, manual, or self-selected modes — clearly labelled, with no false spiritual authority." href="/consult" />
      </section>

      <section className="card border-ifa-gold/30 bg-gradient-to-br from-ifa-gold/10 to-transparent">
        <p className="eyebrow">A fuller, illustrated tour</p>
        <h2 className="section-title mt-2 text-2xl">IFA LAB — the interactive exploration</h2>
        <p className="mt-2 max-w-2xl text-sm text-ifa-cream/75">
          An animated, single-page walkthrough of Ifá: a transparent casting simulator, the mathematics
          of the 256-figure corpus, a clickable knowledge graph, a history timeline, comparisons with
          computer science, and two learning games.
        </p>
        <Link href="/lab" className="btn-primary mt-4 inline-flex">Open IFA LAB</Link>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold text-ifa-gold">A note on respect &amp; safety</h2>
        <p className="mt-2 text-sm text-ifa-cream/80">
          This app is educational and cultural. It is not a substitute for a
          trained Babalawo, nor for medical, legal, financial, or mental-health
          professionals. Sensitive questions are redirected to appropriate help.
        </p>
      </section>
    </div>
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
