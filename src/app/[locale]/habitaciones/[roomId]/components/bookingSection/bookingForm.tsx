'use client';

import { useRef } from 'react';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
import { BookingSummaryForm } from '@/components/common/Booking/BookingSummaryForm';
import { SmallFormError } from '@/components/common/Errors/FormErrors';
import { OneRowLoadingFormSkeleton } from '@/components/common/loading/LoadingFormSkeleton';
import { useAvailability } from '@/hooks/queries/booking/useRoomAvailability';
import { getCheckInDate, getCheckOutDate } from '@/lib/timedate/peru-datetime';

export const SpecificRoomBookingForm = ({ roomId }: { roomId: string }) => {
    const today = getCheckInDate();
    const tomorrowDate = new Date(today.getTime()); // Crear una copia
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = getCheckOutDate(tomorrowDate);

    const defaultAvailabilityDataRef = useRef<CheckRoomAvailabilityDto>({
        checkInDate: today.toISOString(),
        checkOutDate: tomorrow.toISOString(),
        guestNumber: 1,
        roomId: roomId,
    });

    const { query: availableRooms } = useAvailability(
        defaultAvailabilityDataRef.current
    );

    if (availableRooms.isError) {
        return <SmallFormError></SmallFormError>;
    }

    if (!availableRooms.data || availableRooms.isLoading) {
        return (
            <OneRowLoadingFormSkeleton
                className="w-full h-full min-h-[164px] md:min-h-[168px] lg:min-h-[172px] bg-primary-foreground p-4"
                itemClassName="!bg-secondary/5 h-[88px] md:h-[95px]"
            ></OneRowLoadingFormSkeleton>
        );
    }

    return (
        <BookingSummaryForm
            className="px-0 lg:px-0"
            formClassname="grid md:grid-cols-2 2xl:grid-cols-2 gap-2 gap-y-4 md:gap-3 lg:gap-4"
            submitButtonClassname="lg:col-span-2 xl:col-span-2 2xl:col-span-2"
            defaultValues={{
                checkInDate: today,
                checkOutDate: tomorrow,
                guestNumber: defaultAvailabilityDataRef.current.guestNumber,
                roomId: roomId,
            }}
        ></BookingSummaryForm>
    );
};
