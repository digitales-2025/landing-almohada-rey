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
import {
    inputCommonClassnames,
    labelClassname,
} from './MoreBookingDetailsSection';

interface Props {
    form: UseFormReturn<FormValues>;
    mutatioResult: UseMutationResult<
        BaseApiResponse<DetailedReservation>,
        any,
        ConfirmBookingDtoForSchema,
        unknown
    >;
    children?: React.ReactNode;
}

export const AdditionalInfoSection = ({
    form,
    mutatioResult,
    children,
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
                                disabled={mutatioResult.isPending}
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
