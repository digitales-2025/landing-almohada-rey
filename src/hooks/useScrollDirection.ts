'use client';

import { useEffect, useState } from 'react';

export function useScrollDirection() {
    const [scrollDir, setScrollDir] = useState<'up' | 'down'>('up');
    const [lastScrollY, setLastScrollY] = useState<number>(0);
    const [scrollTimer, setScrollTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        setLastScrollY(window.scrollY);

        const updateScrollDir = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY) < 10) return;

            // Siempre actualiza inmediatamente cuando es hacia arriba
            if (currentScrollY < lastScrollY) {
                setScrollDir('up');
                // Limpiar cualquier temporizador pendiente si cambia la dirección
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                    setScrollTimer(null);
                }
            } else {
                // Para scroll hacia abajo, configurar un retraso
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                }

                const timer = setTimeout(() => {
                    setScrollDir('down');
                }, 500); // Retraso de medio segundo (500ms)

                setScrollTimer(timer);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', updateScrollDir);
        return () => {
            window.removeEventListener('scroll', updateScrollDir);
            // Limpiar el temporizador al desmontar
            if (scrollTimer) clearTimeout(scrollTimer);
        };
    }, [lastScrollY, scrollTimer]);

    return scrollDir;
}
