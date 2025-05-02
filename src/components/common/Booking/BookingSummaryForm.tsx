'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useAvailability } from '@/hooks/queries/booking/useRoomAvailability';
import {
    formatDateToLimaTimezone,
    getLimaTime,
} from '@/lib/timedate/peru-datetime';
import { cn } from '@/lib/utils';
import { SmallFormError } from '../Errors/FormErrors';
import { OneRowLoadingFormSkeleton } from '../loading/LoadingFormSkeleton';
import { useSummaryBookingForm } from './summary-booking.hook';

type SelectOption = {
    value: string;
    label: string;
};

export const BookingSummaryForm = () => {
    const t = useTranslations('Forms.reserveBookingSummary');
    const locale = useLocale();
    const {
        form,
        onSubmit,
        // isPending
    } = useSummaryBookingForm();
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
        return <OneRowLoadingFormSkeleton></OneRowLoadingFormSkeleton>;
    }

    if (query.isError) {
        return <SmallFormError></SmallFormError>;
    }

    if (!query.data) {
        return <OneRowLoadingFormSkeleton></OneRowLoadingFormSkeleton>;
    }

    const roomsAvailable = query.data;

    const roomOptions: SelectOption[] = roomsAvailable.map(room => {
        return {
            value: room.id,
            label: `${room.number}(${room.RoomTypes.name}) - 🧍(${room.RoomTypes.guests})`,
        };
    });

    const dayBeforeCheckOutDate = new Date(values.checkOutDate);
    dayBeforeCheckOutDate.setDate(dayBeforeCheckOutDate.getDate() - 1);

    const maxDate = getLimaTime(
        new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    );

    const maxGuests =
        roomsAvailable.map(room => room.RoomTypes.guests).length == 0
            ? 0
            : Math.max(...roomsAvailable.map(room => room.RoomTypes.guests));

    const textColor = 'text-secondary';
    const labelClassname = cn(
        textColor,
        'uppercase text-sm md:text-base lg:text-p font-light tracking-normal'
    );
    const fieldClassname = cn(
        textColor,
        'text-sm md:text-base lg:text-p font-normal tracking-normal'
    );
    const inputCommonClassnames = cn(
        'rounded-none border-t-0 border-x-0 border-b-[1px] border-b-secondary shadow-none w-full',
        fieldClassname
    );

    return (
        <div className="p-6 bg-primary-foreground">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid md:grid-cols-2 2xl:grid-cols-5 gap-2 gap-y-4 md:gap-3 lg:gap-4"
                >
                    <FormField
                        control={form.control}
                        name="guestNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassname}>
                                    {t('input1.label')}
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputCommonClassnames}
                                        placeholder="Name"
                                        {...field}
                                        type="number"
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t('input1.description', {
                                        guestNumber: (
                                            maxGuests ??
                                            field.value ??
                                            0
                                        ).toString(),
                                    })}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="roomId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassname}>
                                    {t('input2.label')}
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    disabled={query.data.length === 0}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(
                                                inputCommonClassnames,
                                                'w-full'
                                            )}
                                        >
                                            <SelectValue
                                                className={fieldClassname}
                                                placeholder="Select a room"
                                            >
                                                {field.value &&
                                                    roomOptions.find(
                                                        option =>
                                                            option.value ===
                                                            field.value
                                                    )?.label}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roomOptions.map(option => (
                                            <SelectItem
                                                key={option.value}
                                                value={option.value}
                                            >
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    {query.data.length > 0
                                        ? t('input2.description.available', {
                                              availableRooms:
                                                  query.data.length.toString(),
                                          })
                                        : t('input2.description.noAvailable')}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="checkInDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassname}>
                                    {t('input3.label')}
                                </FormLabel>
                                <DatePicker
                                    date={field.value}
                                    onChange={field.onChange}
                                    controlled={true}
                                    className={inputCommonClassnames}
                                ></DatePicker>
                                <FormDescription>
                                    {t('input3.description', {
                                        maxDate: formatDateToLimaTimezone(
                                            maxDate,
                                            locale
                                        ).short,
                                    })}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="checkOutDate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className={labelClassname}>
                                    {t('input4.label')}
                                </FormLabel>
                                <DatePicker
                                    date={field.value}
                                    onChange={field.onChange}
                                    controlled={true}
                                    className={inputCommonClassnames}
                                ></DatePicker>
                                <FormDescription>
                                    {t('input4.description')}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="w-full h-full flex items-center md:col-span-2 2xl:col-span-1">
                        <Button
                            className="rounded-none text-sm md:text-base lg:text-p tracking-normal w-full leading-14 lg:leading-16 h-fit "
                            size={'lg'}
                            type="submit"
                        >
                            {t('submitButton.label')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
