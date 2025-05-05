// import { useTransition } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
// import { toast } from 'sonner';
import { z } from 'zod';

import { useBooking } from '@/hooks/queries/booking/useBooking';
// import { bookingOps } from '@/actions/action-setup';
// import { processError } from '@/lib/errors';
import { getCheckInDate, getCheckOutDate } from '@/lib/timedate/peru-datetime';

const today = getCheckInDate();
const tomorrowDate = new Date(today.getTime()); // Crear una copia
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = getCheckOutDate(tomorrowDate);

export const schema = z.object({
    // name: z.string().min(1, { message: 'Name is required' }),
    // email: z.string().email({ message: 'Invalid email address' }),
    // phone: z.string().min(1, { message: 'Phone number is required' }),
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
    // specialRequests: z.string().optional(),
});
export type BookingSummaryFormValues = z.infer<typeof schema>;

export function useSummaryBookingForm() {
    // const [isPending, startTransition] = useTransition();
    const { useCreateBooking } = useBooking();
    const form = useForm<BookingSummaryFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            // name: '',
            // email: '',
            // phone: '',
            checkInDate: today,
            checkOutDate: tomorrow,
            guestNumber: 1,
            roomId: undefined,
            // specialRequests: '',
        },
        mode: 'onBlur',
        reValidateMode: 'onChange',
    });

    const mutation = useCreateBooking();

    const onSubmit = async (data: BookingSummaryFormValues) => {
        mutation.mutate(data);
        // startTransition(async () => {
        //     try {
        //         await bookingOps.create('/', data);
        //         // Aquí puedes manejar el envío del formulario, como enviar los datos a una API
        //     } catch (error) {
        //         toast.error(
        //             'Error al enviar el formulario: ' + processError(error)
        //         );
        //         // Aquí puedes manejar errores, como mostrar notificaciones
        //     }
        // });
    };

    return { form, onSubmit, mutation };
}
