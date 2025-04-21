'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection7 = () => {
    const t = useTranslations('IndexPageGallery.sections.section7');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    {/* Imagen grande superior */}
                    <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden rounded-md">
                        <Image
                            src="/gallery/seccion7/ImgSuperior.jpg"
                            alt={t('imageAlt1')}
                            fill
                            className="object-cover"
                            quality={95}
                            priority
                        />
                    </div>

                    {/* Contenedor para título e imágenes inferiores */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        {/* Título a la izquierda */}
                        <div className="space-y-2">
                            <h3 className="text-2xl md:text-3xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif text-secondary dark:text-secondary-foreground leading-tight">
                                {t('title')}
                            </h2>
                        </div>

                        {/* Imágenes inferiores a la derecha */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Imagen inferior izquierda */}
                            <div className="relative h-[150px] md:h-[180px] w-full overflow-hidden rounded-md">
                                <Image
                                    src="/gallery/seccion7/ImgInferiorIzquierdo.jpg"
                                    alt={t('imageAlt2')}
                                    fill
                                    className="object-cover"
                                    quality={95}
                                />
                            </div>

                            {/* Imagen inferior derecha */}
                            <div className="relative h-[150px] md:h-[180px] w-full overflow-hidden rounded-md">
                                <Image
                                    src="/gallery/seccion7/ImgInferiorDerecho.jpg"
                                    alt={t('imageAlt3')}
                                    fill
                                    className="object-cover"
                                    quality={95}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
