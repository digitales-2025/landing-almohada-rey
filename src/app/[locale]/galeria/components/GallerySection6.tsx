'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection6 = () => {
    const t = useTranslations('IndexPageGallery.sections.section6');

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center">
                    {/* Imagen grande a la izquierda */}
                    <div className="relative h-[400px] md:h-[600px] w-full">
                        <Image
                            src="/gallery/seccion6/ImgLateralIzquierdo.jpg"
                            alt={t('imageAlt1')}
                            fill
                            className="object-cover rounded-md"
                            quality={95}
                            priority
                        />
                    </div>

                    {/* Columna derecha con dos imágenes y título */}
                    <div className="flex flex-col space-y-4">
                        {/* Imagen superior derecha */}
                        <div className="relative h-[200px] md:h-[250px] w-full">
                            <Image
                                src="/gallery/seccion6/ImgLateralDerechoSuperior.jpg"
                                alt={t('imageAlt2')}
                                fill
                                className="object-cover rounded-md"
                                quality={95}
                            />
                        </div>

                        {/* Imagen inferior derecha */}
                        <div className="relative h-[200px] md:h-[250px] w-full">
                            <Image
                                src="/gallery/seccion6/ImgLateralDerechoInferior.png"
                                alt={t('imageAlt3')}
                                fill
                                className="object-cover rounded-md"
                                quality={95}
                            />
                        </div>

                        {/* Título grande */}
                        <div className="pt-4 md:pt-8 text-right">
                            <h3 className="text-2xl md:text-3xl font-serif text-secondary dark:text-secondary-foreground">
                                {t('subtitle')}
                            </h3>
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
