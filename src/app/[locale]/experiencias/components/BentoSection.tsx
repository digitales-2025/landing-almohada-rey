import React from 'react';
import { BentoCard, BentoCardProps, BentoGrid } from '@/components/ui/bento-grid';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { CakeSlice, Users, UtensilsCrossed } from 'lucide-react';

export const BentoSection = () => {
    const t = useTranslations('IndexPageExperiences');

    const features: BentoCardProps[] = [
        {
            cardTitle: {
                text: t('bentoSection.card1.title'),
            },
            name: 'card1',
            description: t('bentoSection.card1.description'),
            href: t('bentoSection.card1.ctaButton.link'),
            cta: t('bentoSection.card1.ctaButton.label'),
            background: <Image
            src="/experiences/WomanPackingLuggage.webp"
            alt="WomanPackingLuggage"
            quality={100}
            fill
            className="object-cover"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL='/experiences/WomanPackingLuggage.webp'
            unoptimized
        />,
            className: 'lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3',
        },
        {
            cardTitle: {
                text: t('bentoSection.card2.title'),
            },
            name: 'card2',
            description: t('bentoSection.card2.description'),
            href: t('bentoSection.card2.ctaButton.link'),
            cta: t('bentoSection.card2.ctaButton.label'),
            background: <Image
            src="/experiences/RelaxDrinkingLatte.webp"
            alt="RelaxDrinkingLatte"
            quality={100}
            fill
            className="object-cover object-top"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL='/experiences/RelaxDrinkingLatte.webp'
            unoptimized
        />,
            className: 'lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-5',
        },
        {
            cardTitle: {
                text: t('bentoSection.card3.title'),
            },
            name: 'card3',
            description: t('bentoSection.card3.description'),
            href: t('bentoSection.card3.ctaButton.link'),
            cta: t('bentoSection.card3.ctaButton.label').toUpperCase(),
            details: [
                {
                    Icon: Users,
                    caption: t('bentoSection.card3.details.item1'),
                },
                {
                    Icon: UtensilsCrossed,
                    caption: t('bentoSection.card3.details.item2'),
                },
                {
                    Icon: CakeSlice,
                    caption: t('bentoSection.card3.details.item3'),
                },
            ],
            pricing:{
                caption: t('bentoSection.card3.pricing.label'),
                price: isNaN(Number(t('bentoSection.card3.pricing.price'))) ? t('bentoSection.card3.pricing.price') : Number(t('bentoSection.card3.pricing.price')).toLocaleString(undefined, {
                    style: 'currency',
                    currency: t('bentoSection.card3.pricing.currency'),
                    maximumFractionDigits: 2,
                }),
                currency: t('bentoSection.card3.pricing.currency'),
                sufix: t('bentoSection.card3.pricing.sufix'),
            },
            background: <Image
            src="/experiences/RomanticSuite.webp"
            alt="RomanticSuite"
            quality={100}
            fill
            className="object-cover"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL='/experiences/RomanticSuite.webp'
            unoptimized
        />,
            className: 'row-span-2 lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-4',
        },
        {
            cardTitle: {
                text: t('bentoSection.card4.title'),
            },
            name: 'card4',
            description: t('bentoSection.card4.description'),
            href: t('bentoSection.card4.ctaButton.link'),
            cta: t('bentoSection.card4.ctaButton.label'),
            background: <Image
            src="/experiences/MainSquareCathedral.webp"
            alt="MainSquareCathedral"
            quality={100}
            fill
            className="object-cover"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL='/experiences/MainSquareCathedral.webp'
            unoptimized
        />,
            className: 'lg:col-start-2 lg:col-end-2 lg:row-start-3 lg:row-end-5',
        },
        {
            cardTitle: {
                text: t('bentoSection.card5.title'),
            },
            name: 'card5',
            description: t('bentoSection.card5.description'),
            href: t('bentoSection.card5.ctaButton.link'),
            cta: t('bentoSection.card5.ctaButton.label'),
            background: <Image
            src="/experiences/MomAndSonHosts.webp"
            alt="MomAndSonHosts"
            quality={100}
            fill
            className="object-cover"
            priority
            loading="eager"
            placeholder="blur"
            blurDataURL='/experiences/MomAndSonHosts.webp'
            unoptimized
        />,
            className: 'lg:col-start-3 lg:col-end-3 lg:row-start-3 lg:row-end-5',
        },
    ];

    return (
        <SectionWrapper>
            <SectionHeader
            className='mb-6'
                headerTitle={{
                    text: t('bentoSection.title').toUpperCase(),
                }}
                description={{
                    text: t('bentoSection.description'),
                }}
            ></SectionHeader>
            {/* <br className='lg:h-0'/> */}
            <BentoGrid className="auto-rows-[20rem]
            grid-rows-[repeat(5, minmax(0, 1fr))]  lg:grid-rows-[repeat(4, minmax(0, 1fr))] gap-6 md:gap-4 xl:gap-6 pt-4 lg:pt-0">
                {features.map(feature => (
                    <BentoCard key={feature.name} {...feature} className={cn(feature.className)} />
                ))}
            </BentoGrid>
        </SectionWrapper>
    );
};
