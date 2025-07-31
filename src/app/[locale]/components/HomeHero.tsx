import { useTranslations } from 'next-intl';

import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
import { TextEffect } from '@/components/ui/text-effect';

export const HomeHeroSection = () => {
    const t = useTranslations('IndexPage');
    return (
        <section>
            <BaseHeroWrapper
                image={{
                    src: '/home/HomeHeroPhoto.webp',
                    alt: 'Hero Image',
                    quality: 100,
                    placeholder: 'blur',
                    blurDataURL: '/home/HomeHeroPhoto.webp',
                }}
                gradientEffectClassname="from-black/5 to-black/50"
                className="w-full"
            >
                <header className="font-serif text-primary-foreground max-w-[50rem] mx-auto leading-14 sm:leading-18 md:leading-22 lg:leading-28 truncate">
                    <TextEffect
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h1"
                        className="text-balance text-[2rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] truncate"
                    >
                        {t('titleFirstSpan').toUpperCase()}
                    </TextEffect>
                    <TextEffect
                        per="line"
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.5}
                        as="p"
                        className="text-balance text-[3rem] sm:text-[5rem] md:text-[6rem] lg:text-[8rem] truncate"
                    >
                        {t('titleSecondSpan').toUpperCase()}
                    </TextEffect>
                </header>
                <div className="mt-25 text-primary-foreground/80">
                    <TextEffect
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={1}
                        as="p"
                        className="mx-auto mt-12 max-w-2xl text-pretty  text-base md:text-lg"
                    >
                        {t('slogan')}
                    </TextEffect>
                </div>
            </BaseHeroWrapper>
        </section>
    );
};
