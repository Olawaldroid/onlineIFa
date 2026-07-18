import { PageSection } from "@/components/PageSection";
import { SectionHeading } from "@/components/SectionHeading";
import { GamesPanel } from "@/components/GamesPanel";

export const metadata = {
  title: "Interactive learning — Online Ifá",
};

export default function GamesPage() {
  return (
    <PageSection tone="dark">
      <SectionHeading num="01" title="Interactive learning" />
      <GamesPanel />
    </PageSection>
  );
}
