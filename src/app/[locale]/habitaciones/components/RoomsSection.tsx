import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';

export const RoomsSection = () => {
    const t = useTranslations('IndexPageRooms.roomsSection');
    return (
        <SectionWrapper>
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('description'),
                }}
            ></SectionHeader>
        </SectionWrapper>
    );
};
