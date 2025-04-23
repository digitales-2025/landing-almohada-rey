/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection7 = () => {
    const t = useTranslations('IndexPageGallery.sections.section7');

    return (
        <SectionWrapper className="md:py-8 lg:py-12">
            <div className="container mx-auto">
                <div className="flex flex-col gap-4 md:gap-5 lg:gap-6">
                    {/* Imagen grande superior */}
                    <div className="relative w-full h-[400px] md:h-[520px] lg:h-[750px] overflow-hidden">
                        <img
                            src="/gallery/seccion7/ImgSuperior.webp"
                            alt={t('imageAlt1')}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Estructura para tablet/desktop */}
                    <div className="hidden md:grid md:grid-cols-2 gap-3 md:gap-4 lg:gap-8 items-start">
                        {/* Título a la izquierda */}
                        <div className="md:space-y-2 lg:space-y-3">
                            <h3 className="text-h5 md:text-h5 lg:text-h4 font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-h4 md:text-h4 lg:text-h2 xl:text-h2 font-serif text-secondary dark:text-secondary-foreground">
                                {t('title')}
                            </h2>
                        </div>

                        {/* Imágenes inferiores */}
                        <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-6">
                            <div className="relative h-[150px] md:h-[180px] lg:h-[220px] w-full overflow-hidden">
                                <img
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="relative h-[150px] md:h-[180px] lg:h-[220px] w-full overflow-hidden">
                                <img
                                    src="/gallery/seccion7/ImgInferiorDerecho.webp"
                                    alt={t('imageAlt3')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Estructura solo para móvil */}
                    <div className="block md:hidden">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="relative h-[150px] w-full overflow-hidden">
                                <img
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.webp"
                                    alt={t('imageAlt2')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="relative h-[150px] w-full overflow-hidden">
                                <img
                                    src="/gallery/seccion7/ImgInferiorDerecho.webp"
                                    alt={t('imageAlt3')}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                        <div className="mt-3">
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
