import React from 'react';
import { useTranslations } from 'next-intl';

import { OnlyMobileLogo } from '@/components/layout/logo';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { Button } from '@/components/ui/button';

export const SafeHostSection = () => {
    const t = useTranslations('IndexPage');
    return (
        <SectionWrapper>
            <div className="space-y-6 md:space-y-8 lg:space-y-10 lg:px-10 overflow-clip flex flex-col items-center">
                <div className="text-primary flex justify-center">
                    <OnlyMobileLogo></OnlyMobileLogo>
                </div>
                <header>
                    <h2
                        className="text-center text-pretty text-h6
                    sm:text-h4 md:text-h5 lg:text-h3  font-h3 text-secondary leading-10 md:leading-14 lg:leading-18 dark:text-secondary-foreground"
                    >
                        {t('safeHostSection.title').toUpperCase()}
                    </h2>
                </header>
                <figure className="w-full flex justify-center ">
                    <img
                        src="/home/TerracePhoto.webp"
                        className="max-w-[880px] w-full aspect-21/9 object-cover object-top-right md:object-top"
                        alt="TerracePhoto"
                    />
                </figure>
                <p className="text-balance text-p1 w-full text-secondary dark:text-secondary-foreground text-center lg:text-xl font-light">
                    {t('safeHostSection.description')}
                </p>
                <Button variant={'link'} className="lg:text-xl text-secondary">
                    {t('safeHostSection.ctaButton.label')}
                </Button>
            </div>
        </SectionWrapper>
    );
};
