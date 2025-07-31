'use client';

import { useTranslations } from 'next-intl';

import type {
    Categoria,
    TraduccionKey,
} from '@/app/[locale]/viajeros/types/turismo';

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
            <h2 className="text-3xl md:text-4xl font-serif text-center text-secondary dark:text-secondary-foreground mb-6 md:mb-8">
                {t('title')}
            </h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {categorias.map(categoria => (
                    <button
                        key={categoria.id}
                        onClick={() => onCategoriaChange(categoria.id)}
                        className={`px-3 py-2 md:px-6 md:py-3 border text-sm md:text-base ${
                            categoriaActiva === categoria.id
                                ? 'border-primary text-primary'
                                : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
                        } transition-colors duration-200 font-light tracking-wider rounded-md`}
                    >
                        {t(categoria.id as TraduccionKey)}
                    </button>
                ))}
            </div>
        </div>
    );
}
