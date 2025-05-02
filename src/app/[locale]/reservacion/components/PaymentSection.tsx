import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
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
import { cn } from '@/lib/utils';
import { BaseApiResponse } from '@/types/api/types';
import { FormValues } from '../hooks/server.booking.schema';
import { FormGrid, labelClassname } from './MoreBookingDetailsSection';

interface Props {
    form: UseFormReturn<FormValues>;
    mutatioResult: UseMutationResult<
        BaseApiResponse<DetailedReservation>,
        any,
        ConfirmBookingDtoForSchema,
        unknown
    >;
}
export const PaymentSection = ({ form, mutatioResult }: Props) => {
    const t = useTranslations('IndexPageBooking.paymentDetailsSection');
    const paymentInpuClassnames = cn(
        'border-secondary/30 rounded-none shadow-none w-full bg-primary-foreground px-3 md:px-5 min-h-[50px] md:min-h-[72px] border-y-[1px] border-x-[1px] bg-primary-foreground'
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
                                className={paymentInpuClassnames}
                                disabled={mutatioResult.isPending}
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
                name="payment.cardNumber"
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
                                disabled={mutatioResult.isPending}
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
                            <Input
                                {...field}
                                type="text"
                                className={paymentInpuClassnames}
                                disabled={mutatioResult.isPending}
                            />
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
            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    {formGrid.items.map((item, index) => (
                        <React.Fragment key={index}>{item}</React.Fragment>
                    ))}
                </div>
                <div className="flex flex-col gap-4 justify-center w-fit">
                    <div className="flex gap-2">
                        <img
                            className="max-h-64"
                            src="/booking/PCICertification.png"
                            alt="PCI Certification"
                        />
                        <img
                            className="max-h-64"
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
