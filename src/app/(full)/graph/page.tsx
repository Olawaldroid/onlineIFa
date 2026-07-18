import { PageSection } from "@/components/PageSection";
import { SectionHeading } from "@/components/SectionHeading";
import { KnowledgeGraphExplorer } from "@/components/KnowledgeGraphExplorer";

export const metadata = {
  title: "Knowledge Graph — Online Ifá",
};

export default function GraphPage() {
  return (
    <PageSection tone="light">
      <SectionHeading num="01" title="Knowledge Graph" light />
      <p className="mb-0 mt-[18px] max-w-[620px] text-base leading-[1.65] text-ifa-ink/[0.72]">
        Ifá is a connected system — figures, òrìṣà, virtues, verses, mathematics and history
        reference each other. Click any node to focus it.
      </p>
      <KnowledgeGraphExplorer />
    </PageSection>
  );
}
