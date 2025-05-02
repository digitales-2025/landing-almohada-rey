'use client';

import React from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { LargeFormError } from '@/components/common/Errors/FormErrors';
import { LargeLoadingFormSkeleton } from '@/components/common/loading/LoadingFormSkeleton';
import { PageLayout } from '@/components/layout/PageLayout';
import { resetPageClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { Form } from '@/components/ui/form';
import { useRouter } from '@/i18n/navigation';
import { AdditionalInfoSection } from './components/AdditionalInfoSection';
import { BookingHeroSection } from './components/bookingHeroSection';
import { AditionalDataReservationSection } from './components/MoreBookingDetailsSection';
import { PaymentSection } from './components/PaymentSection';
import { useBookingForm } from './hooks/useBookingForm';

export default function Page() {
    const t = useTranslations('IndexPageBooking');
    const locale = useLocale();
    const { form, confirmBookingResult, onSubmit } = useBookingForm(
        undefined,
        locale
    );
    const router = useRouter();

    if (confirmBookingResult.isPending) {
        return (
            <PageLayout>
                <BookingHeroSection></BookingHeroSection>
                <SectionWrapper>
                    <LargeLoadingFormSkeleton></LargeLoadingFormSkeleton>
                </SectionWrapper>
            </PageLayout>
        );
    }

    if (confirmBookingResult.isError) {
        return (
            <PageLayout>
                <BookingHeroSection></BookingHeroSection>
                <LargeFormError
                    onRetry={() => router.push('/')}
                    retryButtonLabel={t('generalError.actionButton.label')}
                ></LargeFormError>
            </PageLayout>
        );
    }

    return (
        <PageLayout classname={resetPageClassnames}>
            <BookingHeroSection></BookingHeroSection>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <AditionalDataReservationSection
                        form={form}
                        mutatioResult={confirmBookingResult}
                    ></AditionalDataReservationSection>
                    <PaymentSection
                        form={form}
                        mutatioResult={confirmBookingResult}
                    ></PaymentSection>
                    <AdditionalInfoSection
                        form={form}
                        mutatioResult={confirmBookingResult}
                    ></AdditionalInfoSection>
                </form>
            </Form>
        </PageLayout>
    );
}
