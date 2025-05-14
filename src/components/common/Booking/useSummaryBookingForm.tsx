import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Timer } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { CreateReservationDtoForSchema } from '@/actions/booking/booking';
import { useBooking } from '@/hooks/queries/booking/useBooking';
import { defaultLocale } from '@/i18n/routing';
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
    const [isRedirecting, setIsRedirecting] = useState(false);
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

    const TimerIcon: React.ReactNode = <Timer className="size-4" />;

    useEffect(() => {
        if (mutation.isSuccess) {
            toast.success(
                locale === defaultLocale
                    ? 'Reserva creada con éxito'
                    : 'Booking created successfully',
                {
                    description:
                        locale === defaultLocale
                            ? 'Redirigiendo. Espere un momento...'
                            : 'Redirecting. Please wait...',
                    duration: 2000,
                    icon: TimerIcon,
                }
            );
            setIsRedirecting(true);
        }
        if (mutation.isError) {
            toast.error(
                (mutation.error ?? locale === defaultLocale)
                    ? 'Error al crear la reserva'
                    : 'Error creating booking'
            );
        }
        return () => {
            setIsRedirecting(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mutation.isSuccess, mutation.isError, locale]);

    // useEffect(() => {
    //     let toastId: string | number | undefined;
    //     if (mutation.isPending && !mutation.isError) {
    //         toastId = toast.loading(
    //             locale === defaultLocale
    //                 ? 'Creando reserva...'
    //                 : 'Creating booking...'
    //         );
    //     }
    //     if (mutation.isSuccess && toastId) {
    //         toast.dismiss(toastId);
    //     }
    //     //
    // }, [mutation.isPending, mutation.isError, mutation.isSuccess]);

    return { form, onSubmit, mutation, isRedirecting };
}
