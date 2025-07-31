'use client';

import React from 'react';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumb } from '@/hooks/useBreadcrum';
import { cn } from '@/lib/utils';
import { BreadcrumbItemType } from '@/types/breadcrum';

interface BreadcrumbsProps {
    items?: BreadcrumbItemType[];
    className?: string;
    // Función para identificar rutas dinámicas: devuelve true si es ruta dinámica
    isDynamicRoute?:
        | ((segment: string, index: number, fullPath: string) => boolean)
        | boolean;
    // Función para personalizar la etiqueta de rutas dinámicas
    getDynamicLabel?: (
        segment: string,
        index: number,
        fullPath: string
    ) => string;

    dynamicLabel?: string; // Para server components
}

/**
 * Componente de migas de pan personalizado
 * @param items - Array de elementos para mostrar en el breadcrumb (opcional, si no se proporciona usa el hook)
 * @param className - Clase adicional para personalizar el estilo
 */
const BreadcrumbNav: React.FC<BreadcrumbsProps> = ({
    items: propItems,
    className,
    getDynamicLabel,
    isDynamicRoute,
    dynamicLabel,
}) => {
    const checkDynamicRouteCallback =
        typeof isDynamicRoute === 'boolean'
            ? (segment: string) => {
                  const regexTest =
                      /^\d+$/.test(segment) ||
                      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
                          segment
                      );
                  return regexTest;
              }
            : (isDynamicRoute as (
                  segment: string,
                  index: number,
                  fullPath: string
              ) => boolean);
    // Obtenemos los elementos del breadcrumb del hook
    const hookItems = useBreadcrumb({
        isDynamicRoute: checkDynamicRouteCallback,
        getDynamicLabel,
        dynamicLabel,
    });

    // Usamos los items proporcionados como prop o los del hook
    const items = propItems ?? hookItems;

    if (!items || items.length === 0) return null;

    return (
        <Breadcrumb className={cn('relative z-10', className)}>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={`${item.label}-${index}`}>
                        <BreadcrumbItem className="text-primary-foreground active:text-primary-foreground font-light">
                            {item.isCurrent ? (
                                <BreadcrumbPage className=" text-primary-foreground lg:font-h8">
                                    {item.label}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink
                                    className="hover:underline hover:text-primary-foreground lg:font-h8"
                                    href={item.href ?? '#'}
                                >
                                    {item.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator className="text-primary-foreground/70" />
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export { BreadcrumbNav };

//EJEMPLO DE USO CON CAMPOS DINAMICOS
// export default function HabitacionDetallePage({ params }) {
//   const { tipoHabitacion } = params;

//   // Define los items del breadcrumb con navegación más profunda
//   const breadcrumbItems = [
//     { label: "Inicio", href: "/" },
//     { label: "Habitaciones", href: "/habitaciones" },
//     { label: tipoHabitacion, isCurrent: true }, // El último elemento es la página actual
//   ];

//   return (
//     <div>
//       <BreadcrumbsNav items={breadcrumbItems} />
//       {/* Resto del contenido de la página */}
//     </div>
//   );
// }
