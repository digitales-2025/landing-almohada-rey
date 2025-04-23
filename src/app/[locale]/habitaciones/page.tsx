import React from 'react';

import { PageLayout } from '@/components/layout/PageLayout';
import { BookingSection } from './components/BookingSection';
import { EnvironmentsSection } from './components/EnvironmentsSection';
import { RoomsHeroSection } from './components/RoomsHero';
import { RoomsSection } from './components/RoomsSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';

export default function HabitacionesPage() {
    return (
        <PageLayout>
            <RoomsHeroSection></RoomsHeroSection>
            <RoomsSection></RoomsSection>
            <EnvironmentsSection></EnvironmentsSection>
            <SpecialOffersSection></SpecialOffersSection>
            <BookingSection></BookingSection>
        </PageLayout>
    );
}
