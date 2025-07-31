import { useTranslations } from 'next-intl';

// import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
import { TextEffect } from '@/components/ui/text-effect';

export const BookingHeroSection = () => {
    const t = useTranslations('IndexPageBooking');
    return (
        <section>
            <BaseHeroWrapper
                className="min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] xl:min-h-[700px] flex items-center justify-center"
                image={{
                    src: '/booking/BookingPlaceholderRingbell.webp',
                    alt: 'Experiencias Hero Image',
                    quality: 100,
                    placeholder: 'blur',
                    blurDataURL: '/booking/BookingPlaceholderRingbell.webp',
                    unoptimized: true,
                    className: 'object-bottom',
                }}
                gradientEffectClassname="from-black/10 to-black/30 object-cover"
            >
                {/* <div className="w-full animate-fade">
                    <BreadcrumbNav className="mx-auto w-fit"></BreadcrumbNav>
                </div> */}
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
