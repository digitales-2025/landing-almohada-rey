import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
import { useBooking } from './useBooking';

export const useAvailability = (defaultParams: CheckRoomAvailabilityDto) => {
    const [params, setParams] =
        useState<CheckRoomAvailabilityDto>(defaultParams);
    const { useRoomAvailabilityQuery } = useBooking();
    const query = useRoomAvailabilityQuery(params);

    const checkAvailability = (newParams: CheckRoomAvailabilityDto) => {
        setParams(newParams);
    };

    const selectRandomRoomByType = useCallback(
        (roomType: string) => {
            if (!query.data) return '';

            const roomsOfType = query.data.filter(
                room => room.RoomTypes.name === roomType
            );
            if (roomsOfType.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * roomsOfType.length
                );
                const selectedRoom = roomsOfType[randomIndex];
                return selectedRoom.id;
            }
            return '';
        },
        [query.data]
    );

    if (query.isError) {
        toast.error(query.error.message);
    }

    return {
        query,
        checkAvailability,
        selectRandomRoomByType,
    };
};
