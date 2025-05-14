'use client';

import React, { useCallback } from 'react';
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
import { useRouter } from '@/i18n/navigation';
import { AdditionalInfoSection } from '../components/AdditionalInfoSection';
import { BookingHeroSection } from '../components/bookingHeroSection';
import { Chronometer } from '../components/Chronometer';
import { AditionalDataReservationSection } from '../components/MoreBookingDetailsSection';
// import { PaymentSection } from '../components/PaymentSection';
import { useBookingForm } from '../hooks/useBookingForm';
import { useBookingWebSocket } from '../hooks/useBookingWs';

export default function Page() {
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const { reservationId } = useParams<{ reservationId: string }>();
    const t = useTranslations('IndexPageBooking');
    const locale = useLocale();
    const { form, confirmBookingResult, onSubmit } = useBookingForm(
        reservationId,
        locale
    );
    const router = useRouter();
    const firstRender = React.useRef(true);

    const wsConnectionResult = useBookingWebSocket(locale, reservationId);
    const {
        reservationRef,
        isConnected,
        isConnecting,
        isLoading,
        isRedirecting,
        canContinue,
        connectionQuality,
        startBookingPayment,
        cancelBookingPayment,
        chronometer,
    } = wsConnectionResult;

    const {
        timeLeft,
        isRunning,
        isAbleToUse: isAbleToUseChronometer,
        pauseChronometer,
        resumeChronometer,
    } = chronometer;

    const generalDisabled =
        !isConnected ||
        isConnecting ||
        isLoading ||
        !canContinue ||
        isRedirecting;

    // const redirectingToast = ()=>{
    //     toast.error(t('connection.navigation.redirecting'), {
    //         duration: 4000,
    //     });
    // }

    const cancellingToast = () => {
        toast.error(t('connection.navigation.cancelling'), {
            duration: 4000,
        });
    };

    const setReservationDefaultData = useCallback(() => {
        if (reservationRef.current) {
            form.setValue(
                'reservation.checkInDate',
                new Date(reservationRef.current.checkInDate)
            );
            form.setValue(
                'reservation.checkOutDate',
                new Date(reservationRef.current.checkOutDate)
            );
            form.setValue(
                'reservation.guestNumber',
                reservationRef.current.requestedGuestNumber
            );
            form.setValue('reservation.roomId', reservationRef.current.roomId);
        }
    }, [form, reservationRef]);

    React.useEffect(() => {
        if (confirmBookingResult.isPending && isSubmitting) {
            pauseChronometer();
        }
        if (confirmBookingResult.isSuccess) {
            // resumeChronometer();
            setIsSubmitting(false);
        }
        if (confirmBookingResult.isError) {
            resumeChronometer();
            setIsSubmitting(false);
        }
    }, [
        confirmBookingResult.isPending,
        isSubmitting,
        pauseChronometer,
        confirmBookingResult.isSuccess,
        confirmBookingResult.isError,
        resumeChronometer,
    ]);

    React.useEffect(() => {
        setReservationDefaultData();
    }, [setReservationDefaultData, reservationRef.current]);

    // Efecto para mostrar notificaciones basadas en el estado de conexión
    React.useEffect(() => {
        // Omitir el primer renderizado para evitar notificaciones innecesarias al cargar la página
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        // // Notificación cuando se conecta por primera vez o se reconecta
        // if (isConnected && !isConnecting) {
        //     toast.success(t('connection.connected'));
        // }

        // // Notificación cuando se está conectando (después de una desconexión)
        // if (isConnecting && !isConnected) {
        //     toast.loading(t('connection.connecting'));
        // }

        // Notificación cuando se pierde la conexión
        if (!isConnected && !isConnecting) {
            toast.error(t('connection.lost'));
        }

        // Notificaciones basadas en la calidad de conexión
        if (connectionQuality === 'good' && isConnected) {
            // No mostramos notificación para conexión buena para no saturar al usuario
            // Solo si hubo una mejora de 'poor' a 'good' se mostrará en el hook
        } else if (connectionQuality === 'poor' && isConnected) {
            toast.warning(t('connection.unstable'), {
                description: t('connection.unstableDescription'),
                duration: 4000,
            });
        } else if (connectionQuality === 'lost') {
            toast.error(t('connection.critical'), {
                description: t('connection.criticalDescription'),
            });
        }
    }, [isConnected, isConnecting, connectionQuality, t]);

    // Inicia el proceso de reservación cuando la conexión está lista
    React.useEffect(() => {
        if (isConnected && !isLoading && !canContinue) {
            // Inicia el proceso de reservación una vez conectado
            startBookingPayment();
        }
    }, [
        isConnected,
        isConnecting,
        isLoading,
        canContinue,
        startBookingPayment,
    ]);

    // Añade este efecto para interceptar el botón back
    React.useEffect(() => {
        const handlePopState = () => {
            // Cancelar la reserva al pulsar el botón atrás
            cancelBookingPayment();
            // Redirigir explícitamente a la página de habitaciones
            router.replace('/rooms');
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [cancelBookingPayment, router]);

    // Cancelar la reserva al tratar de salir de la página
    React.useEffect(() => {
        const handleBeforeUnload = () => {
            cancelBookingPayment();
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [cancelBookingPayment]);

    // Manejar expiración del cronómetro
    React.useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (
            timeLeft === 0 &&
            isAbleToUseChronometer &&
            !isRunning &&
            isConnected
        ) {
            cancellingToast();
            cancelBookingPayment();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isRunning,
        timeLeft,
        isAbleToUseChronometer,
        isConnected,
        cancelBookingPayment,
        t,
    ]);

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
                <form
                    onSubmit={form.handleSubmit(data => {
                        setIsSubmitting(true);
                        onSubmit(data);
                    })}
                >
                    {form.formState.errors && (
                        <div>
                            {Object.values(form.formState.errors).map(
                                (error, idx) =>
                                    error?.message ? (
                                        <div
                                            key={idx}
                                            className="text-destructive text-sm mb-2"
                                        >
                                            {error.message as string}
                                        </div>
                                    ) : null
                            )}
                        </div>
                    )}
                    <AditionalDataReservationSection
                        form={form}
                        mutationResult={confirmBookingResult}
                        onUpdateBookingData={cancelBookingPayment}
                        disabled={generalDisabled}
                        reservation={reservationRef.current}
                    ></AditionalDataReservationSection>
                    {/* <PaymentSection
                        form={form}
                        mutatioResult={confirmBookingResult}
                        wsConnectionResult={wsConnectionResult}
                        disabled={generalDisabled}
                    ></PaymentSection> */}
                    <AdditionalInfoSection
                        form={form}
                        mutationResult={confirmBookingResult}
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
                                className="rounded-none text-base md:text-xl h-fit cursor-pointer"
                                disabled={generalDisabled}
                                // onClick={() => {
                                //     console.log(
                                //         'Errors:',
                                //         form.formState.errors
                                //     );
                                //     console.log(
                                //         'Is Form Valid:',
                                //         form.formState.isValid
                                //     );
                                // }}
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
