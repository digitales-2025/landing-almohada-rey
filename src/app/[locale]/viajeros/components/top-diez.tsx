/* eslint-disable @next/next/no-img-element */
'use client';

import { useTranslations } from 'next-intl';

import type {
    TopItem,
    TraduccionKey,
} from '@/app/[locale]/viajeros/types/turismo';

interface TopDiezProps {
    items: TopItem[];
    onItemClick: (categoriaId: string, subcategoriaId: string) => void;
}

export default function TopDiez({ items, onItemClick }: TopDiezProps) {
    const t = useTranslations('TouristPlaces');
    const tTopItems = useTranslations('TopItems');

    return (
        <div className="p-4 md:p-6 rounded-lg">
            <h2 className="text-xl md:text-2xl font-serif text-primary mb-4 md:mb-6">
                {t('popular')}
            </h2>
            <div className="space-y-3 md:space-y-4">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() =>
                            onItemClick(item.categoriaId, item.subcategoriaId)
                        }
                        className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-primary/10 rounded-lg transition-colors w-full text-left"
                    >
                        <span className="text-2xl md:text-3xl font-serif text-primary min-w-[30px] md:min-w-[40px]">
                            {item.id}.
                        </span>
                        <div className="flex-grow">
                            <h3 className="text-sm md:text-base font-medium text-secondary dark:text-secondary-foreground">
                                {tTopItems(
                                    item.subcategoriaId as TraduccionKey
                                )}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground">
                                {tTopItems(
                                    `${item.subcategoriaId}_subtitle` as TraduccionKey
                                )}
                            </p>
                        </div>
                        <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0">
                            <img
                                src={item.imagen || '/placeholder.svg'}
                                alt={tTopItems(
                                    item.subcategoriaId as TraduccionKey
                                )}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
