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
                    <div className="relative w-full min-h-fit md:min-h-[600px] lg:min-h-[750px] overflow-hidden ">
                        <img
                            src="/gallery/seccion7/ImgSuperior.webp"
                            alt={t('imageAlt1')}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Estructura para desktop (2 columnas con título e imágenes) - oculto en móvil */}
                    <div className="hidden md:grid md:grid-cols-2 gap-8 items-start grid-flow-row auto-rows-min">
                        {/* Título a la izquierda solo visible en desktop */}
                        <div className="space-y-3 pt-2">
                            <h3 className="text-h5 md:text-h4 lg:text-h4 font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-h3 lg:text-h2 xl:text-h2 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h2>
                        </div>

                        {/* Imágenes inferiores solo para desktop */}
                        <div className="grid grid-cols-2 gap-6 grid-flow-row auto-rows-min">
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <img
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="relative aspect-[4/3] w-full overflow-hidden">
                                <img
                                    src="/gallery/seccion7/ImgInferiorDerecho.webp"
                                    alt={t('imageAlt3')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Estructura solo para móvil - sin espacios vacíos */}
                    <div className="block md:hidden">
                        {/* Solo imágenes en grid - sin div para título */}
                        <div className="grid grid-cols-2 gap-4 grid-flow-row auto-rows-min">
                            <div className="relative aspect-[4/3] w-full overflow-hidden ">
                                <img
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="relative aspect-[4/3] w-full overflow-hidden ">
                                <img
                                    src="/gallery/seccion7/ImgInferiorDerecho.webp"
                                    alt={t('imageAlt3')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Título al final para móvil */}
                        <div className="mt-4">
                            <h2 className="text-h5 font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')} {t('title')}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
