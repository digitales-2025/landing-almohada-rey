import { SupportedLocales } from '@/i18n/routing';
import { BaseActionOps, wrapUriWithParams } from '@/lib/actions/BaseActionOps';
import { GetResponse, MutationResponse } from '@/types/api/actions-crud';
import { DetailedRoom } from '../rooms/room';
import {
    CheckRoomAvailabilityDto,
    ConfirmBookingDto,
    DetailedReservation,
    LandingRequestDto,
    Reservation,
    ReservationUpdateDto,
    SummaryBooking,
} from './booking';

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
        reservationId: string, //booking id
        locale: SupportedLocales,
        dto: ConfirmBookingDto
    ): Promise<MutationResponse<Reservation>> {
        const response = await this.create<Reservation>(
            wrapUriWithParams({
                uri: '/landing-reservation/confirm-reservation',
                params: {
                    locale,
                    reservationId,
                },
            }),
            dto
        );
        return response;
    }
}
