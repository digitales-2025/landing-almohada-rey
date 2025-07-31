import React from 'react';
import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { RoomsCarousel } from './RoomsCarousel';

export const MoreRoomSection = () => {
    const t = useTranslations('IndexPageRoom.moreRoomsSection');

    return (
        <SectionWrapper>
            <SectionHeader
                onlyTitle={true}
                headerTitle={{ text: t('title') }}
            ></SectionHeader>
            <RoomsCarousel></RoomsCarousel>
        </SectionWrapper>
    );
};
