import { PageLayout } from "@/components/layout/PageLayout";
import React from "react";
import { ExperiencesHeroSection } from "./components/ExperiencesHero";
import { BentoSection } from "./components/BentoSection";

export default function page() {
  return (
    <PageLayout>
      <ExperiencesHeroSection />
      <BentoSection></BentoSection>
    </PageLayout>
  );
}
