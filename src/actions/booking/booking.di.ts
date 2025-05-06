import { injectable } from 'inversify';

import { BaseActionOps } from '@/lib/actions/BaseActionOps';
import { GetResponse, MutationResponse } from '@/types/api/actions-crud';
import { DetailedRoom } from '../rooms/room';
import {
    CheckRoomAvailabilityDto,
    ConfirmBookingDto,
    DetailedReservation,
    LandingRequestDto,
    ReservationUpdateDto,
    SummaryBooking,
} from './booking';

@injectable()
export class BookingOps extends BaseActionOps<SummaryBooking> {
    async getAvailableRooms(
        dto: LandingRequestDto<CheckRoomAvailabilityDto>
    ): Promise<GetResponse<DetailedRoom>> {
        const response = await this.get<DetailedRoom>(
            '/landing-reservation/check-available-rooms',
            {
                params: dto,
            }
        );
        return response;
    }

    async updateBooking(
        id: string,
        dto: ReservationUpdateDto
    ): Promise<MutationResponse<DetailedReservation>> {
        const response = await this.update<DetailedReservation>(
            '/update-reservation',
            id,
            dto
        );
        return response;
    }

    async confirmBookingAndPay(
        id: string, //booking id
        dto: ConfirmBookingDto
    ): Promise<MutationResponse<DetailedReservation>> {
        const response = await this.update<DetailedReservation>(
            '/confirm-booking',
            id,
            dto
        );
        return response;
    }
}
