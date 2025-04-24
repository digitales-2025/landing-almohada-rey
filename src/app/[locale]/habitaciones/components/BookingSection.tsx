import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';

export const BookingSection = () => {
    const t = useTranslations('IndexPageRooms.bookingSection');
    return (
        <SectionWrapper className="relative bg-primary/15 overflow-clip">
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('caption'),
                }}
            ></SectionHeader>
        </SectionWrapper>
    );
};
