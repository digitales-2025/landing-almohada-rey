import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout';
import { KeepInTouchCTA } from '../../../components/common/KeepInTouchCTA/KeepInTouchCTA';
import { GallerySection1 } from './components/GallerySection1';
import { TravelerHero } from './components/TravelerHero';

export default function ViajerosPage() {
    return (
        <PageLayout>
            {/* cabezera */}
            <TravelerHero />
            {/* contenido */}
            <GallerySection1 />

            {/* pie */}
            <KeepInTouchCTA />
        </PageLayout>
    );
}
