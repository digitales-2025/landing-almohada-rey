'use client';

import { useEffect, useRef, useState } from 'react';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection1 = () => {
    const videoRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                const [entry] = entries;
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.2 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    // Construir la URL del video con autoplay cuando está en vista
    const videoSrc = `https://www.youtube.com/embed/QLUBjoN3w1I?${
        isInView ? 'autoplay=1&mute=1&loop=1&playlist=QLUBjoN3w1I' : ''
    }`;

    return (
        <SectionWrapper>
            <div className="container mx-auto">
                <div
                    ref={videoRef}
                    className="w-full aspect-video overflow-hidden shadow-md"
                >
                    <iframe
                        src={videoSrc}
                        title="La Almohada del Rey Hotel Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full border-0"
                    ></iframe>
                </div>
            </div>
        </SectionWrapper>
    );
};
