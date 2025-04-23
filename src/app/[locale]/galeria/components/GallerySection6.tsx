/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection6 = () => {
    const t = useTranslations('IndexPageGallery.sections.section6');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Imagen grande a la izquierda (doble de altura) */}
                    <div className="relative h-[800px] md:h-[1200px] w-full">
                        <img
                            src="/gallery/seccion6/ImgLateralIzquierdo.webp"
                            alt={t('imageAlt1')}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Columna derecha con dos imágenes y título */}
                    <div className="flex flex-col lg:h-[800px] md:h-[1200px] lg:justify-between">
                        {/* Contenedor de imágenes */}
                        <div className="space-y-4 sm:space-y-6 md:space-y-8 lg:flex-grow">
                            {/* Imagen superior derecha */}
                            <div className="relative h-[320px] md:h-[480px] w-full">
                                <img
                                    src="/gallery/seccion6/ImgLateralDerechoSuperior.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior derecha */}
                            <div className="relative h-[320px] md:h-[480px] w-full">
                                <img
                                    src="/gallery/seccion6/ImgLateralDerechoInferior.webp"
                                    alt={t('imageAlt3')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Versión móvil: título y subtítulo en línea única */}
                        <div className="mt-4 block md:hidden text-right pb-4">
                            <h2 className="text-h5 font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')} {t('title')}
                            </h2>
                        </div>

                        {/* Versión desktop: título y subtítulo separados */}
                        <div className="mt-auto hidden md:block text-right pb-4">
                            <h3 className="text-h5 md:text-h4 lg:text-h4 font-serif text-secondary dark:text-secondary-foreground line-clamp-1">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-h3 lg:text-h2 xl:text-h1 2xl:text-h1 font-serif text-secondary dark:text-secondary-foreground line-clamp-2">
                                {t('title')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
