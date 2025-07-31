import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
import { LargeFormError } from '@/components/common/Errors/FormErrors';
import { LargeLoadingFormSkeleton } from '@/components/common/loading/LoadingFormSkeleton';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
// import { useBooking } from '@/hooks/queries/booking/useBooking';
import { useAvailability } from '@/hooks/queries/booking/useRoomAvailability';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
    ReservationUpdateDto,
    useUpdateBookingForm,
} from '../../hooks/useUpdateBookingForm';

interface Props {
    reservationData?: ReservationUpdateDto;
    onUpdateBookingData: () => void;
}

export const UpdateReservationDialog = ({
    //reservationData
    onUpdateBookingData,
}: Props) => {
    // console.log('reservationData', reservationData);
    const t = useTranslations('IndexPageBooking');
    const isDesktop = useMediaQuery('(min-width: 640px)');
    // const locale = useLocale();
    const [open, setOpen] = useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };
    const handleClose = () => {
        setOpen(false);
    };

    const handleUpdate = () => {
        handleClose();
        // aqui el metodo para cancelar el temporizador y la reserva
        // router.push(route);
        onUpdateBookingData();
    };

    const fakeReservation: ReservationUpdateDto = {
        checkInDate: new Date('2025-05-15T15:00:00Z').toISOString(),
        checkOutDate: new Date('2025-05-18T11:00:00Z').toISOString(),
        id: '550e8400-e29b-41d4-a716-446655440000',
        roomId: '550e8400-e29b-41d4-a716-446655440500',
        guestNumber: 2,
    };

    const {
        form,
        //onSubmit,
        //mutation
    } = useUpdateBookingForm(fakeReservation);

    // const { useUpdateBooking } = useBooking();
    // const updateBookingResult = useUpdateBooking(fakeReservation.id);
    const values = form.watch();
    const defaultAvailabilityDataRef = useRef<CheckRoomAvailabilityDto>({
        checkInDate: values.checkInDate.toISOString(),
        checkOutDate: values.checkOutDate.toISOString(),
        guestNumber: values.guestNumber,
        roomId: values.roomId,
    });

    const { checkAvailability, query } = useAvailability(
        defaultAvailabilityDataRef.current
    );

    const handleCheckAvailability = useCallback(() => {
        const newParams: CheckRoomAvailabilityDto = {
            checkInDate: values.checkInDate.toISOString(),
            checkOutDate: values.checkOutDate.toISOString(),
            guestNumber: values.guestNumber,
            roomId: values.roomId,
        };
        checkAvailability(newParams);
    }, [
        checkAvailability,
        values.checkInDate,
        values.checkOutDate,
        values.guestNumber,
        values.roomId,
    ]);

    useEffect(() => {
        // Solo hacer la comprobación inicial o cuando los valores relevantes cambien
        // y no en cada renderizado
        if (form.formState.isDirty) {
            handleCheckAvailability();
        }
    }, [handleCheckAvailability, form.formState.isDirty]);

    // Primera carga de datos
    useEffect(() => {
        // Una sola vez al montar el componente
        handleCheckAvailability();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // array de dependencias vacío para ejecutar solo al montar

    if (query.isLoading || !query.data) {
        return <LargeLoadingFormSkeleton></LargeLoadingFormSkeleton>;
    }

    if (query.isError) {
        return (
            <LargeFormError
                onRetry={onUpdateBookingData}
                retryButtonLabel={t(
                    'updateReservationDates.generalError.actionButton.label'
                )} //Cambiar el mensaje
            ></LargeFormError>
        );
    }

    // if (!query.data) {
    //     return <OneRowLoadingFormSkeleton></OneRowLoadingFormSkeleton>;
    // }

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant={'secondary'}
                        className="rounded-none h-fit my-3"
                        size={'lg'}
                    >
                        <span className="mx-3 !my-2 text-sm md:text-lg lg:text-xl">
                            {t(
                                'moreReservationDetailsSection.updateButton.label'
                            )}
                        </span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] md:max-w-[600px] lg:max-w-[800px] xl:max-w-[1000px]">
                    <DialogHeader>
                        <DialogTitle className="text-secondary">
                            {t('updateReservationDates.title')}
                        </DialogTitle>
                        <DialogDescription>
                            {t('updateReservationDates.description')}
                        </DialogDescription>
                    </DialogHeader>
                    {/* <UpdateReservationForm
                        form={form}
                        onSubmit={async data => {
                            // Aquí puedes manejar el envío del formulario
                            console.log('Form data:', data);
                            // await mutation.mutateAsync(data);
                            // handleClose();
                        }}
                        updateMutationResult={updateBookingResult}
                        roomsAvailable={query.data}
                        handleCheckAvailability={handleCheckAvailability}
                    ></UpdateReservationForm> */}
                    <DialogFooter>
                        <Button
                            variant={'outline'}
                            type="button"
                            onClick={handleClose}
                            className="rounded-none text-base h-fit"
                        >
                            <span>
                                {t('updateReservationDates.cancelButton.label')}
                            </span>
                        </Button>
                        <Button
                            variant={'default'}
                            type="submit"
                            onClick={handleUpdate}
                            className="rounded-none text-base h-fit"
                        >
                            <span>
                                {t('updateReservationDates.submitButton.label')}
                            </span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    type="button"
                    variant={'outline'}
                    className="rounded-none h-fit my-3"
                    size={'lg'}
                >
                    <span className="mx-3 !my-2 text-sm md:text-lg lg:text-xl">
                        {t('moreReservationDetailsSection.updateButton.label')}
                    </span>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="sm:max-w-[425px]">
                <DrawerHeader>
                    <DrawerTitle className="text-secondary">
                        {t('updateReservationDates.title')}
                    </DrawerTitle>
                    <DrawerDescription>
                        {t('updateReservationDates.description')}
                    </DrawerDescription>
                </DrawerHeader>
                {/* <UpdateReservationForm
                    form={form}
                    onSubmit={async data => {
                        // Aquí puedes manejar el envío del formulario
                        console.log('Form data:', data);
                        // await mutation.mutateAsync(data);
                        // handleClose();
                    }}
                    updateMutationResult={updateBookingResult}
                    roomsAvailable={query.data}
                    handleCheckAvailability={handleCheckAvailability}
                ></UpdateReservationForm> */}
                <DrawerFooter>
                    <Button
                        variant={'destructive'}
                        type="button"
                        onClick={handleClose}
                        className="rounded-none text-base h-fit"
                    >
                        <span>
                            {t('updateReservationDates.cancelButton.label')}
                        </span>
                    </Button>
                    <Button
                        variant={'default'}
                        type="submit"
                        onClick={handleClose}
                        className="rounded-none text-base h-fit"
                    >
                        <span>
                            {t('updateReservationDates.submitButton.label')}
                        </span>
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};
