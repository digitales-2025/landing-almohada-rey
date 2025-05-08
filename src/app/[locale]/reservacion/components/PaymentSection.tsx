import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

import {
    ConfirmBookingDtoForSchema,
    DetailedReservation,
} from '@/actions/booking/booking';
import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { cn } from '@/lib/utils';
import { BaseApiResponse } from '@/types/api/types';
import { FormValues } from '../hooks/server.booking.schema';
import { BookingWebSocketHookReturnType } from '../hooks/useBookingWs';
import { FormGrid, labelClassname } from './MoreBookingDetailsSection';

interface Props {
    form: UseFormReturn<FormValues>;
    mutatioResult: UseMutationResult<
        BaseApiResponse<DetailedReservation>,
        any,
        ConfirmBookingDtoForSchema,
        unknown
    >;
    wsConnectionResult: BookingWebSocketHookReturnType;
    disabled?: boolean;
}
export const PaymentSection = ({ form, mutatioResult, disabled }: Props) => {
    const t = useTranslations('IndexPageBooking.paymentDetailsSection');
    const textClassname =
        'text-secondary text-sm md:text-base lg:text-p tracking-normal';
    const paymentInpuClassnames = cn(
        'border-secondary/30 rounded-none shadow-none w-full bg-primary-foreground px-3 md:px-5 min-h-[50px] md:min-h-[72px] border-y-[1px] border-x-[1px]',
        textClassname
    );

    const formGrid: FormGrid = {
        items: [
            <FormField
                key={'inputItem1'}
                control={form.control}
                name="payment.cardNumber"
                render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className={labelClassname}>
                            {t('input1.label')}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                placeholder={t('input1.placeholder')}
                                className={paymentInpuClassnames}
                                disabled={mutatioResult.isPending || disabled}
                                maxLength={19} // 16 digits + 3 spaces
                                onChange={e => {
                                    // Remove all non-digit characters
                                    const value = e.target.value.replace(
                                        /\D/g,
                                        ''
                                    );

                                    // Format with spaces after every 4 digits
                                    let formatted = '';
                                    for (let i = 0; i < value.length; i++) {
                                        if (i > 0 && i % 4 === 0) {
                                            formatted += ' ';
                                        }
                                        formatted += value[i];
                                    }

                                    // Validate the card number using Luhn algorithm and regex patterns
                                    if (value.length >= 13) {
                                        // Check if it's a valid card format (starts with proper digits)
                                        const isValidCardFormat =
                                            /^(4|5[1-5]|3[47]|6011|36|30[0-5])/.test(
                                                value
                                            );

                                        if (!isValidCardFormat) {
                                            form.setError(
                                                'payment.cardNumber',
                                                {
                                                    type: 'manual',
                                                    message: t(
                                                        'input1.errors.invalid'
                                                    ),
                                                }
                                            );
                                        } else {
                                            form.clearErrors(
                                                'payment.cardNumber'
                                            );
                                        }
                                    }

                                    field.onChange(formatted);
                                }}
                                onBlur={e => {
                                    // Final validation on blur
                                    const digits = e.target.value.replace(
                                        /\D/g,
                                        ''
                                    );
                                    if (
                                        digits.length > 0 &&
                                        (digits.length < 13 ||
                                            digits.length > 16)
                                    ) {
                                        form.setError('payment.cardNumber', {
                                            type: 'manual',
                                            message: t(
                                                'input1.errors.invalidLength',
                                                {
                                                    minLength: '16',
                                                    maxLength: '16',
                                                }
                                            ),
                                        });
                                    }
                                    field.onBlur();
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input1.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
            <FormField
                key={'inputItem2'}
                control={form.control}
                name="payment.cardHolderName"
                render={({ field }) => (
                    <FormItem className="col-span-1 md:col-span-2">
                        <FormLabel className={labelClassname}>
                            {t('input2.label')}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                className={paymentInpuClassnames}
                                disabled={mutatioResult.isPending || disabled}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input2.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
            <FormField
                key={'inputItem3'}
                control={form.control}
                name="payment.expirationDate"
                render={({ field }) => (
                    <FormItem className="md:col-span-1">
                        <FormLabel className={labelClassname}>
                            {t('input3.label')}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                className={paymentInpuClassnames}
                                disabled={mutatioResult.isPending}
                                placeholder={t('input3.placeholder')}
                                maxLength={5}
                                onChange={e => {
                                    const value = e.target.value;

                                    // Handle backspace/delete by passing the value directly
                                    if (
                                        value.length < field.value?.length ||
                                        value === ''
                                    ) {
                                        field.onChange(value);
                                        return;
                                    }

                                    // Remove non-digits
                                    const digits = value.replace(/\D/g, '');

                                    let formattedValue = '';
                                    if (digits.length <= 2) {
                                        // Just format the month, with minimal validation
                                        formattedValue = digits;
                                    } else {
                                        // Format as MM/YY
                                        formattedValue = `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;

                                        // Only validate complete entries when all 4 digits are entered
                                        if (digits.length >= 4) {
                                            const month = parseInt(
                                                digits.slice(0, 2)
                                            );
                                            const year = parseInt(
                                                digits.slice(2, 4)
                                            );
                                            const currentYear =
                                                new Date().getFullYear() % 100;
                                            const currentMonth =
                                                new Date().getMonth() + 1;

                                            // Validate month is between 1-12
                                            if (month < 1 || month > 12) {
                                                form.setError(
                                                    'payment.expirationDate',
                                                    {
                                                        type: 'manual',
                                                        message: t(
                                                            'input3.errors.invalidMonth'
                                                        ),
                                                    }
                                                );
                                            }
                                            // Validate card is not expired
                                            else if (
                                                year < currentYear ||
                                                (year === currentYear &&
                                                    month < currentMonth)
                                            ) {
                                                form.setError(
                                                    'payment.expirationDate',
                                                    {
                                                        type: 'manual',
                                                        message: t(
                                                            'input3.errors.expiratedDate'
                                                        ),
                                                    }
                                                );
                                            } else {
                                                form.clearErrors(
                                                    'payment.expirationDate'
                                                );
                                            }
                                        }
                                    }

                                    field.onChange(formattedValue);
                                }}
                                onBlur={e => {
                                    const value = e.target.value;
                                    // If user enters only 1 digit for month, add leading zero
                                    if (value.length === 1) {
                                        field.onChange(`0${value}`);
                                    }

                                    // If user entered month but not year, we should show an error
                                    if (
                                        value.length > 0 &&
                                        value.length < 4 &&
                                        !value.includes('/')
                                    ) {
                                        form.setError(
                                            'payment.expirationDate',
                                            {
                                                type: 'manual',
                                                message: t(
                                                    'input3.errors.incomplete'
                                                ),
                                            }
                                        );
                                    }

                                    field.onBlur();
                                }}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input3.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
            <FormField
                key={'inputItem4'}
                control={form.control}
                name="payment.cvv"
                render={({ field }) => (
                    <FormItem className="md:col-span-1">
                        <FormLabel className={labelClassname}>
                            {t('input4.label')}
                        </FormLabel>
                        <FormControl>
                            {/* <Input
                                {...field}
                                type="text"
                                className={paymentInpuClassnames}
                                disabled={mutatioResult.isPending}
                            /> */}
                            <InputOTP
                                maxLength={3}
                                {...field}
                                pattern={REGEXP_ONLY_DIGITS}
                                disabled={mutatioResult.isPending || disabled}
                            >
                                <InputOTPGroup className="w-full">
                                    {[0, 1, 2].map(index => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            className={
                                                'border-secondary/30 !rounded-none shadow-none w-full bg-primary-foreground px-3 md:px-5 min-h-[50px] md:min-h-[72px]'
                                            }
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormDescription>
                            {t('input4.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
        ],
    };
    return (
        <SectionWrapper className={sectionLayoutClassnames}>
            <SectionHeader
                onlyTitle={true}
                headerTitle={{
                    text: t('title'),
                }}
                alignment="left"
            ></SectionHeader>
            {/* Add payment form or relevant components here */}
            <div className="flex flex-col xl:flex-row gap-4 justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow w-full xl:w-auto">
                    {formGrid.items.map((item, index) => (
                        <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                </div>
                <div className="flex flex-col gap-4 justify-center w-fit">
                    <div className="flex gap-2">
                        <img
                            className=" max-h-32 lg:max-h-64"
                            src="/booking/PCICertification.png"
                            alt="PCI Certification"
                        />
                        <img
                            className="max-h-32 lg:max-h-64"
                            src="/booking/SSLCertification.png"
                            alt="SSL Certification"
                        />
                    </div>
                    <div className="text-center text-sm md:text-base lg:text-p tracking-normal text-secondary">
                        {t('safePaymentAdvertisement.title')}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
