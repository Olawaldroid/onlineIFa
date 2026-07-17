import type { Metadata } from "next";
import { Games } from "./components/Games";
import { Hero } from "./components/Hero";
import { IfaCs } from "./components/IfaCs";
import { Ifagrithm } from "./components/Ifagrithm";
import { KnowledgeGraph } from "./components/KnowledgeGraph";
import { LabNav } from "./components/LabNav";
import { LibrarySection } from "./components/LibrarySection";
import { Mathematics } from "./components/Mathematics";
import { Museum } from "./components/Museum";
import { OduExplorer } from "./components/OduExplorer";
import { Simulator } from "./components/Simulator";
import { Timeline } from "./components/Timeline";
import { WhatIsIfa } from "./components/WhatIsIfa";
import { LabProgressProvider } from "./components/progress";

export const metadata: Metadata = {
  title: "IFA LAB — The Digital House of Ifá",
  description:
    "An interactive, educational exploration of Ifá: the 256 Odù, a transparent consultation simulator, the mathematics of the corpus, its history, and its striking parallels with computer science.",
};

// The IFA LAB interactive platform — a full-bleed educational experience.
// Layout follows the Claude Design handoff (IFA LAB.dc.html); interactive
// sections are client components under ./components.
export default function LabPage() {
  return (
    <div className="min-w-[1100px]">
      <LabNav />
      <Hero />
      <LabProgressProvider>
        <WhatIsIfa />
        <Simulator />
        <Mathematics />
        <OduExplorer />
        <KnowledgeGraph />
        <Timeline />
        <IfaCs />
        <Ifagrithm />
        <Games />
        <LibrarySection />
        <Museum />
      </LabProgressProvider>
      <footer className="border-t border-ifa-border bg-ifa-deep px-10 py-[54px] text-center">
        <div className="font-serif text-[22px] tracking-[0.14em] text-ifa-gold">IFA LAB</div>
        <p className="mx-auto mb-0 mt-4 max-w-[640px] text-[12.5px] leading-[1.7] text-ifa-cream/50">
          IFA LAB is an educational and cultural project. It makes no claim of spiritual authority
          and does not replace a trained babaláwo or ìyánífá, nor medical, legal, financial or
          mental-health professionals. Interpretations shown are original educational summaries of
          commonly-taught themes. Ifá is inscribed on UNESCO&rsquo;s Representative List of the
          Intangible Cultural Heritage of Humanity.
        </p>
      </footer>
    </div>
  );
}
