import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
import {
    createBookingSummary,
    getAvailableRooms,
} from '@/actions/booking/booking.actions';

export const useBooking = () => {
    // const queryClient = useQueryClient();
    const useRoomAvailabilityQuery = (
        availabityDto: CheckRoomAvailabilityDto
    ) => {
        return useQuery({
            queryKey: [
                'availableRooms',
                availabityDto.checkInDate + availabityDto.checkOutDate,
            ],
            queryFn: async () => {
                const response = await getAvailableRooms(availabityDto);
                if ('error' in response) {
                    toast.error(response.error);
                    return [];
                }
                return response;
            },
        });
    };

    const useCreateBooking = () => {
        return useMutation({
            mutationFn: async (bookingData: any) => {
                const response = await createBookingSummary(bookingData);
                if ('error' in response) {
                    throw new Error(response.error);
                }
                return response;
            },
            onSuccess: () => {
                toast.success('Booking created successfully');
            },
            onError: (error: any) => {
                toast.error(error.message || 'Failed to create booking');
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
    };
};
