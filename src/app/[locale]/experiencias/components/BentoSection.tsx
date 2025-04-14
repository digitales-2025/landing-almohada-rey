import React from 'react';
import { BentoCard, BentoCardProps, BentoGrid } from '@/components/ui/bento-grid';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const features: BentoCardProps[] = [
    {
        cardTitle: {
            text: 'Full text search',
        },
        name: 'Full text search',
        description: 'Search through all your files in one place.',
        href: '/',
        cta: 'Learn more',
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
            text: 'Multilingual',
        },
        name: 'Multilingual',
        description: 'Supports 100+ languages and counting.',
        href: '/',
        cta: 'Learn more',
        background: <Image
        src="/experiences/RelaxDrinkingLatte.webp"
        alt="RelaxDrinkingLatte"
        quality={100}
        fill
        className="object-cover"
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
            text: 'File management',
        },
        name: 'Save your files',
        description: 'We automatically save your files as you type.',
        href: '/',
        cta: 'Learn more',
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
        className: 'lg:row-start-1 lg:row-end-3 lg:col-start-2 lg:col-end-4',
    },
    {
        cardTitle: {
            text: 'Calendar',
        },
        name: 'Calendar',
        description: 'Use the calendar to filter your files by date.',
        href: '/',
        cta: 'Learn more',
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
            text: 'Notifications',
        },
        name: 'Notifications',
        description:
            'Get notified when someone shares a file or mentions you in a comment.',
        href: '/',
        cta: 'Learn more',
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

export const BentoSection = () => {
    const t = useTranslations('IndexPageExperiences');

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
            <BentoGrid className="auto-rows-[18rem]  lg:grid-rows-[repeat(4, minmax(0, 1fr))] xl:gap-6">
                {features.map(feature => (
                    <BentoCard key={feature.name} {...feature} className={cn(feature.className, 'border-none !shadow-none rounded-none')} />
                ))}
            </BentoGrid>
        </SectionWrapper>
    );
};
