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
                            alt="frachada holel lateral"
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Columna derecha con dos imágenes y título */}
                    <div className="flex flex-col h-[800px] md:h-[1200px] justify-between">
                        {/* Contenedor de imágenes */}
                        <div className="space-y-6 md:space-y-8 flex-grow">
                            {/* Imagen superior derecha */}
                            <div className="relative h-[320px] md:h-[480px] w-full">
                                <img
                                    src="/gallery/seccion6/ImgLateralDerechoSuperior.webp"
                                    alt="fachada hotel defrente"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior derecha */}
                            <div className="relative h-[320px] md:h-[480px] w-full">
                                <img
                                    src="/gallery/seccion6/ImgLateralDerechoInferior.webp"
                                    alt=" fachada hotel defrente"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Título grande */}
                        <div className="mt-auto text-right pb-4">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
