import Link from "next/link";

export const metadata = {
  title: "Free & non-commercial — Online Ifá",
};

// Online Ifá is free and non-commercial: no payments, no ads, no paywalls.
// This is a deliberate stance — it keeps the project honest, and it lets us
// draw on openly-licensed (including non-commercial) scholarship.
export default function PricingPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Free &amp; non-commercial</h1>

      <div className="card space-y-4 text-sm leading-relaxed text-ifa-cream/85">
        <p>
          Online Ifá is free to use. There are no payments, no subscriptions, no
          ads, and nothing behind a paywall. Everything — the 256 Odù, the
          consultation, the library and the readings — is open to everyone.
        </p>
        <p>
          This is a deliberate choice. Ifá is a living cultural heritage, not a
          product. Keeping the project non-commercial keeps it honest, and it
          lets us build on openly-licensed and public-domain scholarship that
          only permits non-commercial use.
        </p>
        <p>
          If you want to give back, the most valuable thing you can offer is
          knowledge: babaláwo, ìyánífá, researchers and translators can{" "}
          <Link href="/contribute">contribute reviewed content</Link> so the
          tradition is recorded well and shared freely.
        </p>
      </div>

      <p className="text-xs text-ifa-sage">
        Educational and cultural use only. Not a substitute for a trained
        babaláwo or professional advice.
      </p>
    </div>
  );
}
