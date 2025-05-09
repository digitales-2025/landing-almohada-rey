import { useMutation, useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';

import {
    CheckRoomAvailabilityDto,
    ConfirmBookingDtoForSchema,
    CreateReservationDtoForSchema,
    ReservationUpdateDtoForSchema,
} from '@/actions/booking/booking';
import {
    confirmBookingAndPay,
    createBookingSummary,
    getAvailableRooms,
    updateBooking,
} from '@/actions/booking/booking.actions';
import { useRouter } from '@/i18n/navigation';
import { defaultLocale, SupportedLocales } from '@/i18n/routing';

export const useBooking = () => {
    // const queryClient = useQueryClient();
    const locale = useLocale();
    const router = useRouter();
    const useRoomAvailabilityQuery = (
        availabityDto: CheckRoomAvailabilityDto
    ) => {
        return useQuery({
            queryKey: [
                'availableRooms',
                availabityDto.checkInDate + availabityDto.checkOutDate,
                ,
                locale,
            ],
            queryFn: async () => {
                const response = await getAvailableRooms({
                    ...availabityDto,
                    locale,
                });
                if ('error' in response) {
                    toast.error(response.error);
                    return [];
                }
                return response;
            },
        });
    };

    const useCreateBooking = (locale: SupportedLocales) => {
        return useMutation({
            mutationFn: async (bookingData: CreateReservationDtoForSchema) => {
                const newBookingForLanding = await createBookingSummary(
                    bookingData,
                    locale
                );
                if (!newBookingForLanding) {
                    throw new Error(
                        locale === defaultLocale
                            ? 'Fallo la creacion de la reservación'
                            : 'Booking creation failed'
                    );
                }
                const { id } = newBookingForLanding.data;
                router.replace({
                    pathname: '/reservacion/' + id,
                });
            },
            onSuccess: () => {
                toast.success('Booking created successfully');
            },
            onError: (error: any) => {
                toast.error(error.message ?? 'Failed to create booking');
            },
        });
    };

    const useUpdateBooking = (reservationId: string) => {
        return useMutation({
            mutationFn: async (bookingData: ReservationUpdateDtoForSchema) => {
                const response = await updateBooking(
                    reservationId,
                    bookingData
                );
                if ('error' in response) {
                    throw new Error(response.error);
                }
                return response;
            },
        });
    };

    const useConfirmBooking = (reservationId: string) => {
        return useMutation({
            mutationFn: async (bookingData: ConfirmBookingDtoForSchema) => {
                const response = await confirmBookingAndPay(
                    reservationId,
                    bookingData
                );
                if ('error' in response) {
                    throw new Error(response.error);
                }
                return response;
            },
            onSuccess: () => {
                toast.success('Booking confirmed successfully');
            },
            onError: (error: any) => {
                toast.error(error.message || 'Failed to confirm booking');
            },
        });
    };
    // // Mutación para crear producto
    // const createMutation = useMutation<
    //     BaseApiResponse<Product>,
    //     Error,
    //     CreateProductDto
    // >({
    //     mutationFn: async data => {
    //         const response = await createProduct(data);
    //         if ('error' in response) {
    //             throw new Error(response.error);
    //         }
    //         // Retornamos directamente la respuesta ya que viene en el formato correcto
    //         return response;
    //     },
    //     onSuccess: async res => {
    //         const detailedProduct = await getDetailedProductById(res.data.id);
    //         if ('error' in detailedProduct) {
    //             throw new Error(detailedProduct.error);
    //         }
    //         queryClient.setQueryData<DetailedProduct[] | undefined>(
    //             ['detailed-products'],
    //             oldProducts => {
    //                 if (!oldProducts) return detailedProduct;
    //                 return [...oldProducts, ...detailedProduct];
    //             }
    //         );
    //         await queryClient.refetchQueries({
    //             queryKey: ['active-products'],
    //         });
    //         toast.success(res.message);
    //     },
    //     onError: error => {
    //         toast.error(error.message);
    //     },
    // });

    return {
        useRoomAvailabilityQuery,
        useCreateBooking,
        useUpdateBooking,
        useConfirmBooking,
    };
};
