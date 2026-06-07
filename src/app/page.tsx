import Link from "next/link";

// Homepage — entry to the onboarding flow.
// User lands here, then chooses Learn or Start Consultation. Both paths route
// through the disclaimer before the protected experience.
export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="font-serif text-4xl font-bold text-ifa-gold sm:text-5xl">
          Online Ifá
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-ifa-cream/80">
          A respectful, educational space to learn about the 256 Odù of Ifá and
          to explore consultation. We separate verifiable facts about each Odù
          from interpretation, and every interpretation is original, licensed,
          or contributor-reviewed — never copied.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/disclaimer?next=/learn" className="btn-primary">
            Learn Ifá
          </Link>
          <Link href="/disclaimer?next=/consult" className="btn-secondary">
            Start Consultation
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card title="16 + 240 = 256 Odù" body="Browse all principal and combined Odù with their binary-style signatures and combination structure." href="/odu" />
        <Card title="Facts, then meaning" body="Names, ranks, and signatures are facts. Meaning lives in clearly-sourced, reviewed interpretations." href="/learn" />
        <Card title="Honest casting" body="Simulated, learning, manual, or self-selected modes — clearly labelled, with no false spiritual authority." href="/consult" />
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold text-ifa-gold">A note on respect & safety</h2>
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
      <h3 className="font-semibold text-ifa-cream">{title}</h3>
      <p className="mt-2 text-sm text-ifa-cream/70">{body}</p>
    </Link>
  );
}
