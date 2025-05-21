import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout';
import { KeepInTouchCTA } from '../../../components/common/KeepInTouchCTA/KeepInTouchCTA';
import { TravelerHeader } from './components/TravelerHeader';
import TurismoPage from './components/TravelerPage';

export default function ViajerosPage() {
    return (
        <PageLayout>
            {/* cabezera */}
            <TravelerHeader />
            {/* contenido */}
            <TurismoPage />
            {/* pie */}
            <KeepInTouchCTA />
        </PageLayout>
    );
}
