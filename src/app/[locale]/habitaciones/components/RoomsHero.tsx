import { useTranslations } from 'next-intl';

import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
import { TextEffect } from '@/components/ui/text-effect';

export const RoomsHeroSection = () => {
    const t = useTranslations('IndexPageRooms');
    return (
        <section>
            <BaseHeroWrapper
                image={{
                    src: '/rooms/rooms_placeholder.webp',
                    alt: 'Experiencias Hero Image',
                    quality: 100,
                    placeholder: 'blur',
                    blurDataURL: '/rooms/rooms_placeholder.webp',
                    unoptimized: true,
                }}
                gradientEffectClassname="from-black/30 to-black/90"
            >
                <div className="w-full animate-fade">
                    <BreadcrumbNav className="mx-auto w-fit"></BreadcrumbNav>
                </div>
                <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="text-balance text-h5 sm:text-h3 md:text-h3 lg:text-[8rem] xl:text-[9rem] 2xl:text-h1 text-background font-h1 truncate"
                >
                    {t('title').toUpperCase()}
                </TextEffect>
            </BaseHeroWrapper>
        </section>
    );
};
