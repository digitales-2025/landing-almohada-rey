import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout';
import { GalleryHeroSection } from './components/GalleryHero';

export default function page() {
    // const transitionVariants = {
    //     item: {
    //         hidden: {
    //             opacity: 0,
    //             filter: 'blur(12px)',
    //             y: 12,
    //         },
    //         visible: {
    //             opacity: 1,
    //             filter: 'blur(0px)',
    //             y: 0,
    //             transition: {
    //                 type: 'spring',
    //                 bounce: 0.3,
    //                 duration: 1.5,
    //             },
    //         },
    //     },
    // }
    return (
        <PageLayout>
            <GalleryHeroSection />
        </PageLayout>
    );
}
