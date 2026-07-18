import { ConsultationFlow } from "@/components/ConsultationFlow";
import { PageSection } from "@/components/PageSection";

// Consultation flow page. `?odu=` preselects an Odù (from the library).
export default function ConsultPage({ searchParams }: { searchParams: { odu?: string } }) {
  return (
    <PageSection tone="dark">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Consultation</p>
        <h1 className="section-title mt-2 text-4xl text-ifa-gold">Consultation</h1>
        <p className="mt-2 text-sm text-ifa-cream/70">
          An educational reflection tool. Not a substitute for a trained Babalawo
          or professional advice.
        </p>
      </div>
      <div className="mt-8">
        <ConsultationFlow presetOduSlug={searchParams.odu} />
      </div>
    </PageSection>
  );
}
