'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { addDays, startOfDay } from 'date-fns';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'sonner';

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
    setCheckInTime,
    setCheckOutTime,
} from '@/lib/timedate/peru-datetime';
import { cn } from '@/lib/utils';
import { SmallFormError } from '../Errors/FormErrors';
import { OneRowLoadingFormSkeleton } from '../loading/LoadingFormSkeleton';
import { useSummaryBookingForm } from './useSummaryBookingForm';

// type SelectOption = {
//     value: string;
//     label: string;
// };

export const BookingSummaryForm = () => {
    // 1. Primero declaramos todos los hooks básicos
    const t = useTranslations('Forms.reserveBookingSummary');
    const locale = useLocale();
    const { form, onSubmit, mutation } = useSummaryBookingForm();
    const values = form.watch();

    // 2. Creamos el ref para los datos de disponibilidad
    const defaultAvailabilityDataRef = useRef<CheckRoomAvailabilityDto>({
        checkInDate: values.checkInDate.toISOString(),
        checkOutDate: values.checkOutDate.toISOString(),
        guestNumber: values.guestNumber,
        roomId: values.roomId,
    });

    // Ref para manejar el valor seleccionado y el tipo de habitación mostrado
    const selectedRoomIdRef = useRef<string | null>(null);
    const selectedRoomTypeRef = useRef<string | null>(null);

    // 3. Hook para la disponibilidad
    const { checkAvailability, query } = useAvailability(
        defaultAvailabilityDataRef.current
    );

    // 4. Definir todos los callbacks - ANTES de cualquier condicional
    const handleCheckAvailability = useCallback(
        (formValues: typeof values) => {
            // Comparar con los valores previos para evitar llamadas innecesarias
            if (
                defaultAvailabilityDataRef.current.checkInDate ===
                    formValues.checkInDate.toISOString() &&
                defaultAvailabilityDataRef.current.checkOutDate ===
                    formValues.checkOutDate.toISOString() &&
                defaultAvailabilityDataRef.current.guestNumber ===
                    formValues.guestNumber &&
                defaultAvailabilityDataRef.current.roomId === formValues.roomId
            ) {
                return;
            }

            const newParams: CheckRoomAvailabilityDto = {
                checkInDate: formValues.checkInDate.toISOString(),
                checkOutDate: formValues.checkOutDate.toISOString(),
                guestNumber: formValues.guestNumber,
                roomId: formValues.roomId,
            };

            defaultAvailabilityDataRef.current = newParams;
            checkAvailability(newParams);
        },
        [checkAvailability]
    );

    // 5. Definimos todas las funciones useCallback antes de cualquier useEffect
    const selectRandomRoomByType = useCallback(
        (roomType: string) => {
            if (!query.data) return '';

            const roomsOfType = query.data.filter(
                room => room.RoomTypes.name === roomType
            );
            if (roomsOfType.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * roomsOfType.length
                );
                const selectedRoom = roomsOfType[randomIndex];
                return selectedRoom.id;
            }
            return '';
        },
        [query.data]
    );

    // Crear un mapping de ID de habitación a tipo de habitación para mostrar correctamente el valor seleccionado
    // const roomIdToTypeMapping = useMemo(() => {
    //     if (!query.data) return new Map();

    //     const mapping = new Map<string, string>();
    //     query.data.forEach(room => {
    //         mapping.set(room.id, room.RoomTypes.name);
    //     });
    //     return mapping;
    // }, [query.data]);

    const checkInDateISO = useMemo(
        () => values.checkInDate.toISOString(),
        [values.checkInDate]
    );
    const checkOutDateISO = useMemo(
        () => values.checkOutDate.toISOString(),
        [values.checkOutDate]
    );

    // 6. Después de todos los callbacks, definimos los efectos
    useEffect(() => {
        handleCheckAvailability(values);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        checkInDateISO,
        checkOutDateISO,
        values.guestNumber,
        values.roomId,
        handleCheckAvailability,
    ]);

    // 7. Calculamos los valores derivados usando useMemo para evitar recálculos innecesarios
    const roomTypeOptions = useMemo(() => {
        if (!query.data || query.data.length === 0) return [];

        const roomsAvailable = query.data;
        // Obtener tipos de habitaciones únicas disponibles
        const roomTypesArray = Array.from(
            new Set(roomsAvailable.map(room => room.RoomTypes.name))
        );

        // Crear opciones para el select basadas en los tipos de habitación
        return roomTypesArray.map(roomType => {
            // Obtener todas las habitaciones de este tipo
            const roomsOfType = roomsAvailable.filter(
                room => room.RoomTypes.name === roomType
            );
            // Usar la capacidad de huéspedes de la primera habitación de este tipo
            const guestCapacity = roomsOfType[0]?.RoomTypes.guests || 0;
            return {
                value: roomType,
                label: `${roomType.toUpperCase()} - 🧍(${guestCapacity})`,
            };
        });
    }, [query.data]);

    // 8. Valores derivados estables que no causan rerenderizados
    // const dayBeforeCheckOutDate = useMemo(() => {
    //     const date = new Date(values.checkOutDate);
    //     date.setDate(date.getDate() - 1);
    //     return date;
    // }, [values.checkOutDate]);

    const maxDate = useMemo(
        () =>
            getLimaTime(
                new Date(new Date().setFullYear(new Date().getFullYear() + 1))
            ),
        []
    );

    const maxGuests = useMemo(() => {
        if (!query.data || query.data.length === 0) return 0;
        return Math.max(...query.data.map(room => room.RoomTypes.guests));
    }, [query.data]);

    // 9. Valores para los estilos
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

    // 10. Renderizado condicional - DESPUÉS de definir todos los hooks
    if (query.isError) {
        return <SmallFormError></SmallFormError>;
    }

    if (!query.data) {
        return <OneRowLoadingFormSkeleton></OneRowLoadingFormSkeleton>;
    }

    // 11. Renderizado principal
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
                                        placeholder={t('input1.placeholder')}
                                        max={maxGuests ?? field.value ?? 0}
                                        disabled={
                                            mutation.isPending ||
                                            query.isLoading ||
                                            !query.data
                                        }
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
                                    onValueChange={roomTypeName => {
                                        // Seleccionar una habitación al azar del tipo seleccionado
                                        const randomRoomId =
                                            selectRandomRoomByType(
                                                roomTypeName
                                            );

                                        // Guardamos los valores en las referencias
                                        selectedRoomIdRef.current =
                                            randomRoomId;
                                        selectedRoomTypeRef.current =
                                            roomTypeName;

                                        // Actualizamos el valor del formulario sin usar trigger
                                        field.onChange(randomRoomId);
                                    }}
                                    defaultValue={field.value}
                                    disabled={
                                        !query.data ||
                                        query.data.length === 0 ||
                                        mutation.isPending ||
                                        query.isLoading
                                    }
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
                                                {(() => {
                                                    // Si tenemos un valor en la referencia, lo usamos primero
                                                    if (
                                                        selectedRoomTypeRef.current
                                                    ) {
                                                        // Buscar la opción correspondiente para mostrar también la capacidad
                                                        const option =
                                                            roomTypeOptions.find(
                                                                opt =>
                                                                    opt.value ===
                                                                    selectedRoomTypeRef.current
                                                            );
                                                        if (option) {
                                                            return option.label;
                                                        }
                                                    }

                                                    // Si no hay valor en la referencia pero sí en field.value
                                                    if (
                                                        field.value &&
                                                        query.data
                                                    ) {
                                                        const selectedRoom =
                                                            query.data.find(
                                                                room =>
                                                                    room.id ===
                                                                    field.value
                                                            );

                                                        if (selectedRoom) {
                                                            const roomType =
                                                                selectedRoom
                                                                    .RoomTypes
                                                                    .name;
                                                            const guestCapacity =
                                                                selectedRoom
                                                                    .RoomTypes
                                                                    .guests ||
                                                                0;

                                                            // Actualizamos la referencia por si acaso
                                                            if (
                                                                !selectedRoomTypeRef.current
                                                            ) {
                                                                selectedRoomTypeRef.current =
                                                                    roomType;
                                                            }

                                                            return `${roomType.toUpperCase()} - 🧍(${guestCapacity})`;
                                                        }
                                                    }

                                                    // Si no hay valor, no mostramos nada
                                                    return null;
                                                })()}
                                            </SelectValue>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {roomTypeOptions.map(option => (
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
                                    {query.data && query.data.length > 0
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
                                    onChange={date => {
                                        const newDate = setCheckInTime(date);
                                        if (
                                            date &&
                                            date >=
                                                startOfDay(values.checkOutDate)
                                        ) {
                                            const oneDayAfterSelectedCheckedInDate =
                                                setCheckOutTime(
                                                    addDays(date, 1)
                                                );
                                            form.setValue(
                                                'checkOutDate',
                                                oneDayAfterSelectedCheckedInDate
                                            );
                                        }
                                        field.onChange(newDate);
                                    }}
                                    disabled={
                                        mutation.isPending ||
                                        query.isLoading ||
                                        !query.data
                                    }
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
                                            date <=
                                                startOfDay(values.checkInDate)
                                        ) {
                                            toast.error(
                                                t(
                                                    'input4.errors.dateError.before'
                                                )
                                            );
                                            return;
                                        }
                                        field.onChange(newDate);
                                    }}
                                    controlled={true}
                                    className={inputCommonClassnames}
                                    disabled={
                                        mutation.isPending ||
                                        query.isLoading ||
                                        !query.data
                                    }
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
                            disabled={mutation.isPending}
                        >
                            {t('submitButton.label')}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
