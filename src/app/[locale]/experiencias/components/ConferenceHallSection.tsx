import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import React from 'react';

export const ConferenceHallSection = () => {
    return (
        <SectionWrapper>
            <SectionHeader
                headerTitle={{
                    text: 'Salas de Conferencias',
                }}
                description={{
                    text: 'Nuestras salas de conferencias están diseñadas para ofrecer un ambiente profesional y cómodo, perfecto para reuniones, presentaciones y eventos corporativos.',
                }}
            ></SectionHeader>
        </SectionWrapper>
    );
};
