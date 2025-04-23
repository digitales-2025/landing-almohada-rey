'use client';

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { SelectItem } from '@radix-ui/react-select';
import { Locale, useLocale, useTranslations } from 'next-intl';

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
} from '@/components/ui/select';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing, SupportedLocales } from '@/i18n/routing';
import { cn } from '@/lib/utils';

interface LocaleSwitcherParams {
    className?: string;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherParams) {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();

    console.log('locale', locale);

    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const pathname = usePathname();
    const params = useParams();

    // Función para obtener el texto del idioma seleccionado
    const getLocaleLabel = (localeCode: string) => {
        return t('locale', { locale: localeCode as SupportedLocales });
    };

    function onSelectChange(value: string) {
        const nextLocale = value as Locale;
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale: nextLocale }
            );
        });
    }
    return (
        <div className={cn('relative text-gray-400', className)}>
            <Select
                defaultValue={locale}
                value={locale}
                disabled={isPending}
                onValueChange={onSelectChange}
            >
                <SelectTrigger
                    className="border-none py-0"
                    disabled={isPending}
                >
                    {/* <SelectValue placeholder={'Lang'} /> */}
                    <span>{getLocaleLabel(locale)}</span>
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {routing.locales.map(cur => (
                            <SelectItem key={cur} value={cur}>
                                {t('locale', { locale: cur })}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
