import { PageLayout } from "@/components/layout/PageLayout";
import React from "react";
import { ExperiencesHeroSection } from "./components/ExperiencesHero";
import { BentoSection } from "./components/BentoSection";
import { BusinessPackageHero } from "./components/BusinessPackageHero";
import { EventPackagesSection } from "./components/EventPackagesSection";
import { ServicesSection } from "./components/ServicesSection";
import { KeepInTouchCTA } from "./components/KeepInTouchCTA";

export default function page() {
  return (
    <PageLayout>
      <ExperiencesHeroSection />
      <BentoSection></BentoSection>
      <BusinessPackageHero></BusinessPackageHero>
      <EventPackagesSection></EventPackagesSection>
      <ServicesSection></ServicesSection>
      <KeepInTouchCTA></KeepInTouchCTA>
    </PageLayout>
  );
}
