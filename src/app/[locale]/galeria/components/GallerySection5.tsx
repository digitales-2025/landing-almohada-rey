/* eslint-disable @next/next/no-img-element */
'use client';

import { SectionWrapper } from '@/components/layout/section/base-section';

export const GallerySection5 = () => {
    return (
        <SectionWrapper>
            <div className="container mx-auto">
                {/* Imagen panorámica grande */}
                <div className="relative w-full aspect-[16/9] overflow-hidden shadow-md ">
                    <img
                        src="/gallery/seccion5/ImgLiving.webp"
                        alt="interior living"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </SectionWrapper>
    );
};
