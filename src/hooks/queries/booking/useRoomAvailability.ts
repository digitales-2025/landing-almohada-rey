import { useState } from 'react';
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

    if (query.isError) {
        toast.error(query.error.message);
    }

    return {
        query,
        checkAvailability,
    };
};
