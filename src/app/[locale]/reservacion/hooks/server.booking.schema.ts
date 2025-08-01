import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

import {
    ConfirmBookingDtoForSchema,
    CustomerDocumentType,
    CustomerDto,
    // PaymentData,
    ReservationUpdateDtoForSchema,
} from '@/actions/booking/booking';
import { getCheckInDate, getCheckOutDate } from '@/lib/timedate/peru-datetime';

const today = getCheckInDate();
const tomorrowDate = new Date(today.getTime()); // Crear una copia
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = getCheckOutDate(tomorrowDate);
const t = await getTranslations('IndexPageBooking');
const reservationSchema = z.object({
    checkInDate: z.date().min(today, {
        message: t('updateReservationDates.input3.errors.dateError.before'),
    }),
    checkOutDate: z.date().min(tomorrow, {
        message: t('updateReservationDates.input4.errors.dateError.before'),
    }),
    guestNumber: z.coerce
        .number({
            required_error: t('updateReservationDates.input3.errors.required'),
        })
        .min(1, {
            message: t('updateReservationDates.input1.errors.min', {
                min: String(1),
            }),
        }),
    roomId: z
        .string({
            required_error: t('updateReservationDates.input4.errors.required'),
        })
        .uuid({
            message: t('updateReservationDates.input2.errors.noAvailable'),
        }),
}) satisfies z.ZodType<ReservationUpdateDtoForSchema>;

const customerSchema = z.object({
    name: z
        .string({
            required_error: t(
                'moreReservationDetailsSection.input2.errors.required'
            ),
        })
        .min(1, {
            message: t(
                'moreReservationDetailsSection.input2.errors.minLength',
                { minLength: String(1) }
            ),
        }),
    lastname: z
        .string({
            required_error: t(
                'moreReservationDetailsSection.input3.errors.required'
            ),
        })
        .min(1, {
            message: t(
                'moreReservationDetailsSection.input3.errors.minLength',
                { minLength: String(1) }
            ),
        }),
    email: z
        .string({
            required_error: t(
                'moreReservationDetailsSection.input4.errors.required'
            ),
        })
        .min(8, {
            message: t(
                'moreReservationDetailsSection.input4.errors.minLength',
                { minLength: String(8) }
            ),
        })
        .email({
            message: t('moreReservationDetailsSection.input4.errors.invalid'),
        }),
    phone: z
        .string({
            required_error: t(
                'moreReservationDetailsSection.input5.errors.required'
            ),
        })
        .min(3, {
            message: t(
                'moreReservationDetailsSection.input5.errors.minLength',
                { minLength: String(3) }
            ),
        }),
    documentType: z.enum<
        CustomerDocumentType,
        [CustomerDocumentType, ...CustomerDocumentType[]]
    >(['DNI', 'PASSPORT', 'FOREIGNER_CARD'], {
        errorMap: issue => ({
            message:
                issue.code === 'invalid_type' && issue.received === 'undefined'
                    ? t(
                          'moreReservationDetailsSection.input1.docTypeField.errors.required'
                      )
                    : t(
                          'moreReservationDetailsSection.input1.docTypeField.errors.invalid'
                      ),
        }),
    }),
    documentNumber: z
        .string({
            required_error: t(
                'moreReservationDetailsSection.input1.errors.required'
            ),
        })
        .min(1, {
            message: t(
                'moreReservationDetailsSection.input1.errors.minLength',
                { minLength: String(1) }
            ),
        }),
}) satisfies z.ZodType<CustomerDto>;

// const paymentSchema = z.object({
//     cardNumber: z
//         .string({
//             required_error: t('paymentDetailsSection.input1.errors.required'),
//         })
//         .min(16, {
//             message: t('paymentDetailsSection.input1.errors.minLength', {
//                 minLength: String(16),
//             }),
//         })
//         .max(16, {
//             message: t('paymentDetailsSection.input1.errors.maxLength', {
//                 maxLength: String(16),
//             }),
//         }),
//     cardHolderName: z
//         .string({
//             required_error: t('paymentDetailsSection.input2.errors.required'),
//         })
//         .min(1, {
//             message: t('paymentDetailsSection.input2.errors.minLength', {
//                 minLength: String(1),
//             }),
//         }),
//     expirationDate: z
//         .string({
//             required_error: t('paymentDetailsSection.input3.errors.required'),
//         })
//         .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
//             message: t('paymentDetailsSection.input3.errors.invalid'),
//         }),
//     cvv: z
//         .string({
//             required_error: t('paymentDetailsSection.input4.errors.required'),
//         })
//         .min(3, {
//             message: t('paymentDetailsSection.input4.errors.minLength', {
//                 minLength: String(3),
//             }),
//         })
//         .max(3, {
//             message: t('paymentDetailsSection.input4.errors.maxLength', {
//                 maxLength: String(3),
//             }),
//         }),
// }) satisfies z.ZodType<PaymentData>;

export const formSchema = z
    .object({
        reservation: reservationSchema,
        customer: customerSchema,
        // payment: paymentSchema,
        observations: z.string().optional(),
        didAcceptExtraServices: z.boolean().optional(),
        didAcceptTerms: z.boolean().refine(val => val === true, {
            message: t('submitSection.input1.errors.required'),
        }),
    })
    .refine(
        data => {
            const { checkInDate, checkOutDate } = data.reservation;
            return checkInDate < checkOutDate;
        },
        {
            message: t('updateReservationDates.input4.errors.dateError.after'),

            path: ['checkOutDate'],
        }
    ) satisfies z.ZodType<ConfirmBookingDtoForSchema>;

export type FormValues = z.infer<typeof formSchema>;
