/* eslint-disable @next/next/no-img-element */

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection2 = () => {
    const t = useTranslations('IndexPageGallery.sections.section2');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
                    <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4">
                        <h2 className="text-h5 md:text-h4 lg:text-h4 xl:text-h3 2xl:text-[8rem] 3xl:text-h1 font-serif text-secondary dark:text-secondary-foreground lg:pb-4">
                            {t('title')}
                        </h2>
                        <p className="text-base md:text-lg text-secondary/80 dark:text-secondary-foreground/80 w-full">
                            {t('description')}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 relative flex items-center">
                        <div className="w-full h-full overflow-hidden">
                            <img
                                src="/gallery/seccion2/ImgMeson.webp"
                                alt={'Mesón'}
                                className="object-cover w-full h-full 2xl:object-left"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
