'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection5 = () => {
    const t = useTranslations('IndexPageGallery.sections.section5');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="flex flex-col items-center">
                    {/* Imagen panorámica grande */}
                    <div className="relative w-full aspect-[16/9] mb-8 md:mb-10 overflow-hidden shadow-md">
                        <Image
                            src="/gallery/seccion5/ImgLiving.jpg"
                            alt={t('imageAlt')}
                            fill
                            className="object-cover"
                            quality={95}
                            priority
                        />
                    </div>

                    {/* Título grande centrado */}
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-secondary dark:text-secondary-foreground">
                            {t('title')}
                        </h2>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
