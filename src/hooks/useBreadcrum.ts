import { useMemo } from 'react';
/* import { usePathname } from 'next/navigation'; */
import { useTranslations } from 'next-intl';

import { usePathname } from '@/i18n/navigation';
import {
    defaultLocale,
    defaultRoutes,
    routes,
    supportedLocales,
    SupportedLocales,
} from '@/i18n/routing';
import { BreadcrumbItemType } from '@/types/breadcrum';

export function useBreadcrumb() {
    const pathname = usePathname();
    const t = useTranslations('Navigation');
    const breadcrumbItems = useMemo(() => {
        const pathSegments = String(pathname).split('/').filter(Boolean);

        // Verificamos si el primer segmento es un locale soportado usando el objeto supportedLocales
        const firstSegment = pathSegments[0] || '';
        const hasLocalePrefix = firstSegment in supportedLocales;

        // Separamos el código de idioma si existe
        const locale = hasLocalePrefix
            ? (firstSegment as SupportedLocales)
            : defaultLocale; // Default a español si no hay locale
        const contentSegments = hasLocalePrefix
            ? pathSegments.slice(1)
            : pathSegments;

        const homeLabel = t('home');
        // Siempre incluimos Inicio/Home
        const items: BreadcrumbItemType[] = [
            {
                label: homeLabel,
                href: hasLocalePrefix
                    ? `/${locale}`
                    : (defaultRoutes.home ?? '/'),
            },
        ];

        // Construimos las rutas intermedias
        let currentPath = hasLocalePrefix ? `/${locale}` : '';

        contentSegments.forEach((segment, index) => {
            currentPath += `/${segment}`;

            // Por defecto, capitalizamos la primera letra del segmento
            let label = segment.charAt(0).toUpperCase() + segment.slice(1);

            // Comprobamos si este segmento está presente en alguna de las rutas configuradas
            // Esto permite manejar rutas dinámicas que tienen como base los segmentos de defaultRoutes
            Object.keys(routes).forEach(routeKey => {
                Object.values(routes[routeKey]).forEach(routeConfig => {
                    const routePath = routeConfig.route.startsWith('/')
                        ? routeConfig.route.substring(1)
                        : routeConfig.route;

                    // Si el segmento coincide con la ruta o es parte de ella,
                    // usamos la etiqueta definida en la configuración
                    if (
                        routePath === segment ||
                        routePath.startsWith(segment + '/')
                    ) {
                        label = routeConfig.label;
                    }
                });
            });

            items.push({
                label,
                href: currentPath,
                isCurrent: index === contentSegments.length - 1,
            });
        });

        return items;
    }, [pathname]);

    return breadcrumbItems;
}
