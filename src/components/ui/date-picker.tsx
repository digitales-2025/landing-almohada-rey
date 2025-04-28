'use client';

import * as React from 'react';
import { CalendarIcon } from 'lucide-react';
import { useLocale } from 'next-intl';
import { Matcher } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    formatDateToLimaTimezone,
    getLimaTime,
} from '@/lib/timedate/peru-datetime';
import { cn } from '@/lib/utils';
import { FormControl } from './form';

// import { useTranslations } from 'next-intl';

type DatePickerProps = {
    date: Date | undefined;
    onChange: (date: Date | undefined) => void;
    className?: string;
    disabled?: Matcher;
    controlled?: boolean;
};

export function DatePicker({
    date,
    onChange,
    className,
    disabled,
    controlled = false,
}: DatePickerProps) {
    // const t = useTranslations()
    const [localDate, localSetDate] = React.useState<Date | undefined>(date);
    const locale = useLocale();

    const handleOnSelect = (date: Date | undefined) => {
        localSetDate(date);
        onChange(date);
    };

    const defaultDayPickerDisabled: Matcher = {
        before: getLimaTime(), //today
        after: getLimaTime(
            new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        ), //one year from now
    };
    return (
        <Popover>
            <PopoverTrigger asChild>
                {controlled ? (
                    <FormControl>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-[240px] justify-start text-left font-normal',
                                !localDate && 'text-muted-foreground',
                                className
                            )}
                        >
                            <CalendarIcon />
                            {localDate ? (
                                formatDateToLimaTimezone(localDate, locale)
                                    .short
                            ) : (
                                <span>Pick a date</span>
                            )}
                        </Button>
                    </FormControl>
                ) : (
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-[240px] justify-start text-left font-normal',
                            !localDate && 'text-muted-foreground',
                            className
                        )}
                    >
                        <CalendarIcon />
                        {localDate ? (
                            formatDateToLimaTimezone(localDate, locale).short
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    className="w-full"
                    mode="single"
                    selected={localDate}
                    onSelect={date => handleOnSelect(date)}
                    disabled={disabled ?? defaultDayPickerDisabled}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
