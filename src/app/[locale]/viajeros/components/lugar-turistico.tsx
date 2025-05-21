'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import type { Subcategoria } from '@/app/[locale]/viajeros/types/turismo';

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
            className={`flex flex-col h-full border rounded-lg overflow-hidden transition-all duration-500 ${
                isHighlighted
                    ? 'border-amber-400 shadow-md'
                    : 'border-gray-200 hover:shadow-md'
            }`}
        >
            <div
                className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden cursor-pointer"
                onClick={() => onImageClick(lugar, currentImageIndex)}
            >
                <Image
                    src={
                        lugar.imagenes[currentImageIndex].url ||
                        '/placeholder.svg'
                    }
                    alt={tPlace(`${lugar.id}.title` as any)}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                        isHighlighted ? 'scale-[1.02]' : 'hover:scale-110'
                    }`}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                    <span className="text-xs font-light tracking-wider text-amber-300 uppercase">
                        {tCategories(lugar.categoriaId as any)}
                    </span>
                </div>
            </div>
            <div
                className={`p-3 md:p-4 flex-grow ${isHighlighted ? 'bg-amber-50/50' : ''}`}
            >
                <h3 className="text-lg md:text-xl font-serif text-gray-800 mb-1">
                    {tPlace(`${lugar.id}.title` as any)}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                    {tPlace(`${lugar.id}.subtitle` as any)}
                </p>
                <p className="text-xs md:text-sm text-gray-500 line-clamp-3">
                    {tPlace(`${lugar.id}.description` as any).substring(0, 120)}
                    ...{' '}
                    <span className="text-amber-600 hover:underline">
                        {tTouristPlace('readMore')}
                    </span>
                </p>
            </div>
        </div>
    );
}
