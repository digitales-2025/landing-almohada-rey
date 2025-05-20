import { useTranslations } from 'next-intl';

import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
import { TextEffect } from '@/components/ui/text-effect';

export const TravelerHero = () => {
    const t = useTranslations('IndexPageTravelers');
    return (
        <section className="overflow-hidden">
            <BaseHeroWrapper
                image={{
                    src: '/traveler/header/ImgHeader.webp',
                    alt: 'Gallery Hero Image',
                    quality: 100,
                    placeholder: 'blur',
                    blurDataURL: '/traveler/header/imgHeader.webp',
                    unoptimized: true,
                }}
                className="image-zoom-effect"
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
            </BaseHeroWrapper>
        </section>
    );
};
