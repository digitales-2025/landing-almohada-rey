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
                    <div className="flex flex-col h-[400px] md:h-[700px] justify-between">
                        {/* Contenedor de imágenes */}
                        <div className="space-y-4 flex-grow">
                            {/* Imagen superior izquierda */}
                            <div className="relative h-[160px] md:h-[280px] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoSuperior.webp"
                                    alt="camas lamparas y cabezera"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior izquierda */}
                            <div className="relative h-[160px] md:h-[280px] w-full">
                                <img
                                    src="/gallery/seccion4/ImgLateralIzquierdoInferior.webp"
                                    alt="baranda interior"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Título grande alineado con la parte inferior */}
                        <div className="mt-auto">
                            <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h2>
                        </div>
                    </div>

                    {/* Imagen grande a la derecha */}
                    <div className="relative h-[400px] md:h-[700px] w-full">
                        <img
                            src="/gallery/seccion4/ImgLateralDerecho.webp"
                            alt="habitacion cama y lampara"
                            className="object-cover w-full h-full"
                        />
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
