'use client';

import { useTranslations } from 'next-intl';

import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
import { TextEffect } from '@/components/ui/text-effect';

export const GalleryHero = () => {
    const t = useTranslations('IndexPageGallery');
    return (
        <section>
            <BaseHeroWrapper
                image={{
                    src: '/gallery/header/ImgHeader.jpg',
                    alt: 'Gallery Hero Image',
                    quality: 100,
                    placeholder: 'blur',
                    blurDataURL: '/gallery/header/imgHead.jpg',
                    unoptimized: true,
                }}
            >
                <div className="w-full animate-fade">
                    <BreadcrumbNav className="mx-auto w-fit"></BreadcrumbNav>
                </div>
                <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="text-balance text-h5 sm:text-h3 md:text-h3 lg:text-h2 xl:text-h1 text-background font-h1 truncate"
                >
                    {t('title').toUpperCase()}
                </TextEffect>
            </BaseHeroWrapper>
        </section>
    );
};
