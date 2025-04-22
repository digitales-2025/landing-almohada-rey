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
                    {/* Imagen grande superior (altura reducida) */}
                    <div className="relative w-full h-[450px] md:h-[600px] lg:h-[750px] overflow-hidden ">
                        <img
                            src="/gallery/seccion7/ImgSuperior.webp"
                            alt="comedor interior sillas y mesa"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Contenedor para título e imágenes inferiores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                        {/* Título a la izquierda */}
                        <div className="space-y-3">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h2>
                        </div>

                        {/* Imágenes inferiores a la derecha */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {/* Imagen inferior izquierda */}
                            <div className="relative h-[190px] md:h-[250px] lg:h-[315px] w-full overflow-hidden ">
                                <img
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.webp"
                                    alt="desayuno interior sillas y mesa"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior derecha */}
                            <div className="relative h-[190px] md:h-[250px] lg:h-[315px] w-full overflow-hidden ">
                                <img
                                    src="/gallery/seccion7/ImgInferiorDerecho.webp"
                                    alt=" desayuno interior sillas mesas personas "
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
