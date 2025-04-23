import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { cn } from '@/lib/utils';
import { TravelersCarousel } from './travelersSection/travelersCarousel';

export const TravelersSection = () => {
    const t = useTranslations('IndexPage.travelersSection');
    return (
        <SectionWrapper
            className={cn(
                sectionLayoutClassnames,
                'pb-0 sm:pb-0 md:pb-0 lg:pb-0'
            )}
        >
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('caption'),
                }}
                option={{
                    label: t('ctaButton.label'),
                    href: t('ctaButton.link'),
                    className: 'text-primary-foreground',
                }}
                alignment="left"
            ></SectionHeader>
            <TravelersCarousel></TravelersCarousel>
        </SectionWrapper>
    );
};
