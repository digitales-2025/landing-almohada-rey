import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { CreateReservationDtoForSchema } from '@/actions/booking/booking';
import { useBooking } from '@/hooks/queries/booking/useBooking';
import { getCheckInDate, getCheckOutDate } from '@/lib/timedate/peru-datetime';

const today = getCheckInDate();
const tomorrowDate = new Date(today.getTime()); // Crear una copia
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = getCheckOutDate(tomorrowDate);

export const schema = z.object({
    checkInDate: z
        .date()
        .min(today, { message: 'Check-in date must be today or later' }),
    checkOutDate: z
        .date()
        .min(tomorrow, { message: 'Check-out date must be tomorrow or later' }),
    guestNumber: z.coerce
        .number()
        .min(1, { message: 'Number of guests is required' }),
    roomId: z.string().min(1, { message: 'Room ID is required' }),
}) satisfies z.ZodType<CreateReservationDtoForSchema>;
export type BookingSummaryFormValues = z.infer<typeof schema>;

export function useSummaryBookingForm() {
    const { useCreateBooking } = useBooking();
    const locale = useLocale();
    const form = useForm<BookingSummaryFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            checkInDate: today,
            checkOutDate: tomorrow,
            guestNumber: 1,
            roomId: undefined,
        },
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const mutation = useCreateBooking(locale);

    const onSubmit = async (data: BookingSummaryFormValues) => {
        mutation.mutate(data);
    };

    return { form, onSubmit, mutation };
}
