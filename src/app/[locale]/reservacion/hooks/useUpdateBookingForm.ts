import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
    Reservation,
    ReservationUpdateDtoForSchema,
} from '@/actions/booking/booking';
import { useBooking } from '@/hooks/queries/booking/useBooking';
import { getCheckInDate, getCheckOutDate } from '@/lib/timedate/peru-datetime';

export type ReservationUpdateDto = Pick<
    Reservation,
    'id' | 'checkInDate' | 'checkOutDate' | 'roomId'
> & {
    guestNumber: number;
};

const today = getCheckInDate();
const tomorrowDate = new Date(today.getTime()); // Crear una copia
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = getCheckOutDate(tomorrowDate);

export function useUpdateBookingForm(reservation: ReservationUpdateDto) {
    const t = useTranslations('IndexPageBooking');

    const updateReservationSchema = z.object({
        checkInDate: z.date().min(today, {
            message: t('updateReservationDates.input1.errors.dateError.before'),
        }),
        checkOutDate: z.date().min(tomorrow, {
            message: t('updateReservationDates.input2.errors.dateError.before'),
        }),
        guestNumber: z.coerce
            .number({
                required_error: t(
                    'updateReservationDates.input3.errors.required'
                ),
            })
            .min(1, {
                message: t('updateReservationDates.input3.errors.min', {
                    min: String(1),
                }),
            }),
        roomId: z
            .string({
                required_error: t(
                    'updateReservationDates.input4.errors.required'
                ),
            })
            .uuid({
                message: t('updateReservationDates.input4.errors.noAvailable'),
            }),
    }) satisfies z.ZodType<ReservationUpdateDtoForSchema>;

    type UpdateBookingFormValues = z.infer<typeof updateReservationSchema>;

    const { useUpdateBooking } = useBooking();

    const mutation = useUpdateBooking(reservation.id);

    const form = useForm<UpdateBookingFormValues>({
        resolver: zodResolver(updateReservationSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
        defaultValues: {
            checkInDate: new Date(reservation.checkInDate),
            checkOutDate: new Date(reservation.checkOutDate),
            guestNumber: reservation.guestNumber,
            roomId: reservation.roomId,
        },
    });

    const onSubmit = async (data: UpdateBookingFormValues) => {
        mutation.mutate(data);
    };

    return {
        form,
        onSubmit,
        mutation,
    };
}
