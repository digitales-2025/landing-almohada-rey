import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';

import {
    Reservation,
    ReservationUpdateDtoForSchema,
} from '@/actions/booking/booking';
import { Form } from '@/components/ui/form';
import { BaseApiResponse } from '@/types/api/types';

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
}

export const UpdateReservationForm: React.FC<Props> = ({
    form,
    onSubmit,
    //updateMutationResult,
    //children,
}) => {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* Add form fields here */}
                <input
                    type="text"
                    name="reservationName"
                    placeholder="Reservation Name"
                />
                <input type="date" name="reservationDate" />
                <button type="submit">Update Reservation</button>
            </form>
        </Form>
    );
};
