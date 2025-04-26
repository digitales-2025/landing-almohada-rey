'use client';

import { useCallback, useEffect, useRef } from 'react';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
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
import { SmallFormError } from '../Errors/FormErrors';
import { OneRowLoadingFormSkeleton } from './LoadingFormSkeleton';
import { useSummaryBookingForm } from './summary-booking.hook';

type SelectOption = {
    value: string;
    label: string;
};

export const BookingSummaryForm = () => {
    const {
        form,
        onSubmit,
        // isPending
    } = useSummaryBookingForm();
    const values = form.watch();
    const defaultAvailabilityDataRef = useRef<CheckRoomAvailabilityDto>({
        checkInDate: values.checkInDate.toISOString(),
        checkOutDate: values.checkOutDate.toISOString(),
        numberOfGuests: values.numberOfGuests,
        roomId: values.roomId,
    });

    const { checkAvailability, query } = useAvailability(
        defaultAvailabilityDataRef.current
    );

    const handleCheckAvailability = useCallback(() => {
        const newParams: CheckRoomAvailabilityDto = {
            checkInDate: values.checkInDate.toISOString(),
            checkOutDate: values.checkOutDate.toISOString(),
            numberOfGuests: values.numberOfGuests,
            roomId: values.roomId,
        };
        checkAvailability(newParams);
    }, [checkAvailability, values]);

    useEffect(() => {
        if (form.formState.isDirty || values) {
            handleCheckAvailability();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checkAvailability]);

    if (query.isLoading) {
        return <OneRowLoadingFormSkeleton></OneRowLoadingFormSkeleton>;
    }

    if (query.isError) {
        return <SmallFormError></SmallFormError>;
    }

    if (!query.data) {
        return <OneRowLoadingFormSkeleton></OneRowLoadingFormSkeleton>;
    }

    const roomOptions: SelectOption[] = query.data.map(room => {
        return {
            value: room.id,
            label: `${room.number}(${room.RoomTypes.name}) - 🧍(${room.RoomTypes.guests})`,
        };
    });
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="numberOfGuests"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of guests</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Name"
                                        {...field}
                                        type="number"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Number of guests
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
                                <FormLabel>Habitación</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a room">
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
                                    You can manage email addresses in your
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
                                <FormLabel>Check In</FormLabel>
                                <DatePicker
                                    date={field.value}
                                    onChange={field.onChange}
                                    controlled={true}
                                ></DatePicker>
                                <FormDescription>
                                    This is your public display name.
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
                                <FormLabel>Check In</FormLabel>
                                <DatePicker
                                    date={field.value}
                                    onChange={field.onChange}
                                    controlled={true}
                                ></DatePicker>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    );
};
