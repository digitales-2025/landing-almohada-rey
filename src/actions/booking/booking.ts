import { injectable } from 'inversify';

import { GetResponse } from '@/types/api/actions-crud';
import { BaseActionOps } from '../../lib/actions/BaseActionOps';
import { DetailedRoom } from '../rooms/rooms';

type SummaryBooking = {
    id: string;
    name: string;
    email: string;
    phone: string;
    checkInDate: string;
    checkOutDate: string;
    guestNumber: number;
    specialRequests?: string;
};

export type CheckRoomAvailabilityDto = {
    checkInDate: string;
    checkOutDate: string;
    guestNumber: number;
    roomId?: string;
};

export type CheckRoomAvailabilityFormValues = {
    checkInDate: Date;
    checkOutDate: Date;
    guestNumber: number;
    roomId?: string;
};

// type RoomAvailabilityResponse = DetailedRoom[];

@injectable()
export class BookingOps extends BaseActionOps<SummaryBooking> {
    async getAvailableRooms(
        dto: CheckRoomAvailabilityDto
    ): Promise<GetResponse<DetailedRoom>> {
        const response = await this.get<DetailedRoom>('/landing-reservation', {
            params: dto,
        });
        return response;
    }
}
