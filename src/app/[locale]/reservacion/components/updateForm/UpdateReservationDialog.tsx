import { useCallback, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
import { LargeFormError } from '@/components/common/Errors/FormErrors';
import { LargeLoadingFormSkeleton } from '@/components/common/loading/LoadingFormSkeleton';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer';
import { useAvailability } from '@/hooks/queries/booking/useRoomAvailability';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useRouter } from '@/i18n/navigation';
import {
    ReservationUpdateDto,
    useUpdateBookingForm,
} from '../../hooks/useUpdateBookingForm';

interface Props {
    reservationData?: ReservationUpdateDto;
}

export const UpdateReservationDialog = ({ reservationData }: Props) => {
    console.log('reservationData', reservationData);
    const t = useTranslations('IndexPageBooking.updateReservationDates');
    const isDesktop = useMediaQuery('(min-width: 640px)');

    const router = useRouter();
    const locale = useLocale();
    console.log('locale', locale);
    const fakeReservation: ReservationUpdateDto = {
        checkInDate: new Date('2024-05-15T15:00:00Z').toISOString(),
        checkOutDate: new Date('2024-05-18T11:00:00Z').toISOString(),
        id: '550e8400-e29b-41d4-a716-446655440000',
        roomId: '550e8400-e29b-41d4-a716-446655440500',
        guestNumber: 2,
    };

    const {
        form,
        //onSubmit,
        //mutation
    } = useUpdateBookingForm(fakeReservation);
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

    if (query.isLoading) {
        return <LargeLoadingFormSkeleton></LargeLoadingFormSkeleton>;
    }

    if (query.isError) {
        return (
            <LargeFormError
                onRetry={() => router.push('/')}
                retryButtonLabel={t('input1.errors.dateError.invalid')} //Cambiar el mensaje
            ></LargeFormError>
        );
    }

    // if (!query.data) {
    //     return <OneRowLoadingFormSkeleton></OneRowLoadingFormSkeleton>;
    // }

    if (isDesktop) {
        return (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Update</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant="outline">Update</Button>
            </DrawerTrigger>
            <DrawerContent className="sm:max-w-[425px]">
                <DrawerHeader>
                    <DrawerTitle>Are you sure?</DrawerTitle>
                    <DrawerDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                    </DrawerDescription>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    );
};
