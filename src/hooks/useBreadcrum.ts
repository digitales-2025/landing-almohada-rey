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

type Props = {
    // Función para identificar rutas dinámicas: devuelve true si es ruta dinámica
    isDynamicRoute?: (
        segment: string,
        index: number,
        fullPath: string
    ) => boolean | boolean;
    // Función para personalizar la etiqueta de rutas dinámicas
    getDynamicLabel?: (
        //For client components
        segment: string,
        index: number,
        fullPath: string
    ) => string;

    dynamicLabel?: string; //For server components
    // // Función existente para gestionar rutas dinámicas completas
    // onDynamicRoute?: (route: string) => string;
};

export function useBreadcrumb({
    isDynamicRoute,
    getDynamicLabel,
    // onDynamicRoute,
    dynamicLabel,
}: Props = {}) {
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
            const fullPath = currentPath;

            // Verificar si es una ruta dinámica
            const isDynamic =
                isDynamicRoute?.(segment, index, fullPath) ||
                // Detectar rutas que inician con [ como rutas dinámicas (común en Next.js)
                (segment.startsWith('[') && segment.endsWith(']'));

            // Por defecto, capitalizamos la primera letra del segmento
            let label = segment.charAt(0).toUpperCase() + segment.slice(1);

            // Comprobamos si este segmento está presente en alguna de las rutas configuradas
            // Esto permite manejar rutas dinámicas que tienen como base los segmentos de defaultRoutes
            if (isDynamic) {
                // Usar etiqueta personalizada si se proporciona
                if (dynamicLabel) {
                    label = dynamicLabel;
                }
                if (!dynamicLabel && getDynamicLabel) {
                    label = getDynamicLabel(segment, index, fullPath);
                }
                if (!dynamicLabel && !getDynamicLabel) {
                    // Remover corchetes si existen
                    label = segment.replace(/^\[|\]$/g, '');
                    // Capitalizar y reemplazar guiones por espacios
                    label =
                        label.charAt(0).toUpperCase() +
                        label.slice(1).replace(/-/g, ' ');
                }
            } else {
                // Lógica existente para rutas no dinámicas
                Object.keys(routes).forEach(routeKey => {
                    Object.values(routes[routeKey]).forEach(routeConfig => {
                        const routePath = routeConfig.route.startsWith('/')
                            ? routeConfig.route.substring(1)
                            : routeConfig.route;

                        if (
                            routePath === segment ||
                            routePath.startsWith(segment + '/')
                        ) {
                            label = routeConfig.label;
                        }
                    });
                });
            }

            console.log(segment, index, fullPath, isDynamic, label);

            // // Si existe onDynamicRoute y es ruta dinámica, usamos esa función para obtener la etiqueta
            // if (isDynamic && onDynamicRoute) {
            //     label = onDynamicRoute(segment);
            // }

            items.push({
                label,
                href: currentPath,
                isCurrent: index === contentSegments.length - 1,
            });
        });

        return items;
    }, [pathname, t, isDynamicRoute, getDynamicLabel, dynamicLabel]);

    return breadcrumbItems;
}
