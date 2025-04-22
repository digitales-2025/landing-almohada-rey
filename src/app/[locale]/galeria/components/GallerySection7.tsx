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
                    <div className="relative w-full min-h-[450px] md:min-h-[600px] lg:min-h-[750px] overflow-hidden rounded-md">
                        <img
                            src="/gallery/seccion7/ImgSuperior.webp"
                            alt={t('imageAlt1')}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Contenedor para título e imágenes inferiores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
                        {/* Título a la izquierda - versión móvil */}
                        <div className="space-y-3 block md:hidden">
                            <h2 className="text-h5 font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')} {t('title')}
                            </h2>
                        </div>

                        {/* Título a la izquierda - versión desktop */}
                        <div className="space-y-3 hidden md:block">
                            <h3 className="text-h5 md:text-h4 lg:text-h4 font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-h3 lg:text-h2 xl:text-h1 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h2>
                        </div>

                        {/* Imágenes inferiores a la derecha */}
                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                            {/* Imagen inferior izquierda */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden ">
                                <img
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Imagen inferior derecha */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden ">
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
