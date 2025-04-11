import { BaseHeroWrapper } from "@/components/layout/hero/base-hero";
import { TextEffect } from "@/components/ui/text-effect";
import React from "react";

export const ExperiencesHeroSection = () => {
  return (
    <section>
      <BaseHeroWrapper>
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="text-balance text-h4 sm:text-h3 md:text-h3 lg:text-h2 xl:text-h1 font-h1"
        >
          Experiencias
        </TextEffect>
        {/* <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mx-auto mt-12 max-w-2xl text-pretty text-lg"
        >
          Tailwindcss highly customizable components for building modern
          websites and applications that look and feel the way you mean it.
        </TextEffect> */}
      </BaseHeroWrapper>
    </section>
  );
};
