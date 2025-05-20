import React from 'react';
import { useTranslations } from 'next-intl';

import { BookingSumamryProps } from '@/components/common/Booking/BookingSummarySection';
import { KeepInTouchCTA } from '@/components/common/KeepInTouchCTA/KeepInTouchCTA';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { cn } from '@/lib/utils';
import { SpecificRoomBookingForm } from './bookingForm';

export const BookingSection = ({ roomId }: { roomId: string }) => {
    const t = useTranslations('IndexPageRooms.bookingSection');

    const bookingSummary: BookingSumamryProps = {
        className: 'bg-transparent relative z-10',
        title: {
            text: t('title').toUpperCase(),
        },
        caption: {
            text: t('caption'),
            className: 'text-secondary',
        },
        description: {
            text: t('description'),
            className: 'text-secondary',
        },
    };
    return (
        <div>
            <SectionWrapper>
                <div className="relative overflow-clip truncate">
                    {/* <BookingSummarySection
                        caption={bookingSummary.caption}
                        description={bookingSummary.description}
                        title={bookingSummary.title}
                        className={cn(bookingSummary.className)}
                    ></BookingSummarySection> */}
                    <div className="flex flex-col absolute w-full h-full !mb-0 z-0">
                        <div className="basis-1/2"></div>
                        <div className="basis-1/2 bg-primary/5"></div>
                    </div>
                    <div className="lg:px-16 xl:px-24 2xl:px-32 relative z-10">
                        <div className="border-1 border-secondary px-4 md:px-6 lg:px-8 xl:px-12 py-8 pb-0 sm:py-16 bg-primary-foreground flex flex-col items-center justify-center gap-6">
                            <SectionHeader
                                headerTitle={bookingSummary.title}
                                description={bookingSummary.caption}
                            ></SectionHeader>
                            <p
                                className={cn(
                                    'text-secondary text-center text-balance text-sm md:text-base lg:text-p lg:tracking-normal max-w-prose mx-auto',
                                    bookingSummary.description.className
                                )}
                            >
                                {bookingSummary.description.text}
                            </p>
                            {/* <BookingSummaryForm
                                className="px-0 lg:px-0"
                                formClassname="grid md:grid-cols-2 2xl:grid-cols-2 gap-2 gap-y-4 md:gap-3 lg:gap-4"
                                submitButtonClassname="lg:col-span-2 xl:col-span-2 2xl:col-span-2"
                            ></BookingSummaryForm> */}
                            <SpecificRoomBookingForm
                                roomId={roomId}
                            ></SpecificRoomBookingForm>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
            <KeepInTouchCTA></KeepInTouchCTA>
        </div>
    );
};
