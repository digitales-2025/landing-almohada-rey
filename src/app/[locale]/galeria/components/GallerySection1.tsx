'use client';

import { useEffect, useRef, useState } from 'react';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection1 = () => {
    const videoRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        // Configurar el Intersection Observer para detectar cuando el video está en el viewport
        const observer = new IntersectionObserver(
            entries => {
                const [entry] = entries;
                setIsInView(entry.isIntersecting);
            },
            {
                threshold: 0.4,
            }
        );

        // Observar el elemento del video
        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        // Limpiar el observer cuando el componente se desmonte
        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    // Construir la URL del video con autoplay cuando está en vista
    const videoSrc = `https://www.youtube.com/embed/4_lzrprot5U?${isInView ? 'autoplay=1&mute=1' : ''}`;

    return (
        <SectionWrapper>
            <div
                ref={videoRef}
                className="w-full aspect-video"
                style={{ maxWidth: '95%' }}
            >
                <iframe
                    src={videoSrc}
                    title="La Almohada del Rey Hotel Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full"
                ></iframe>
            </div>
        </SectionWrapper>
    );
};
