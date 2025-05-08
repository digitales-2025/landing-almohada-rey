import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { addDays, startOfDay } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import {
    Reservation,
    ReservationUpdateDtoForSchema,
} from '@/actions/booking/booking';
import { DetailedRoom } from '@/actions/rooms/room';
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
import {
    formatDateToLimaTimezone,
    getLimaTime,
    setCheckInTime,
    setCheckOutTime,
} from '@/lib/timedate/peru-datetime';
import { cn } from '@/lib/utils';
import { BaseApiResponse } from '@/types/api/types';
import {
    fieldClassname,
    inputCommonClassnames,
    labelClassname,
} from '../MoreBookingDetailsSection';

type SelectOption = {
    value: string;
    label: string;
};

interface Props {
    form: UseFormReturn<
        {
            checkInDate: Date;
            checkOutDate: Date;
            guestNumber: number;
            roomId: string;
        },
        any,
        {
            checkInDate: Date;
            checkOutDate: Date;
            guestNumber: number;
            roomId: string;
        }
    >;
    updateMutationResult: UseMutationResult<
        BaseApiResponse<Reservation>,
        Error,
        ReservationUpdateDtoForSchema,
        unknown
    >;
    onSubmit: (data: {
        checkInDate: Date;
        checkOutDate: Date;
        guestNumber: number;
        roomId: string;
    }) => Promise<void>;
    children?: React.ReactNode;
    roomsAvailable: DetailedRoom[];
    handleCheckAvailability: (formValues: {
        guestNumber: number;
        checkInDate: Date;
        checkOutDate: Date;
        roomId: string;
    }) => void;
}

export const UpdateReservationForm: React.FC<Props> = ({
    form,
    onSubmit,
    roomsAvailable,
    // updateMutationResult,
    // handleCheckAvailability,
    //updateMutationResult,
    //children,
}) => {
    const t = useTranslations('IndexPageBooking.updateReservationDates');
    const locale = useLocale();
    const values = form.watch();

    const dayBeforeCheckOutDate = new Date(values.checkOutDate);
    dayBeforeCheckOutDate.setDate(dayBeforeCheckOutDate.getDate() - 1);

    const maxDate = getLimaTime(
        new Date(new Date().setFullYear(new Date().getFullYear() + 1))
    );

    const maxGuests =
        roomsAvailable.map(room => room.RoomTypes.guests).length == 0
            ? 0
            : Math.max(...roomsAvailable.map(room => room.RoomTypes.guests));

    const roomOptions: SelectOption[] = roomsAvailable.map(room => {
        return {
            value: room.id,
            label: `${room.number}(${room.RoomTypes.name.toUpperCase()}) - 🧍(${room.RoomTypes.guests})`,
        };
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Add form fields here */}
                {/* <input
                    type="text"
                    name="reservationName"
                    placeholder="Reservation Name"
                />
                <input type="date" name="reservationDate" /> */}

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
                                    placeholder={t('input1.placeholder')}
                                    max={maxGuests ?? field.value ?? 0}
                                    {...field}
                                    type="number"
                                />
                            </FormControl>
                            {values.roomId ? (
                                <FormDescription>
                                    {t('input1.description', {
                                        guestNumber: (
                                            maxGuests ??
                                            field.value ??
                                            0
                                        ).toString(),
                                    })}
                                </FormDescription>
                            ) : (
                                <FormDescription>
                                    {t('input1.placeholderDescription')}
                                </FormDescription>
                            )}
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
                                disabled={roomsAvailable.length === 0}
                            >
                                <FormControl>
                                    <SelectTrigger
                                        className={cn(
                                            inputCommonClassnames,
                                            'w-full max-w-full truncate'
                                        )}
                                    >
                                        <SelectValue
                                            className={fieldClassname}
                                            placeholder={t(
                                                'input2.placeholder'
                                            )}
                                        >
                                            {field.value !== undefined &&
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
                                {roomsAvailable.length > 0
                                    ? t('input2.description.available', {
                                          availableRooms:
                                              roomsAvailable.length.toString(),
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
                                onChange={date => {
                                    const newDate = setCheckInTime(date);
                                    if (
                                        date &&
                                        date >= startOfDay(values.checkOutDate)
                                    ) {
                                        const oneDayAfterSelectedCheckedInDate =
                                            setCheckOutTime(addDays(date, 1));
                                        form.setValue(
                                            'checkOutDate',
                                            oneDayAfterSelectedCheckedInDate
                                        );
                                    }
                                    field.onChange(newDate);
                                }}
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
                                onChange={date => {
                                    const newDate = setCheckOutTime(date);
                                    if (
                                        date &&
                                        date <= startOfDay(values.checkInDate)
                                    ) {
                                        toast.error(
                                            t('input4.errors.dateError.before')
                                        );
                                        return;
                                    }
                                    field.onChange(newDate);
                                }}
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
                {/* <button type="submit">Update Reservation</button> */}
            </form>
        </Form>
    );
};
