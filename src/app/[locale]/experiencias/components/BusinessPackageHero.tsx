import { BedDouble, Users, Utensils, Wifi } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';

export const BusinessPackageHero = () => {
    const t = useTranslations('IndexPageExperiences');

    const features = [
        {
            text: t('businessPackageSection.details.item1'),
            icon: BedDouble,
        },
        {
            text: t('businessPackageSection.details.item2'),
            icon: Wifi,
        },
        {
            text: t('businessPackageSection.details.item3'),
            icon: Users,
        },
        {
            text: t('businessPackageSection.details.item4'),
            icon: Utensils,
        },
    ];
    return (
        <SectionWrapper
            imageProps={{
                src: '/experiences/BusinessPackageWomanBooking.webp',
                alt: 'BusinessPackageWomanBooking',
                quality: 100,
                fill: true,
                className:
                    'object-top-right lg:object-cover object-cover scale-200 lg:scale-100',
                priority: false,
                loading: 'eager',
                placeholder: 'blur',
                blurDataURL: '/experiences/BusinessPackageWomanBooking.webp',
                unoptimized: true,
            }}
            className="h-fit flex justify-end pt-24 pb-48 lg:py-44"
        >
            <div className="flex flex-col items-center justify-center gap-6 sm:w-8/12 md:w-5/12 lg:w-5/12 lg:p-4 lg:backdrop-blur-lg lg:bg-background/50 xl:bg-background/0 xl:backdrop-blur-none xl:p-0">
                <SectionHeader
                    className="mb-6"
                    headerTitle={{
                        text: t('businessPackageSection.title').toUpperCase(),
                    }}
                    description={{
                        text: t('businessPackageSection.caption'),
                    }}
                    alignment="left"
                ></SectionHeader>
                <p className="text-pretty text-p1 text-start w-full text-secondary dark:text-secondary-foreground">
                    {t('businessPackageSection.description')}
                </p>
                <ul className="w-full space-y-4 ">
                    {features.map((feature, index) => (
                        <li
                            key={index}
                            className="flex items-center gap-2 text-secondary dark:text-secondary-foreground "
                        >
                            <feature.icon className="text-secondary size-6 stroke-1" />
                            <span className="text-p1 truncate font-medium text-wrap">
                                {feature.text}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </SectionWrapper>
    );
};
