import { useTranslations } from 'next-intl';

import {
    BookingSumamryProps,
    BookingSummarySection,
} from '@/components/common/Booking/BookingSummarySection';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { cn } from '@/lib/utils';

export const BookingSection = () => {
    const t = useTranslations('IndexPageRooms.bookingSection');

    const bookingSummary: BookingSumamryProps = {
        className: 'bg-transparent relative z-10 px-4 sm:px-6 lg:px-8 xl:px-20',
        title: {
            text: t('title').toUpperCase(),
        },
        caption: {
            text: t('caption'),
            className: 'text-primary-foreground',
        },
        description: {
            text: t('description'),
            className: 'text-primary-foreground',
        },
    };
    return (
        <SectionWrapper className="relative bg-primary/15 overflow-clip">
            <img
                className="w-full inset-0 absolute object-top object-cover h-full backdrop-blur-none bg-black/50"
                src="/rooms/bookingSectionPlaceholder.webp"
                alt="bg-pattern"
            />
            <div className="w-full h-full absolute inset-0 bg-black/50 z-[5]" />
            <BookingSummarySection
                caption={bookingSummary.caption}
                description={bookingSummary.description}
                title={bookingSummary.title}
                className={cn(bookingSummary.className)}
            ></BookingSummarySection>
        </SectionWrapper>
    );
};
