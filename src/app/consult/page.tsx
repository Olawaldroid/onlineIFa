import { ConsultationFlow } from "@/components/ConsultationFlow";

// Consultation flow page. `?odu=` preselects an Odù (from the library).
export default function ConsultPage({ searchParams }: { searchParams: { odu?: string } }) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <header>
        <h1 className="font-serif text-3xl font-bold text-ifa-gold">Consultation</h1>
        <p className="mt-1 text-sm text-ifa-cream/70">
          An educational reflection tool. Not a substitute for a trained Babalawo
          or professional advice.
        </p>
      </header>
      <ConsultationFlow presetOduSlug={searchParams.odu} />
    </div>
  );
}
