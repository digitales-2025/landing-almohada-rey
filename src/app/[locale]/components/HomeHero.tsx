import { BaseHeroWrapper } from "@/components/layout/hero/base-hero";
import { TextEffect } from "@/components/ui/text-effect";

export const HomeHeroSection = () => {
  return (
    <section>
      <BaseHeroWrapper image={{
        src: "https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        alt: "Hero Image",
        quality: 100,
        placeholder: "blur",
        blurDataURL:
          "https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      }}>
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="text-balance text-4xl font-medium sm:text-5xl md:text-6xl"
        >
          Your gateway to endless entertainment experiences
        </TextEffect>
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.5}
          as="p"
          className="mx-auto mt-12 max-w-2xl text-pretty text-lg"
        >
          Tailwindcss highly customizable components for building modern
          websites and applications that look and feel the way you mean it.
        </TextEffect>
      </BaseHeroWrapper>
    </section>
  );
};
