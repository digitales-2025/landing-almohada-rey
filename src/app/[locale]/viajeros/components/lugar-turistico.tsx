/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import type {
    Subcategoria,
    TraduccionKey,
} from '@/app/[locale]/viajeros/types/turismo';

interface LugarTuristicoProps {
    lugar: Subcategoria;
    onImageClick: (lugar: Subcategoria, imagenIndex: number) => void;
    isHighlighted?: boolean;
}

export default function LugarTuristico({
    lugar,
    onImageClick,
    isHighlighted = false,
}: LugarTuristicoProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const tPlace = useTranslations('Places');
    const tCategories = useTranslations('Categories');
    const tTouristPlace = useTranslations('TouristPlace');

    // Cambio automático de imágenes
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex === lugar.imagenes.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [lugar.imagenes.length]);

    return (
        <div
            className={`flex flex-col h-full rounded-lg overflow-hidden transition-all duration-500 ${
                isHighlighted ? 'shadow-md' : 'hover:shadow-md'
            }`}
        >
            <div
                className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer"
                onClick={() => onImageClick(lugar, currentImageIndex)}
            >
                <img
                    src={
                        lugar.imagenes[currentImageIndex].url ||
                        '/placeholder.svg'
                    }
                    alt={tPlace(`${lugar.id}.title` as TraduccionKey)}
                    className={`object-cover w-full h-full transition-transform duration-700 ${
                        isHighlighted ? 'scale-[1.02]' : 'hover:scale-110'
                    }`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                    <span className="text-xs font-light tracking-wider text-primary-foreground uppercase">
                        {tCategories(lugar.categoriaId as TraduccionKey)}
                    </span>
                </div>
            </div>
            <div
                className={`p-3 md:p-4 flex-grow ${isHighlighted ? 'bg-primary/5' : ''}`}
            >
                <h3 className="text-lg md:text-xl font-serif text-secondary dark:text-secondary-foreground mb-1">
                    {tPlace(`${lugar.id}.title` as TraduccionKey)}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
                    {tPlace(`${lugar.id}.subtitle` as TraduccionKey)}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground/80 line-clamp-3">
                    {tPlace(
                        `${lugar.id}.description` as TraduccionKey
                    ).substring(0, 120)}
                    ...{' '}
                    <button
                        type="button"
                        className="text-primary hover:underline font-medium bg-transparent p-0 m-0 align-baseline"
                        onClick={() => onImageClick(lugar, 0)}
                    >
                        {tTouristPlace('readMore')}
                    </button>
                </p>
            </div>
        </div>
    );
}
