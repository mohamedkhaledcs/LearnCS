import { HeroSection } from "@/components/marketing/hero-section";
import { ProblemSection } from "@/components/marketing/problem-section";
import { AdaptiveEngineSection } from "@/components/marketing/adaptive-engine-section";
import { KnowledgeGraphSection } from "@/components/marketing/knowledge-graph-section";
import { FeatureShowcaseSection } from "@/components/marketing/feature-showcase-section";
import { CareerSection } from "@/components/marketing/career-section";
import { FinalCTASection } from "@/components/marketing/final-cta-section";
import { Footer } from "@/components/marketing/footer";
import { Navbar } from "@/components/marketing/navbar";
import { ScrollWayfinding } from "@/components/marketing/scroll-wayfinding";

export const metadata = {
  title: "Learn CS | The Adaptive Learning OS for Computer Science",
  description: "Understand where you are, what to learn next, and build real skills with an adaptive learning path.",
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-neutral-950 relative">
      <Navbar />
      <ScrollWayfinding />
      <HeroSection />
      <ProblemSection />
      <AdaptiveEngineSection />
      <KnowledgeGraphSection />
      <FeatureShowcaseSection />
      <CareerSection />
      <FinalCTASection />
      <Footer />
    </main>
  );
}
