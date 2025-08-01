import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';

import {
    ConfirmBookingDtoForSchema,
    Reservation,
} from '@/actions/booking/booking';
import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { BaseApiResponse } from '@/types/api/types';
import { FormValues } from '../hooks/server.booking.schema';
import { BookingWebSocketHookReturnType } from '../hooks/useBookingWs';
import {
    inputCommonClassnames,
    labelClassname,
} from './MoreBookingDetailsSection';

interface Props {
    form: UseFormReturn<FormValues>;
    mutationResult: UseMutationResult<
        BaseApiResponse<Reservation>,
        any,
        ConfirmBookingDtoForSchema,
        unknown
    >;
    wsConnectionResult: BookingWebSocketHookReturnType;
    children?: React.ReactNode;
    disabled?: boolean;
}

export const AdditionalInfoSection = ({
    form,
    mutationResult,
    children,
    disabled,
}: Props) => {
    const t = useTranslations('IndexPageBooking.AdditionalInfoSection');
    return (
        <SectionWrapper
            className={cn(sectionLayoutClassnames, 'bg-primary/10')}
        >
            <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className={labelClassname}>
                            {t('input1.label')}
                        </FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                className={inputCommonClassnames}
                                disabled={mutationResult.isPending || disabled}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input1.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {children}
        </SectionWrapper>
    );
};
