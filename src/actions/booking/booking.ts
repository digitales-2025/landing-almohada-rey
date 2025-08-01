import { SupportedLocales } from '@/i18n/routing';
import { components } from '@/types/api';
import { BaseApiResponse } from '@/types/api/types';

// import { getTranslations } from 'next-intl/server';

// const t = await getTranslations('IndexPageBooking.moreReservationDetailsSection');
export type Reservation = components['schemas']['Reservation'];
export type DetailedReservation = components['schemas']['DetailedReservation'];
export type CreateLandingReservationDto =
    components['schemas']['CreateLandingReservationDto'];

export type CustomerDocumentType = 'DNI' | 'PASSPORT' | 'FOREIGNER_CARD';
export type PaymentAndBookingResponse = BaseApiResponse<Reservation>;

export const CustomerDocumentTypeEnum: Record<
    CustomerDocumentType,
    CustomerDocumentType
> = {
    DNI: 'DNI',
    PASSPORT: 'PASSPORT',
    FOREIGNER_CARD: 'FOREIGNER_CARD',
};
// export const CustomerDocumentTypeLabel: Record<CustomerDocumentType, string> = {
//     DNI: t('input1.docTypeField.values.dni'),
//     PASSPORT: t('input1.docTypeField.values.passport'),
//     FOREIGNER_CARD: t('input1.docTypeField.values.carnetExtranjeria')
// };
export type SummaryBooking = {
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

export type LandingRequestDto<T> = T & {
    //This should be in a higher level type file
    locale: SupportedLocales;
};

export type CheckRoomAvailabilityFormValues = {
    checkInDate: Date;
    checkOutDate: Date;
    guestNumber: number;
    roomId?: string;
};

export type CreateReservationDtoForSchema = CheckRoomAvailabilityFormValues;

export type ReservationUpdateDtoForSchema = {
    checkInDate: Date;
    checkOutDate: Date;
    guestNumber: number;
    roomId: string;
};

export type ReservationUpdateDto = {
    checkInDate: string;
    checkOutDate: string;
    guestNumber: number;
    roomId: string;
};

export type CustomerDto = {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    documentType: CustomerDocumentType;
    documentNumber: string;
};

export type PaymentData = {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
};

export type BookingForSchema = CustomerDto & ReservationUpdateDto;

export type ConfirmBookingDtoForSchema = {
    customer: CustomerDto;
    reservation: ReservationUpdateDtoForSchema;
    // payment: PaymentData;
    observations?: string;
    didAcceptExtraServices?: boolean;
    didAcceptTermsAndConditions?: boolean;
};

export type ConfirmBookingDto = {
    customer: CustomerDto;
    reservation: ReservationUpdateDto;
    // payment: PaymentData;
    observations?: string;
    didAcceptExtraServices?: boolean;
    didAcceptTermsAndConditions?: boolean;
};

// type RoomAvailabilityResponse = DetailedRoom[];
