import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout';
import { RoomsHeroSection } from './components/RoomsHero';
import { RoomsSection } from './components/RoomsSection';

export default function HabitacionesPage() {
    return (
        <PageLayout>
            <RoomsHeroSection></RoomsHeroSection>
            <RoomsSection></RoomsSection>
        </PageLayout>
    );
}
