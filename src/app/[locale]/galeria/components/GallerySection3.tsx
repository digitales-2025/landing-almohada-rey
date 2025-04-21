'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection3 = () => {
    const t = useTranslations('IndexPageGallery.sections.section3');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                    {/* Imagen grande a la izquierda */}
                    <div className="relative h-[300px] md:h-[500px] w-full">
                        <Image
                            src="/gallery/seccion3/ImgLateralIzquierda.jpg"
                            alt={t('imageAlt1')}
                            fill
                            className="object-cover rounded-md"
                            quality={95}
                            priority
                        />
                    </div>

                    {/* Columna derecha con dos imágenes y título */}
                    <div className="flex flex-col space-y-4">
                        {/* Imagen superior derecha */}
                        <div className="relative h-[200px] w-full">
                            <Image
                                src="/gallery/seccion3/ImgLateralDerechoSuperior.jpg"
                                alt={t('imageAlt2')}
                                fill
                                className="object-cover rounded-md"
                                quality={95}
                            />
                        </div>

                        {/* Imagen inferior derecha */}
                        <div className="relative h-[200px] w-full">
                            <Image
                                src="/gallery/seccion3/ImgLateralDerechoInferior.jpg"
                                alt={t('imageAlt3')}
                                fill
                                className="object-cover rounded-md"
                                quality={95}
                            />
                        </div>

                        {/* Título grande */}
                        <div className="pt-4 md:pt-8">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
