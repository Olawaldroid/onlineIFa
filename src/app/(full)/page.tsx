import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PageSection } from "@/components/PageSection";

// Homepage — entry to the onboarding flow.
// User lands here, then chooses Learn or Start Consultation. Both paths route
// through the disclaimer before the protected experience.
export default function HomePage() {
  return (
    <>
      <Hero />

      <PageSection tone="dark">
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
