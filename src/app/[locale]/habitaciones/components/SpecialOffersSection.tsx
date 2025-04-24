import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import {
    sectionVerticalSpacing,
    SectionWrapper,
} from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { BentoCard, BentoCardProps } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';

export const SpecialOffersSection = () => {
    const t = useTranslations('IndexPageRooms.offersSection');

    const imageClassnames = 'object-cover aspect-3/2 sm:aspect-493/548 ';
    const features: BentoCardProps[] = [
        {
            cardTitle: {
                text: t('card1.title'),
            },
            name: 'card1',
            description: t('card1.description'),
            href: t('card1.ctaButton.link'),
            cta: t('card1.ctaButton.label'),
            background: (
                <img
                    src="/experiences/WomanPackingLuggage.webp"
                    alt="WomanPackingLuggage"
                    className={imageClassnames}
                />
            ),
            className: 'col-span-1',
        },
        {
            cardTitle: {
                text: t('card2.title'),
            },
            name: 'card2',
            description: t('card2.description'),
            href: t('card2.ctaButton.link'),
            cta: t('card1.ctaButton.label'),
            background: (
                <img
                    src="/rooms/offers_section/honeymoon_champagne.webp"
                    alt="honeymoon_champagne"
                    className={imageClassnames}
                />
            ),
            className: 'col-span-1',
        },
        {
            cardTitle: {
                text: t('card3.title'),
            },
            name: 'card3',
            description: t('card3.description'),
            href: t('card1.ctaButton.link'),
            cta: t('card1.ctaButton.label'),
            background: (
                <img
                    src="/experiences/MomAndSonHosts.webp"
                    alt="MomAndSonHosts"
                    className={imageClassnames}
                />
            ),
            className: 'col-span-1',
        },
    ];
    return (
        <SectionWrapper>
            <div className="absolute w-full inset-0 flex flex-col flex-grow h-full">
                <div className="basis-1/5 sm:basis-1/2 max-h-full w-full bg-secondary relative overflow-clip">
                    <img
                        src="/Background_Pattern.png"
                        alt="background pattern"
                        className="absolute inset-0 w-full h-full object-cover opacity-10"
                    />
                </div>
                <div className="basis-1/2 w-full"></div>
            </div>
            <div
                className={cn(
                    sectionLayoutClassnames,
                    sectionVerticalSpacing,
                    'relative z-10'
                )}
            >
                <SectionHeader
                    headerTitle={{
                        text: t('title').toUpperCase(),
                    }}
                    description={{
                        text: t('description'),
                        className: 'text-primary-foreground',
                    }}
                ></SectionHeader>

                <div className=" grid auto-rows-auto gap-6 md:gap-4 xl:gap-6 grid-cols-1 sm:grid-cols-3 xl:grid-cols-3 lg:pt-0 h-fit">
                    {features.map(feature => (
                        <BentoCard
                            key={feature.name}
                            {...feature}
                            className={cn(feature.className, 'h-fit')}
                            figureClassName="min-h-full"
                        />
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
};
