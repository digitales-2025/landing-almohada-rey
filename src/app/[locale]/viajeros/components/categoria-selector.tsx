'use client';

import { useTranslations } from 'next-intl';

import type { Categoria } from '@/app/[locale]/viajeros/types/turismo';

interface CategoriaSelectorProps {
    categorias: Categoria[];
    categoriaActiva: string;
    onCategoriaChange: (categoriaId: string) => void;
}

export default function CategoriaSelector({
    categorias,
    categoriaActiva,
    onCategoriaChange,
}: CategoriaSelectorProps) {
    const t = useTranslations('Categories');

    return (
        <div className="w-full py-6 md:py-12">
            <h2 className="text-3xl md:text-4xl font-serif text-center text-gray-800 mb-6 md:mb-8">
                {t('title')}
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {categorias.map(categoria => (
                    <button
                        key={categoria.id}
                        onClick={() => onCategoriaChange(categoria.id)}
                        className={`px-3 py-2 md:px-6 md:py-3 border text-sm md:text-base ${
                            categoriaActiva === categoria.id
                                ? 'border-amber-500 text-amber-700'
                                : 'border-gray-300 text-gray-600 hover:border-amber-300'
                        } transition-colors duration-200 font-light tracking-wider`}
                    >
                        {t(categoria.id as any)}
                    </button>
                ))}
            </div>
        </div>
    );
}
