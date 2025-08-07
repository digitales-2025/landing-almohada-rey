/* eslint-disable @next/next/no-img-element */
'use client';

import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { useMobile } from '@/app/[locale]/viajeros/hooks/use-mobile';
import type {
    Subcategoria,
    TraduccionKey,
} from '@/app/[locale]/viajeros/types/turismo';
import {
    NextButton,
    PrevButton,
} from '@/components/customized/carousel/carousel-button';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ModalDetalleProps {
    isOpen: boolean;
    onClose: () => void;
    lugar: Subcategoria | null;
    initialImageIndex: number;
}

export default function ModalDetalle({
    isOpen,
    onClose,
    lugar,
    initialImageIndex = 0,
}: ModalDetalleProps) {
    const [currentImageIndex, setCurrentImageIndex] =
        useState(initialImageIndex);
    const [isZoomed, setIsZoomed] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobile();

    const tModal = useTranslations('Modal');
    const tCategories = useTranslations('Categories');
    // Obtener traducciones para el lugar actual
    const tPlace = useTranslations('Places');

    // Reiniciar el índice de imagen cuando cambia el lugar
    useEffect(() => {
        setCurrentImageIndex(initialImageIndex);
    }, [lugar, initialImageIndex]);

    // Cambio automático de imágenes en el carrusel
    useEffect(() => {
        if (!isOpen || !lugar) return;

        const interval = setInterval(() => {
            if (!isZoomed) {
                setCurrentImageIndex(prevIndex =>
                    prevIndex === lugar.imagenes.length - 1 ? 0 : prevIndex + 1
                );
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [isOpen, lugar, isZoomed]);

    // Cerrar modal al hacer clic fuera (solo para desktop)
    useEffect(() => {
        if (isMobile) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose, isMobile]);

    // Cerrar modal con tecla Escape
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isOpen, onClose]);

    // Navegar a la imagen anterior
    const goToPrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!lugar) return;
        setCurrentImageIndex(prevIndex =>
            prevIndex === 0 ? lugar.imagenes.length - 1 : prevIndex - 1
        );
    };

    // Navegar a la imagen siguiente
    const goToNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!lugar) return;
        setCurrentImageIndex(prevIndex =>
            prevIndex === lugar.imagenes.length - 1 ? 0 : prevIndex + 1
        );
    };

    if (!isOpen || !lugar || !tPlace) return null;

    // Contenido del carrusel de imágenes
    const ImageCarousel = () => (
        <div
            className="relative w-full h-[250px] sm:h-[300px] md:h-[400px] mb-4 md:mb-6 overflow-hidden cursor-pointer group"
            onClick={() => setIsZoomed(!isZoomed)}
        >
            <img
                src={
                    lugar.imagenes[currentImageIndex].url || '/placeholder.svg'
                }
                alt={`${tPlace(`${lugar.id}.title` as TraduccionKey)} - Imagen ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-transform duration-700 ${isZoomed ? 'scale-125' : 'scale-100'}`}
                loading="lazy"
            />

            {/* Botones de navegación lateral */}
            <PrevButton
                onClick={goToPrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <NextButton
                onClick={goToNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
            />

            {/* Indicadores de carrusel */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {lugar.imagenes.map((_, index) => (
                    <button
                        key={index}
                        onClick={e => {
                            e.stopPropagation();
                            setCurrentImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full ${currentImageIndex === index ? 'bg-primary' : 'bg-primary/50'}`}
                    />
                ))}
            </div>
        </div>
    );

    // Contenido de la descripción
    const DescriptionContent = () => (
        <div className="text-sm md:text-base text-muted-foreground leading-relaxed">
            <p>{tPlace(`${lugar.id}.description` as TraduccionKey)}</p>
        </div>
    );

    // Renderizar drawer para móvil
    if (isMobile) {
        return (
            <Drawer open={isOpen} onOpenChange={open => !open && onClose()}>
                <DrawerContent className="max-h-[85vh] pb-4">
                    <DrawerHeader className="px-4">
                        <DrawerTitle className="text-xl font-serif text-secondary dark:text-secondary-foreground">
                            {tPlace(`${lugar.id}.title` as TraduccionKey)}
                        </DrawerTitle>
                        <DrawerDescription className="text-muted-foreground">
                            {tPlace(`${lugar.id}.subtitle` as TraduccionKey)}
                        </DrawerDescription>
                        <span className="text-xs font-light tracking-wider text-primary uppercase block mt-1">
                            {tCategories(lugar.categoriaId as TraduccionKey)}
                        </span>
                    </DrawerHeader>

                    <div className="flex-1 overflow-hidden">
                        <ScrollArea className="h-[50vh] px-0">
                            <div className="px-4">
                                <ImageCarousel />
                                <DescriptionContent />
                            </div>
                        </ScrollArea>
                    </div>

                    <DrawerClose
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1.5 bg-background/80 hover:bg-background transition-colors"
                    >
                        <X className="h-4 w-4 text-foreground" />
                    </DrawerClose>
                </DrawerContent>
            </Drawer>
        );
    }

    // Renderizar modal para escritorio
    return (
        <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div
                ref={modalRef}
                className="relative bg-background w-full max-w-4xl"
            >
                <button
                    onClick={onClose}
                    className="absolute right-3 top-3 md:right-4 md:top-4 z-10 p-1.5 md:p-2 bg-background/80 rounded-full hover:bg-background transition-colors cursor-pointer"
                    aria-label={tModal('close')}
                >
                    <X className="h-4 w-4 md:h-5 md:w-5 text-foreground" />
                </button>

                <div className="p-4 md:p-6 flex flex-col overflow-hidden">
                    <div className="mb-3 md:mb-4 flex-shrink-0">
                        <span className="text-xs md:text-sm font-light tracking-wider text-primary uppercase">
                            {tCategories(lugar.categoriaId as TraduccionKey)}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-serif text-secondary dark:text-secondary-foreground mt-1">
                            {tPlace(`${lugar.id}.title` as TraduccionKey)}
                        </h2>
                        <h3 className="text-lg md:text-xl text-muted-foreground mb-3 md:mb-4">
                            {tPlace(`${lugar.id}.subtitle` as TraduccionKey)}
                        </h3>
                    </div>

                    <ScrollArea className="flex-1 px-0 max-h-[80vh]">
                        <ImageCarousel />
                        <DescriptionContent />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}
