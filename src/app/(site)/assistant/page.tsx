import { OduAssistant } from "@/components/OduAssistant";

export const metadata = {
  title: "Study assistant — Online Ifá",
};

export default function AssistantPage() {
  return <OduAssistant initialOduSlug="ogbe-meji" allowOduEdit />;
}
