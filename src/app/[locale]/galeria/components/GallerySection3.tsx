/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection3 = () => {
    const t = useTranslations('IndexPageGallery.sections.section3');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ">
                    {/* Imagen grande a la izquierda que ocupa toda la altura */}
                    <div className="relative min-h-[400px] md:min-h-[800px] w-full">
                        <img
                            src="/gallery/seccion3/ImgLateralIzquierda.webp"
                            alt={t('imageAlt1')}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Columna derecha con distribución vertical */}
                    <div className="flex flex-col min-h-[400px] md:min-h-[800px] justify-between">
                        {/* Contenedor de imágenes con altura máxima definida */}
                        <div className="space-y-4 flex-shrink-0">
                            {/* Imagen superior derecha - altura reducida en móvil */}
                            <div className="relative aspect-[16/10] md:aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion3/ImgLateralDerechoSuperior.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior derecha - altura reducida en móvil */}
                            <div className="relative aspect-[16/10] md:aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion3/ImgLateralDerechoInferior.webp"
                                    alt={t('imageAlt3')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Versión móvil: título y descripción en línea única */}
                        <div className="mt-6 block md:hidden text-right pb-4">
                            <h2 className="text-h5 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')} {t('description')}
                            </h2>
                        </div>

                        {/* Versión desktop: título y descripción separados */}
                        <div className="mt-6 hidden md:block text-right pb-4">
                            <h3 className="text-h5 md:text-h4 lg:text-h4 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h3>
                            <h2 className="text-h3 lg:text-h2 xl:text-h1 font-serif text-secondary dark:text-secondary-foreground">
                                {t('description')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
