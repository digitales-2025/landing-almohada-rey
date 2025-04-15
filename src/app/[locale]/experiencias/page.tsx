import { PageLayout } from "@/components/layout/PageLayout";
import React from "react";
import { ExperiencesHeroSection } from "./components/ExperiencesHero";
import { BentoSection } from "./components/BentoSection";
import { BusinessPackageHero } from "./components/BusinessPackageHero";
import { EventPackagesSection } from "./components/EventPackagesSection";
import { ServicesSection } from "./components/ServicesSection";
import { KeepInTouchCTA } from "./components/KeepInTouchCTA";
import { ConferenceHallSection } from "./components/ConferenceHallSection";

export default function page() {
  return (
    <PageLayout>
      <ExperiencesHeroSection />
      <BentoSection></BentoSection>
      <BusinessPackageHero></BusinessPackageHero>
      <EventPackagesSection></EventPackagesSection>
      <ConferenceHallSection></ConferenceHallSection>
      <ServicesSection></ServicesSection>
      <KeepInTouchCTA></KeepInTouchCTA>
    </PageLayout>
  );
}
