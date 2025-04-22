/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection3 = () => {
    const t = useTranslations('IndexPageGallery.sections.section3');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Imagen grande a la izquierda que ocupa toda la altura */}
                    <div className="relative h-[400px] md:h-[800px] w-full">
                        <img
                            src="/gallery/seccion3/ImgLateralIzquierda.webp"
                            alt="terraza sillas y mesa"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Columna derecha con distribución vertical */}
                    <div className="flex flex-col h-[400px] md:h-[800px]">
                        {/* Contenedor de imágenes */}
                        <div className="space-y-4 flex-grow">
                            {/* Imagen superior derecha */}
                            <div className="relative h-[300px] md:h-[350px] w-full">
                                <img
                                    src="/gallery/seccion3/ImgLateralDerechoSuperior.webp"
                                    alt="terraza sillas y mesa"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior derecha */}
                            <div className="relative h-[300px] md:h-[350px] w-full">
                                <img
                                    src="/gallery/seccion3/ImgLateralDerechoInferior.webp"
                                    alt="terraza sillas y mesa noche"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Título grande alineado con el resto del contenido */}
                        <div className="mt-auto pb-0">
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
