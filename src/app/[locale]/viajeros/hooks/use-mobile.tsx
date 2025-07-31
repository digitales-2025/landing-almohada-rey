'use client';

import { useEffect, useState } from 'react';

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Función para verificar si es un dispositivo móvil
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768); // Consideramos móvil si es menor a 768px
        };

        // Verificar al cargar
        checkIfMobile();

        // Agregar listener para cambios de tamaño
        window.addEventListener('resize', checkIfMobile);

        // Limpiar listener
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    return isMobile;
}
