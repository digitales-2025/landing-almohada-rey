import React from 'react';
import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export const GallerySection = () => {
    const t = useTranslations('IndexPage.gallerySection');
    return (
        <SectionWrapper className={sectionLayoutClassnames}>
            <div className="grid grid-flow-row auto-rows-min grid-cols-[minmax(0,0.33fr)_minmax(0,1.66fr)_minmax(0,1.66fr)_minmax(0,0.33fr)] lg:grid-cols-[minmax(0,1.66fr)_minmax(0,0.08fr)_minmax(0,0.33fr)_minmax(0,1.66fr)] gap-4 lg:gap-6">
                <div className="row-start-1 col-start-1 col-span-3 row-span-1 lg:row-start-1 lg:col-start-1 lg:col-span-2 lg:row-span-2">
                    <SectionHeader
                        headerTitle={{
                            text: t('title').toUpperCase(),
                        }}
                        description={{
                            text: t('caption'),
                            className:
                                '!text-h3 !leading-18 sm:!text-h3 sm:!leading-18 md:!text-[5.9rem] md:!leading-24  lg:!text-h2 lg:!leading-36 xl:!text-h1 xl:!leading-40',
                        }}
                        blockClassName="mx-0 py-4"
                        alignment="left"
                    ></SectionHeader>
                </div>
                <div className="row-span-1 row-start-3 col-start-1 col-span-3 lg:row-span-2 lg:row-start-3 lg:col-start-1 lg:col-span-1">
                    <img
                        src="/home/gallery/home_gallery_section_1.webp"
                        alt="Gallery Image 1"
                        className="w-full max-h-[180px] md:max-h-[280px] lg:max-h-full lg:h-full object-cover col-span-2 row-span-2"
                    />
                </div>
                <div className="row-span-1 row-start-2 col-start-2 col-span-3 lg:row-span-3 lg:row-start-1 lg:col-start-4 lg:col-span-1">
                    <img
                        src="/home/gallery/home_gallery_section_2.webp"
                        alt="Gallery Image 2"
                        className="w-full max-h-[180px] md:max-h-[280px] lg:max-h-full lg:h-full object-cover"
                    />
                </div>
                <div className="row-span-1 row-start-4 col-start-2 col-span-3 lg:row-span-1 lg:row-start-4 lg:col-start-3 lg:col-span-2 py-0 lg:py-20 space-y-2">
                    <p className="text-base lg:text-p lg:tracking-normal">
                        {t('description')}
                    </p>
                    <Link
                        className={cn(
                            buttonVariants({
                                variant: 'link',
                                size: 'lg',
                            }),
                            'text-primary px-0 mx-0 text-base lg:text-p lg:tracking-normal'
                        )}
                        href={t('ctaButton.link')}
                    >
                        {t('ctaButton.label')}
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    );
};
