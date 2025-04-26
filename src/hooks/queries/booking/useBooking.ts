import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

import { bookingOps } from '@/actions/action-setup';
import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';

export const useBooking = () => {
    const useRoomAvailabilityQuery = (
        availabityDto: CheckRoomAvailabilityDto
    ) => {
        return useQuery({
            queryKey: [
                'availableRooms',
                availabityDto.checkInDate + availabityDto.checkOutDate,
            ],
            queryFn: async () => {
                const response =
                    await bookingOps.getAvailableRooms(availabityDto);
                if ('error' in response) {
                    toast.error(response.error);
                    return [];
                }
                return response;
            },
        });
    };

    return {
        useRoomAvailabilityQuery,
    };
};
