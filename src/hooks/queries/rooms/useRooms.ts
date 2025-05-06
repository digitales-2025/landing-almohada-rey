import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { toast } from 'sonner';

import { getAllRoomTypes } from '@/actions/rooms/room.actions';

export const useRooms = () => {
    const locale = useLocale();
    const useRoomTypeQuery = () => {
        return useQuery({
            queryKey: ['roomTypes', locale],
            queryFn: async () => {
                const response = await getAllRoomTypes({
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

    return {
        useRoomTypeQuery,
    };
};
