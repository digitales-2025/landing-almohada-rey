'use server';

import { defaultLocale, SupportedLocales } from '@/i18n/routing';
import { bookingOps } from '../action-setup';
import {
    CheckRoomAvailabilityDto,
    ConfirmBookingDto,
    ConfirmBookingDtoForSchema,
    CreateLandingReservationDto,
    CreateReservationDtoForSchema,
    LandingRequestDto,
    ReservationUpdateDto,
    ReservationUpdateDtoForSchema,
} from './booking';

export async function createBookingSummary(
    data: CreateReservationDtoForSchema,
    locale: SupportedLocales
) {
    try {
        const dtoToSend: CreateLandingReservationDto = {
            ...data,
            checkInDate: data.checkInDate.toISOString(),
            checkOutDate: data.checkOutDate.toISOString(),
        };
        const newBookingForLanding = await bookingOps.create(
            '/landing-reservation/create-reservation?locale=' + locale,
            dtoToSend
        );
        if ('error' in newBookingForLanding) {
            throw new Error(newBookingForLanding.error);
        }
        if (!newBookingForLanding.success) {
            throw new Error(newBookingForLanding.message);
        }
        if (newBookingForLanding.data.id) {
            // redirect({
            //     href: '/reservacion/' + newBookingForLanding.data.id,
            //     locale: locale,
            // });
            return newBookingForLanding;
        }
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error(
            locale == defaultLocale ? 'Error desconocido' : 'Unknown Error'
        );
    }
}

export async function getAvailableRooms(
    dto: LandingRequestDto<CheckRoomAvailabilityDto>
) {
    return bookingOps.getAvailableRooms(dto);
}

export async function updateBooking(
    id: string,
    data: ReservationUpdateDtoForSchema
) {
    const dtoToSend: ReservationUpdateDto = {
        ...data,
        checkInDate: data.checkInDate.toISOString(),
        checkOutDate: data.checkOutDate.toISOString(),
    };
    return bookingOps.updateBooking(id, dtoToSend);
}

export async function confirmBookingAndPay(
    id: string,
    data: ConfirmBookingDtoForSchema
) {
    const dtoToSend: ConfirmBookingDto = {
        customer: data.customer,
        reservation: {
            ...data.reservation,
            checkInDate: data.reservation.checkInDate.toISOString(),
            checkOutDate: data.reservation.checkOutDate.toISOString(),
        },
        payment: data.payment,
        observations: data.observations,
        didAcceptExtraServices: data.didAcceptExtraServices,
        didAcceptTermsAndConditions: data.didAcceptTermsAndConditions,
    };
    return bookingOps.confirmBookingAndPay(id, dtoToSend);
}
