import { components } from '@/types/api';

export type ReservationErrorReasons =
    | 'RESERVATION_CANCELLED'
    | 'RESERVATION_NOTIFICATION'
    | 'RESERVATION_REDIRECT';
export type BaseReservationWsActionsDto =
    components['schemas']['BaseReservationWsActionsDto'];
export type BaseWsResponse = components['schemas']['BaseWsResponse'];
export type StartBookingReservationResponseDto =
    components['schemas']['StartBookingReservationResponseDto'];
export type BaseWsErrorResponse = components['schemas']['BaseWsErrorResponse'];
export type OnConnectionResponse =
    components['schemas']['OnConnectionResponse'];
