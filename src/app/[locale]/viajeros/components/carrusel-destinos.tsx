/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import {
    NextButton,
    PrevButton,
} from '@/components/customized/carousel/carousel-button';
import { Subcategoria, TraduccionKey } from '../types/turismo';

interface CarruselDestinosProps {
    destinos: Subcategoria[];
    onDestinoClick: (categoriaId: string, subcategoriaId: string) => void;
}

export default function CarruselDestinos({
    destinos,
    onDestinoClick,
}: CarruselDestinosProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [direction, setDirection] = useState(0); // -1 para izquierda, 1 para derecha
    const [isAnimating, setIsAnimating] = useState(false);
    const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    const tCategories = useTranslations('Categories');
    const tPlaces = useTranslations(`Places`);
    const tTouristPlaces = useTranslations('TouristPlaces');

    // Calcular el índice siguiente
    useEffect(() => {
        setNextIndex((currentIndex + 1) % destinos.length);
    }, [currentIndex, destinos.length]);

    // Manejar el cambio al siguiente destino
    const handleNext = () => {
        if (isAnimating) return;
        setDirection(1);
        setIsAnimating(true);
        setCurrentIndex(prev => (prev + 1) % destinos.length);
        setTimeout(() => setIsAnimating(false), 600);
    };

    // Configurar el cambio automático
    useEffect(() => {
        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                if (!isAnimating && !isPaused) {
                    handleNext();
                }
            }, 7000); // Cambiar cada 7 segundos
        };

        startAutoPlay();

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [isAnimating, isPaused]);

    // Manejar el cambio al destino anterior
    const handlePrev = () => {
        if (isAnimating) return;
        setDirection(-1);
        setIsAnimating(true);
        setCurrentIndex(prev => (prev - 1 + destinos.length) % destinos.length);
        setTimeout(() => setIsAnimating(false), 600);
    };

    // Obtener el destino actual y el siguiente
    const destinoActual = destinos[currentIndex];
    const destinoSiguiente = destinos[nextIndex];

    if (!destinoActual || !destinoSiguiente) return null;

    // Variantes para las animaciones de la imagen
    const imageVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9,
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
            },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 500 : -500,
            opacity: 0,
            scale: 0.9,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
            },
        }),
    };

    // Variantes para las animaciones del contenido
    const contentVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 200 : -200,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                delay: 0.1,
            },
        },
        exit: (direction: number) => ({
            x: direction < 0 ? 200 : -200,
            opacity: 0,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
            },
        }),
    };

    // Variantes para las animaciones de la recomendación
    const recommendationVariants = {
        enter: {
            y: 20,
            opacity: 0,
        },
        center: {
            y: 0,
            opacity: 1,
            transition: {
                y: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
                delay: 0.2,
            },
        },
        exit: {
            y: -20,
            opacity: 0,
            transition: {
                y: { duration: 0.3 },
                opacity: { duration: 0.3 },
            },
        },
    };

    return (
        <div
            className="w-full max-w-7xl mx-auto my-12 relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Imagen principal a la izquierda (ocupa 50% en desktop) - Altura fija */}
                    <div className="relative w-full md:w-1/2 h-[450px] md:h-[600px] overflow-hidden">
                        <AnimatePresence
                            initial={false}
                            custom={direction}
                            mode="sync"
                        >
                            <motion.div
                                key={`image-${currentIndex}`}
                                custom={direction}
                                variants={imageVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="absolute inset-0 w-full h-full"
                            >
                                <div className="relative w-full h-full">
                                    <img
                                        src={
                                            destinoActual.imagenes[0].url ||
                                            '/placeholder.svg'
                                        }
                                        alt={tPlaces(
                                            `${destinoActual.id}.title` as TraduccionKey
                                        )}
                                        className="object-cover w-full h-full"
                                        style={{ objectFit: 'cover' }}
                                        loading="eager"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Contenido a la derecha (ocupa 50% en desktop) */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 pb-0 md:pb-0 flex flex-col justify-between bg-background">
                        {/* Información del destino actual */}
                        <AnimatePresence
                            initial={false}
                            custom={direction}
                            mode="wait"
                        >
                            <motion.div
                                key={`content-${currentIndex}`}
                                custom={direction}
                                variants={contentVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="flex flex-col h-full"
                            >
                                <div className="flex-grow">
                                    <span className="text-sm md:text-base font-light tracking-wider text-primary uppercase">
                                        {tCategories(
                                            destinoActual.categoriaId as TraduccionKey
                                        )}
                                    </span>
                                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-secondary dark:text-secondary-foreground mt-3 mb-6 leading-tight">
                                        {tPlaces(
                                            `${destinoActual.id}.title` as TraduccionKey
                                        )}
                                    </h2>

                                    <button
                                        onClick={() =>
                                            onDestinoClick(
                                                destinoActual.categoriaId,
                                                destinoActual.id
                                            )
                                        }
                                        className="px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-base md:text-lg"
                                    >
                                        {tTouristPlaces('viewDestination')}
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Siguiente recomendación */}
                        <AnimatePresence initial={false} mode="wait">
                            <motion.div
                                key={`recommendation-${nextIndex}`}
                                variants={recommendationVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="mt-12"
                            >
                                <p className="text-sm md:text-base text-muted-foreground mb-5 font-light">
                                    {tTouristPlaces('nextRecommendation')}
                                </p>
                                <div
                                    className="flex items-center gap-5 cursor-pointer hover:bg-accent/10 p-3 pb-0 transition-colors"
                                    onClick={() =>
                                        onDestinoClick(
                                            destinoSiguiente.categoriaId,
                                            destinoSiguiente.id
                                        )
                                    }
                                >
                                    <div className="relative w-28 h-28 md:w-48 md:h-48 overflow-hidden flex-shrink-0">
                                        <img
                                            src={
                                                destinoSiguiente.imagenes[0]
                                                    .url || '/placeholder.svg'
                                            }
                                            alt={tPlaces(
                                                `${destinoSiguiente.id}.title` as TraduccionKey
                                            )}
                                            className="object-cover w-full h-full"
                                            style={{ objectFit: 'cover' }}
                                            loading="lazy"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-secondary dark:text-secondary-foreground">
                                            {tPlaces(
                                                `${destinoSiguiente.id}.title` as TraduccionKey
                                            )}
                                        </h3>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Botones de navegación mejorados */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                <PrevButton
                    onClick={handlePrev}
                    aria-label="Destino anterior"
                    className="p-3 md:p-4 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-all hover:scale-110 focus:outline-none"
                />
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
                <NextButton
                    onClick={handleNext}
                    aria-label="Destino siguiente"
                    className="p-3 md:p-4 bg-primary text-primary-foreground rounded-full shadow-md hover:bg-primary/90 transition-all hover:scale-110 focus:outline-none"
                />
            </div>

            {/* Indicadores (solo para móvil) */}
            <div className="absolute bottom-4 right-4 flex space-x-2 z-10 md:hidden">
                {destinos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            if (!isAnimating) {
                                setDirection(index > currentIndex ? 1 : -1);
                                setIsAnimating(true);
                                setTimeout(() => setIsAnimating(false), 600);
                                setCurrentIndex(index);
                            }
                        }}
                        className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-primary' : 'bg-muted'}`}
                        aria-label={`Ir al destino ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
