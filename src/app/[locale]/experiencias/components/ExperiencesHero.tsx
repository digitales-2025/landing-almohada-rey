import { useTranslations } from 'next-intl';

import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
import { TextEffect } from '@/components/ui/text-effect';

export const ExperiencesHeroSection = () => {
    const t = useTranslations('IndexPageExperiences');
    return (
        <section>
            <BaseHeroWrapper
                image={{
                    src: 'https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    alt: 'Experiencias Hero Image',
                    quality: 100,
                    placeholder: 'blur',
                    blurDataURL:
                        'https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    unoptimized: true,
                }}
            >
                <div className="w-full animate-fade">
                    <BreadcrumbNav className="mx-auto w-fit"></BreadcrumbNav>
                </div>
                <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="text-balance text-h5 sm:text-h3 md:text-h3 lg:text-h2 xl:text-h1 text-background font-h1 truncate"
                >
                    {t('title').toUpperCase()}
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
