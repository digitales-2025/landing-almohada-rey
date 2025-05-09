'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { LargeFormError } from '@/components/common/Errors/FormErrors';
import { LargeLoadingFormSkeleton } from '@/components/common/loading/LoadingFormSkeleton';
import { PageLayout } from '@/components/layout/PageLayout';
import { resetPageClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { AdditionalInfoSection } from '../components/AdditionalInfoSection';
import { BookingHeroSection } from '../components/bookingHeroSection';
import { AditionalDataReservationSection } from '../components/MoreBookingDetailsSection';
import { PaymentSection } from '../components/PaymentSection';
import { useBookingForm } from '../hooks/useBookingForm';
import { useBookingWebSocket } from '../hooks/useBookingWs';
import {
    ChronometerHookReturnType,
    formatTimeLeft,
} from '../hooks/useWsChronemeter';

export const Chronometer = ({
    warningWhen,
    chronometer,
}: {
    chronometer: ChronometerHookReturnType;
    warningWhen: number;
}) => {
    const t = useTranslations('IndexPageBooking.chronometer');
    // Usamos useRef para rastrear si ya se mostró la animación de advertencia
    const hasShownWarning = React.useRef(false);

    // Usamos useState para controlar el estado de la animación
    const [showWarningAnimation, setShowWarningAnimation] =
        React.useState(false);

    // Efecto para controlar cuándo activar la animación
    React.useEffect(() => {
        if (chronometer.timeLeft <= warningWhen && !hasShownWarning.current) {
            // Primera vez que llega al umbral de advertencia
            setShowWarningAnimation(true);
            hasShownWarning.current = true;

            // Configurar un temporizador para desactivar la animación después de completarse
            // (la duración debe coincidir con la de tu animación)
            const animationTimer = setTimeout(() => {
                setShowWarningAnimation(false);
            }, 900); // 300ms x 3 (animate-thrice)

            return () => clearTimeout(animationTimer);
        }
    }, [chronometer.timeLeft, warningWhen]);

    const TimerDisplay = React.memo(({ timeLeft }: { timeLeft: number }) => {
        return (
            <div className="fixed z-20 bottom-0 right-0 p-4 w-full flex justify-center bg-none h-fit">
                <div
                    className={cn(
                        'bg-primary-foreground text-secondary px-4 py-2 rounded shadow-lg max-w-fit text-xl',
                        timeLeft <= warningWhen && 'text-destructive', // Color siempre rojo bajo el umbral
                        showWarningAnimation &&
                            'scale-105 animate-shake animate-thrice animate-duration-300 animate-ease-linear' // Animación solo cuando se activa
                    )}
                >
                    <span>
                        {t('timeLeftLabel', {
                            timeLeft: formatTimeLeft(timeLeft),
                        })}
                    </span>
                </div>
            </div>
        );
    });
    TimerDisplay.displayName = 'Chronometer';

    return <TimerDisplay timeLeft={chronometer.timeLeft} />;
};

export default function Page() {
    const { reservationId } = useParams<{ reservationId: string }>();
    const t = useTranslations('IndexPageBooking');
    const locale = useLocale();
    const { form, confirmBookingResult, onSubmit } = useBookingForm(
        undefined,
        locale
    );
    const firstRender = React.useRef(true);
    // const { timeLeft, isRunning, startChronometer, stopChronometer } =
    //     useChronometer();

    const wsConnectionResult = useBookingWebSocket(locale, reservationId);
    const {
        isConnected,
        isConnecting,
        isloading,
        startBookingPayment,
        cancelBookingPayment,
        // completeBookingPayment,
        // notifyBookingError,
        tryReconnection,
        chronometer,
    } = wsConnectionResult;

    const {
        timeLeft,
        isRunning,
        // startChronometer,
        // stopChronometer
    } = chronometer;

    const generalDisabled = !isConnected || isConnecting || isloading;

    // const handleRedirection = () => {
    //     cancelBookingPayment();
    //     router.replace('/');
    // }

    // const firstRender = React.useRef(true);
    // const handleCancelReservation = () => {
    //     stopChronometer();
    //     router.push('/');
    // };

    React.useEffect(() => {
        // startChronometer(60);
        if (isConnected) {
            // startChronometer(60);
            startBookingPayment();
        } else {
            // stopChronometer();
            toast.promise(
                tryReconnection(),
                // {
                //     loading: t('connectionError.loading'),
                //     success: t('connectionError.success'),
                //     error: t('connectionError.error'),
                // }
                {
                    loading: 'Reconnecting...',
                    success: 'Connected',
                    error: 'Error reconnecting. Redirecting to home',
                }
            );
            if (!isConnected && !isConnecting) cancelBookingPayment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, isConnecting]);

    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        if (timeLeft === 0 && !isRunning) {
            // stopChronometer();
            cancelBookingPayment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRunning, timeLeft]);

    // React.useEffect(() => {
    //     if (firstRender.current) {
    //         firstRender.current = false;
    //         return;
    //     }
    //     if (!isRunning) {

    //         if (timeLeft !== 60) {
    //             handleCancelReservation();
    //         }
    //     }
    // }, [isRunning, timeLeft]);

    // React.useEffect(() => {
    //     if (confirmBookingResult.isSuccess) {
    //         stopChronometer();
    //         router.push(`/${locale}/reservacion/${confirmBookingResult.data}`);
    //     }
    // }, [confirmBookingResult.isSuccess]);

    // React.useEffect(() => {
    //     if (confirmBookingResult.isError) {
    //         stopChronometer();
    //         router.push('/');
    //     }
    // }, [confirmBookingResult.isError]);

    // React.useEffect(() => {
    //     if (!isRunning) {
    //         // Prevent calling handleCancelReservation on initial mount
    //         // Only trigger when chronometer stops after being started
    //         if (timeLeft !== 60) {
    //             handleCancelReservation();
    //         }
    //     }
    // }, [isRunning, timeLeft]);

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
                    onRetry={() => cancelBookingPayment()}
                    retryButtonLabel={t('generalError.actionButton.label')}
                ></LargeFormError>
            </PageLayout>
        );
    }

    return (
        <PageLayout classname={resetPageClassnames}>
            {isRunning && (
                <Chronometer chronometer={chronometer} warningWhen={45} />
            )}
            <BookingHeroSection></BookingHeroSection>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {/* {isRunning && <Chronometer timeLeft={timeLeft} warningWhen={45}/>} */}
                    <AditionalDataReservationSection
                        form={form}
                        mutatioResult={confirmBookingResult}
                        onUpdateBookingData={cancelBookingPayment}
                        // wsConnectionResult={wsConnectionResult}
                        disabled={generalDisabled}
                    ></AditionalDataReservationSection>
                    <PaymentSection
                        form={form}
                        mutatioResult={confirmBookingResult}
                        wsConnectionResult={wsConnectionResult}
                        disabled={generalDisabled}
                    ></PaymentSection>
                    <AdditionalInfoSection
                        form={form}
                        mutatioResult={confirmBookingResult}
                        wsConnectionResult={wsConnectionResult}
                        disabled={generalDisabled}
                    >
                        <div className="flex flex-col gap-2 justify-center items-center md:flex-row md:justify-between">
                            <FormField
                                control={form.control}
                                name="didAcceptTerms"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-none">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                disabled={generalDisabled}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel className="text-sm md:text-base text-wrap flex flex-wrap gap-y-0 text-secondary opacity-70 hover:opacity-100">
                                                <span className="text-nowrap">
                                                    {t(
                                                        'submitSection.input1.label1'
                                                    )}
                                                </span>
                                                <span className="text-nowrap font-semibold">
                                                    {t(
                                                        'submitSection.input1.termsAndConditions'
                                                    )}
                                                </span>
                                                <span className="text-nowrap">
                                                    {t(
                                                        'submitSection.input1.label2'
                                                    )}
                                                </span>
                                                <span className="text-nowrap font-semibold">
                                                    {t(
                                                        'submitSection.input1.privacyPolicy'
                                                    )}
                                                </span>
                                            </FormLabel>
                                            <FormDescription>
                                                {t(
                                                    'submitSection.input1.description'
                                                )}
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <Button
                                variant={'default'}
                                type="submit"
                                size={'lg'}
                                className="rounded-none text-base md:text-xl h-fit"
                                disabled={generalDisabled}
                            >
                                <span className="mx-3 !my-2 ">
                                    {t('submitSection.submitButton.label')}
                                </span>
                            </Button>
                        </div>
                    </AdditionalInfoSection>
                </form>
            </Form>
        </PageLayout>
    );
}
