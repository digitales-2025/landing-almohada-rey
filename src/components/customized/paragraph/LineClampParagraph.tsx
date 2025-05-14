'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface LineClampParagraphProps {
    text: string;
    lineClamp?: 1 | 2 | 3 | 4 | 5 | 6;
    showMoreOption?: boolean;
    className?: string;
    buttonClassName?: string;
    inlineButton?: boolean;
    expandText?: string;
    collapseText?: string;
}

export function LineClampParagraph({
    text,
    lineClamp = 3,
    showMoreOption = true,
    className,
    buttonClassName,
    inlineButton = false,
    expandText = 'See more',
    collapseText = 'See less',
}: LineClampParagraphProps) {
    const t = useTranslations('CollapseParragraph');
    const expandTextLocalized = t('expand');
    const collapseTextLocalized = t('collapse');
    const [isExpanded, setIsExpanded] = useState(false);
    const [shouldShowButton, setShouldShowButton] = useState(false);
    const textRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Función para aplicar la clase line-clamp adecuada
    const applyLineClamp = useCallback(
        (element: HTMLElement | null) => {
            if (!element) return;

            // Primero eliminamos todas las posibles clases line-clamp
            element.classList.remove(
                'line-clamp-1',
                'line-clamp-2',
                'line-clamp-3',
                'line-clamp-4',
                'line-clamp-5',
                'line-clamp-6'
            );

            // Luego aplicamos la correcta según el prop
            if (lineClamp === 1) element.classList.add('line-clamp-1');
            else if (lineClamp === 2) element.classList.add('line-clamp-2');
            else if (lineClamp === 3) element.classList.add('line-clamp-3');
            else if (lineClamp === 4) element.classList.add('line-clamp-4');
            else if (lineClamp === 5) element.classList.add('line-clamp-5');
            else if (lineClamp === 6) element.classList.add('line-clamp-6');
        },
        [lineClamp]
    );

    // Extracto la función de verificación como un useCallback para evitar recreaciones innecesarias
    const checkIfTruncated = useCallback(() => {
        if (!textRef.current || !showMoreOption) return;

        // Guardamos estilos originales para restaurar después
        const originalHeight = textRef.current.style.height;
        const originalOverflow = textRef.current.style.overflow;

        // Configuramos para medir correctamente
        textRef.current.style.overflow = 'hidden';

        // Primero medimos con el line-clamp aplicado
        applyLineClamp(textRef.current);
        const truncatedHeight = textRef.current.clientHeight;

        // Luego medimos sin el line-clamp (texto completo)
        textRef.current.classList.remove(
            'line-clamp-1',
            'line-clamp-2',
            'line-clamp-3',
            'line-clamp-4',
            'line-clamp-5',
            'line-clamp-6'
        );
        textRef.current.style.height = 'auto';
        const fullHeight = textRef.current.scrollHeight;

        // Restauramos estado original
        textRef.current.style.height = originalHeight;
        textRef.current.style.overflow = originalOverflow;

        // Re-aplicamos line-clamp si no está expandido
        if (!isExpanded) {
            applyLineClamp(textRef.current);
        }

        // Si el texto completo es más alto que el truncado, entonces está truncado
        const isTruncated = fullHeight > truncatedHeight;
        setShouldShowButton(isTruncated);
    }, [lineClamp, showMoreOption, isExpanded, applyLineClamp]);

    // Efecto para ejecutar la verificación
    useEffect(() => {
        // Ejecutamos después de un pequeño retraso para asegurar que se haya renderizado
        const timer = setTimeout(checkIfTruncated, 100);

        // También ejecutamos cuando cambia el tamaño de la ventana
        window.addEventListener('resize', checkIfTruncated);

        // Limpieza
        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', checkIfTruncated);
        };
    }, [text, checkIfTruncated]);

    const toggleExpand = () => {
        setIsExpanded(prevExpanded => !prevExpanded);
    };

    // Determinamos la clase line-clamp para usar en los renderizados
    const getLineClampClass = () => {
        if (isExpanded) return '';

        switch (lineClamp) {
            case 1:
                return 'line-clamp-1';
            case 2:
                return 'line-clamp-2';
            case 3:
                return 'line-clamp-3';
            case 4:
                return 'line-clamp-4';
            case 5:
                return 'line-clamp-5';
            case 6:
                return 'line-clamp-6';
            default:
                return 'line-clamp-3'; // valor por defecto
        }
    };

    // Para botón estándar (no en línea)
    if (!inlineButton) {
        return (
            <div className={cn('relative', className)}>
                <div
                    ref={textRef}
                    className={cn(
                        'transition-all duration-300 ease-in-out',
                        getLineClampClass()
                    )}
                >
                    {text}
                </div>

                {shouldShowButton && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleExpand}
                        className={cn(
                            'mt-1 h-6 px-2 text-xs font-medium',
                            buttonClassName
                        )}
                        aria-expanded={isExpanded}
                    >
                        {isExpanded ? (
                            <>
                                {collapseTextLocalized ?? collapseText}{' '}
                                <ChevronUp className="ml-1 h-3 w-3" />
                            </>
                        ) : (
                            <>
                                {expandTextLocalized ?? expandText}{' '}
                                <ChevronDown className="ml-1 h-3 w-3" />
                            </>
                        )}
                    </Button>
                )}
            </div>
        );
    }

    // Para botón en línea
    return (
        <div ref={containerRef} className={cn('relative', className)}>
            {/* Cuando está expandido, mostrar todo el texto con un botón "Ver menos" al final */}
            {isExpanded ? (
                <div>
                    <span>{text}</span>{' '}
                    <button
                        onClick={toggleExpand}
                        className={cn(
                            'inline-flex items-center bg-primary-foreground pl-2 font-medium text-primary text-sm md:text-base lg:text-p lg:tracking-normal hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                            buttonClassName
                        )}
                        aria-expanded={true}
                    >
                        {collapseTextLocalized ?? collapseText}
                    </button>
                </div>
            ) : (
                /* Cuando está colapsado, usar contenedor especial con line-clamp y botón posicionado */
                <div className="relative">
                    {/* Este es el texto truncado visible */}
                    <div
                        ref={textRef}
                        className={cn(
                            'transition-all duration-300 ease-in-out',
                            getLineClampClass()
                        )}
                    >
                        {/* Agregamos un elemento invisible que ocupa espacio pero no se muestra */}
                        {text}
                        {shouldShowButton && (
                            <span className="invisible inline-flex items-center">
                                {' '}
                                <span className="invisible">
                                    {expandTextLocalized ?? expandText}
                                </span>
                            </span>
                        )}
                    </div>

                    {/* Este es el botón real, posicionado absolutamente para aparecer al final del texto */}
                    {shouldShowButton && (
                        <button
                            onClick={toggleExpand}
                            className={cn(
                                'absolute bottom-0 right-0 inline-flex items-center font-medium text-primary text-sm md:text-base lg:text-p lg:tracking-normal hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-primary-foreground pl-2',
                                buttonClassName
                            )}
                            aria-expanded={false}
                            style={{
                                // Aseguramos que el botón aparezca en la misma línea que la última línea de texto
                                transform: 'translateY(-0.1em)',
                            }}
                        >
                            {' '}
                            {expandTextLocalized ?? expandText}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
