'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection2 = () => {
    const t = useTranslations('IndexPageGallery.sections.section2');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                    <div className="w-full md:w-1/2 space-y-4">
                        <h2 className="text-h5 md:text-h4 lg:text-h4 xl:text-h3 2xl:text-h1 font-serif text-secondary dark:text-secondary-foreground">
                            {t('title')}
                        </h2>
                        <p className="text-base md:text-lg text-secondary/80 dark:text-secondary-foreground/80 max-w-xl">
                            {t('description')}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 relative">
                        <div className="aspect-[4/3] w-full overflow-hidden">
                            <img
                                src="/gallery/seccion2/ImgMeson.jpg"
                                alt={'Mesón'}
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
