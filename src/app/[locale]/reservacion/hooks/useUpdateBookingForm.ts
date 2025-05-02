import { useForm } from 'react-hook-form';

export function useUpdateBookingForm() {
    const form = useForm({
        defaultValues: {
            checkInDate: new Date(),
            checkOutDate: new Date(),
            guestNumber: 1,
            roomId: undefined,
        },
    });

    return {
        form,
        handleSubmit: form.handleSubmit,
        register: form.register,
        setValue: form.setValue,
        getValues: form.getValues,
        watch: form.watch,
        reset: form.reset,
    };
}
