/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection4 = () => {
    const t = useTranslations('IndexPageGallery.sections.section4');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Columna izquierda con dos imágenes y título */}
                    <div className="flex flex-col min-h-[400px] md:min-h-[700px] justify-between">
                        {/* Contenedor de imágenes */}
                        <div className="space-y-4 flex-shrink-0">
                            {/* Imagen superior izquierda */}
                            <div className="relative aspect-[16/9] md:aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoSuperior.webp"
                                    alt={t('imageAlt1')}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior izquierda */}
                            <div className="relative aspect-[16/9] md:aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoInferior.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Versión móvil: título y descripción en línea única */}
                        <div className="mt-6 block md:hidden pb-4">
                            <h2 className="text-h5 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')} {t('description')}
                            </h2>
                        </div>

                        {/* Versión desktop: título y descripción separados */}
                        <div className="mt-6 hidden md:block pb-4">
                            <h3 className="text-h5 md:text-h4 lg:text-h4 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h3>
                            <h2 className="text-h3 lg:text-h2 xl:text-h1 font-serif text-secondary dark:text-secondary-foreground">
                                {t('description')}
                            </h2>
                        </div>
                    </div>

                    {/* Imagen grande a la derecha con altura adaptable */}
                    <div className="relative aspect-[3/4] md:aspect-[3/5] w-full">
                        <img
                            src="/gallery/seccion4/ImgLateralDerecho.webp"
                            alt={t('imageAlt3')}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
