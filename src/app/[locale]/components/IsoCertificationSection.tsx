import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { cn } from '@/lib/utils';

export const IsoCertificationSection = () => {
    const t = useTranslations('IndexPage.isoCertificationSection');

    return (
        <SectionWrapper className={cn(sectionLayoutClassnames, 'bg-secondary')}>
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('slogan'),
                    className: 'text-primary-foreground',
                }}
                alignment="center"
            ></SectionHeader>
            <div className="flex justify-center my-8">
                <img
                    src="/home/iso_9001_sign.png"
                    alt="ISO 9001 Certification"
                    className="filter brightness-0 invert w-full max-w-[360px] lg:max-w-[500px]" // Makes it white
                />
            </div>
            <div className="mx-auto flex flex-col items-center space-y-2 lg:space-y-4 max-w-[900px]">
                <span className="text-primary-foreground text-h6  md:text-h5 lg:text-h4 dark:text-secondary-foreground font-serif text-center leading-10 md:leading-14 lg:leading-18">
                    {t('caption')}
                </span>
                <p className="text-balance text-base lg:text-p lg:tracking-normal font-medium text-primary-foreground max-w-[500px] mx-auto">
                    {t('description')}
                </p>
            </div>
        </SectionWrapper>
    );
};
