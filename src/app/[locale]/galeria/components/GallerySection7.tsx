/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection7 = () => {
    const t = useTranslations('IndexPageGallery.sections.section7');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="flex flex-col gap-6">
                    {/* Imagen grande superior (aumentada otro cuarto) */}
                    <div className="relative w-full h-[560px] md:h-[750px] lg:h-[940px] overflow-hidden rounded-md">
                        <img
                            src="/gallery/seccion7/ImgSuperior.webp"
                            alt={t('imageAlt1')}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Contenedor para título e imágenes inferiores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                        {/* Título a la izquierda (aumentado) */}
                        <div className="space-y-3">
                            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif text-secondary dark:text-secondary-foreground leading-tight">
                                {t('title')}
                            </h2>
                        </div>

                        {/* Imágenes inferiores a la derecha */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {/* Imagen inferior izquierda */}
                            <div className="relative h-[190px] md:h-[250px] lg:h-[315px] w-full overflow-hidden rounded-md">
                                <img
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior derecha */}
                            <div className="relative h-[190px] md:h-[250px] lg:h-[315px] w-full overflow-hidden rounded-md">
                                <img
                                    src="/gallery/seccion7/ImgInferiorDerecho.webp"
                                    alt={t('imageAlt3')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
