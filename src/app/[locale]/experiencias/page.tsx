import { PageLayout } from "@/components/layout/PageLayout";
import React from "react";
import { ExperiencesHeroSection } from "./components/ExperiencesHero";
import { BentoSection } from "./components/BentoSection";
import { BusinessPackageHero } from "./components/BusinessPackageHero";
import { PackagesSection } from "./components/PackagesSection";

export default function page() {
  return (
    <PageLayout>
      <ExperiencesHeroSection />
      <BentoSection></BentoSection>
      <BusinessPackageHero></BusinessPackageHero>
      <PackagesSection></PackagesSection>
    </PageLayout>
  );
}
