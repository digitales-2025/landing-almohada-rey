/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection4 = () => {
    const t = useTranslations('IndexPageGallery.sections.section4');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                {/* Layout para pantallas grandes (desktop) */}
                <div className="hidden lg:grid lg:grid-cols-2 gap-6">
                    {/* Columna izquierda con dos imágenes y título */}
                    <div className="flex flex-col h-full justify-between">
                        {/* Contenedor de imágenes */}
                        <div className="space-y-4">
                            {/* Imagen superior izquierda */}
                            <div className="relative aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoSuperior.webp"
                                    alt={t('imageAlt1')}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior izquierda */}
                            <div className="relative aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoInferior.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Versión desktop: título y descripción separados */}
                        <div className="mt-4">
                            <h3 className="text-h4 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h3>
                            <h2 className="text-h2  3xl:text-h1 xl:text-[8rem] font-serif text-secondary dark:text-secondary-foreground truncate">
                                {t('description')}
                            </h2>
                        </div>
                    </div>

                    {/* Imagen grande a la derecha */}
                    <div className="relative aspect-[3/5] w-full">
                        <img
                            src="/gallery/seccion4/ImgLateralDerecho.webp"
                            alt={t('imageAlt3')}
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Layout para móvil y tablet (imágenes seguidas por texto) */}
                <div className="block lg:hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* En tablet, las imágenes izquierdas se apilan */}
                        <div className="space-y-4">
                            <div className="relative aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoSuperior.webp"
                                    alt={t('imageAlt1')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="relative aspect-[16/9] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoInferior.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Imagen derecha */}
                        <div className="relative aspect-[3/4] md:aspect-[3/4.5] w-full">
                            <img
                                src="/gallery/seccion4/ImgLateralDerecho.webp"
                                alt={t('imageAlt3')}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* Título y descripción después de las imágenes para móvil y tablet */}
                    <div className="mt-4">
                        {/* Versión móvil */}
                        <div className="block md:hidden">
                            <h2 className="text-h5 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')} {t('description')}
                            </h2>
                        </div>
                        {/* Versión tablet */}
                        <div className="hidden md:block lg:hidden">
                            <h3 className="text-h5 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h3>
                            <h2 className="text-h4 font-serif text-secondary dark:text-secondary-foreground">
                                {t('description')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
