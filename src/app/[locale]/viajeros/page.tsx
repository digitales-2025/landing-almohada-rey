import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout';
import { resetPageClassnames } from '@/components/layout/reset-page-classnames';
import { KeepInTouchCTA } from '../../../components/common/KeepInTouchCTA/KeepInTouchCTA';
import { TravelerHeader } from './components/TravelerHeader';
import TurismoPage from './components/TravelerPage';

export default function ViajerosPage() {
    return (
        <PageLayout classname={resetPageClassnames}>
            {/* cabezera */}
            <TravelerHeader />
            {/* contenido */}
            <TurismoPage />
            {/* pie */}
            <KeepInTouchCTA />
        </PageLayout>
    );
}
