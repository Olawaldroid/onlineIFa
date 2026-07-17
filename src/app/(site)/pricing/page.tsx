// Payment flow (optional, later phase). Tiers are defined now so the flow
// exists from day one; Stripe is disabled until PAYMENTS_ENABLED=true.
const TIERS = [
  { name: "Learning mode", price: "Free", body: "Browse all 256 Odù and learn how Ifá works." },
  { name: "Basic consultation", price: "Free", body: "Simulated cast with original placeholder interpretation." },
  { name: "Reviewed consultation", price: "$15", body: "Interpretation reviewed by a Babalawo before you receive it." },
  { name: "Live Babalawo session", price: "$90", body: "A scheduled session with a verified practitioner." },
  { name: "Contributor donation", price: "Pay what you like", body: "Support contributors who add original content." },
];

export default function PricingPage() {
  const enabled = process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Pricing</h1>
      {!enabled && (
        <p className="rounded-lg border border-ifa-border bg-ifa-surface px-4 py-2 text-sm text-ifa-sage">
          Payments are not enabled in this environment. These tiers describe the
          planned model; checkout is wired to Stripe in a later phase.
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TIERS.map((t) => (
          <div key={t.name} className="card">
            <h2 className="font-semibold text-ifa-cream">{t.name}</h2>
            <p className="my-2 text-2xl text-ifa-gold">{t.price}</p>
            <p className="text-sm text-ifa-cream/70">{t.body}</p>
            <button disabled={!enabled} className="btn-primary mt-4 disabled:opacity-40">
              {enabled ? "Choose" : "Coming soon"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
