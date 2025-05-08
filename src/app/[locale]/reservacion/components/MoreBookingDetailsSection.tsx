import React from 'react';
import { UseMutationResult } from '@tanstack/react-query';
import { useLocale, useTranslations } from 'next-intl';
import { UseFormReturn } from 'react-hook-form';
import { Country } from 'react-phone-number-input';

import {
    ConfirmBookingDtoForSchema,
    CustomerDocumentType,
    DetailedReservation,
} from '@/actions/booking/booking';
import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { Checkbox } from '@/components/ui/checkbox';
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { MemoizedPhoneInput } from '@/components/ui/phone-input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { formatPrice } from '@/lib/i18n-formatPrice';
import { cn } from '@/lib/utils';
import { BaseApiResponse } from '@/types/api/types';
import { FormValues } from '../hooks/server.booking.schema';
// import { BookingWebSocketHookReturnType } from '../hooks/useBookingWs';
import { UpdateReservationDialog } from './updateForm/UpdateReservationDialog';

type FormGridClassnames = Record<
    string,
    {
        base: string;
        sm?: string;
        md?: string;
        lg?: string;
        xl?: string;
        '2xl'?: string;
    }
>;

// interface GridItem extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
//   className?: string;
//   children?: React.ReactNode;
// }

export type FormGrid = {
    items: React.ReactNode[];
};

interface Props {
    form: UseFormReturn<FormValues>;
    mutatioResult: UseMutationResult<
        BaseApiResponse<DetailedReservation>,
        any,
        ConfirmBookingDtoForSchema,
        unknown
    >;
    onUpdateBookingData: () => void;
    // wsConnectionResult: BookingWebSocketHookReturnType;
    disabled?: boolean;
}

export const textColor = 'text-secondary';
export const labelClassname = cn(
    textColor,
    'text-sm md:text-base lg:text-p font-light tracking-normal uppercase'
);
export const fieldClassname = cn(
    textColor,
    'text-sm md:text-base lg:text-p font-normal tracking-normal'
);
export const inputCommonClassnames = cn(
    'rounded-none border-none shadow-none w-full bg-primary-foreground px-3 md:px-5 min-h-[50px] md:min-h-[72px]',
    fieldClassname
);

export const AditionalDataReservationSection = ({
    form,
    mutatioResult,
    onUpdateBookingData,
    // wsConnectionResult,
    disabled,
}: Props) => {
    const t = useTranslations('IndexPageBooking.moreReservationDetailsSection');
    const locale = useLocale();
    const defaultTelCode: Country = locale === 'es' ? 'PE' : 'US';
    const defaultTelNumberPlaceholder =
        locale === 'es' ? '999 999 999' : '(555) 555-5555';
    // const [selectedCountryCode, setSelectedCountryCode] = useState<Country>(defaultTelCode);
    const formGridClassnames: FormGridClassnames = {
        generalGrid: {
            base: 'grid grid-cols-1 gap-4',
            md: 'md:grid-cols-2 md:gap-4',
            // lg: 'grid grid-cols-3 gap-4',
            // xl: 'grid grid-cols-4 gap-4',
            // '2xl': 'grid grid-cols-5 gap-4',
        },
    };

    const customerDocumentTypeLabel: Record<CustomerDocumentType, string> = {
        DNI: t('input1.docTypeField.values.dni'),
        PASSPORT: t('input1.docTypeField.values.passport'),
        FOREIGNER_CARD: t('input1.docTypeField.values.carnetExtranjeria'),
    };

    const customerDocumentTypeOptions = Object.entries(
        customerDocumentTypeLabel
    ).map(([key, value]) => ({
        value: key as CustomerDocumentType,
        label: value,
    }));

    const provisionalAmount = {
        amount: 100,
        currency: 'PEN',
    };

    // const formGrid: FormGrid = {
    //     items: [
    //         <div className="bg-primary-foreground p-4 rounded shadow">Item 1</div>,
    //         <div className="bg-white p-4 rounded shadow">Item 2</div>,
    //         <div className="bg-white p-4 rounded shadow">Item 3</div>,
    //         <div className="bg-white p-4 rounded shadow">Item 4</div>,
    //     ],
    // };

    const formGrid: FormGrid = {
        items: [
            <div
                key={'formItem1'}
                className="col-span-2 lg:col-span-1 space-y-4 w-full"
            >
                <div className="flex space-x-2 items-end">
                    <Table>
                        <TableHeader className="pl-0">
                            <TableRow className="text-lg font-semibold">
                                <TableHead
                                    className="pl-0 capitalize"
                                    colSpan={2}
                                >
                                    <div className="flex flex-col">
                                        <span>{'suite'}</span>
                                        <span className="text-sm font-normal opacity-80">
                                            {'todas la noches y los huespedes'}
                                        </span>
                                    </div>
                                </TableHead>
                                <TableHead className="flex items-start">
                                    <span className="h-fit">
                                        {'Total en numeros'}
                                    </span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* <TableRow>
                                <TableCell className='pl-0 text-wrap capitalize' colSpan={2}>todas la noches y los huespedes</TableCell>
                            </TableRow> */}
                            <TableRow className="capitalize">
                                <TableCell colSpan={2} className="pl-0">
                                    {'check in'}
                                </TableCell>
                                <TableCell>{'total check in'}</TableCell>
                            </TableRow>
                            <TableRow className="capitalize">
                                <TableCell colSpan={2} className="pl-0">
                                    {'check out'}
                                </TableCell>
                                <TableCell>{'total check out'}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    {/* <Button type='button' variant={'secondary'} onClick={()=> setShowUpdateDialog(true)} className='rounded-none h-fit my-3' size={'lg'}>
                        <span className='mx-3 !my-2 text-sm md:text-lg lg:text-xl'>{t('triggerButton.label')}</span>
                    </Button>
                    {
                        showUpdateDialog && 
                    } */}
                    <UpdateReservationDialog
                        onUpdateBookingData={onUpdateBookingData}
                        // reservationData={}
                    ></UpdateReservationDialog>
                </div>
                <FormField
                    control={form.control}
                    name="didAcceptExtraServices"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-2 space-y-0 rounded-none w-full">
                            <FormControl>
                                <Checkbox
                                    disabled={disabled}
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none text-sm opacity-80 hover:opacity-100 text-secondary font-light">
                                <FormLabel className="text-sm">
                                    {t('input6.label', {
                                        amount: formatPrice(
                                            provisionalAmount.amount.toString(),
                                            provisionalAmount.currency,
                                            locale
                                        ),
                                    })}
                                </FormLabel>
                                <FormDescription>
                                    {t('input6.description')}
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
            </div>,
            <div
                key={'formItem2'}
                className="flex flex-col gap-2 items-end place-self-end w-full"
            >
                <FormLabel className={cn(labelClassname, 'w-full')}>
                    {t('input1.label')}
                </FormLabel>
                <div className="flex gap-2 h-full w-full ">
                    <FormField
                        control={form.control}
                        name="customer.documentType"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel className={labelClassname}>
                                    {t('input1.label')}
                                </FormLabel> */}
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={disabled}
                                    >
                                        <SelectTrigger
                                            className={inputCommonClassnames}
                                        >
                                            <SelectValue
                                                placeholder={t(
                                                    'input1.docTypeField.placeholder'
                                                )}
                                            >
                                                {
                                                    customerDocumentTypeLabel[
                                                        field.value as CustomerDocumentType
                                                    ]
                                                }
                                            </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {customerDocumentTypeOptions.map(
                                                option => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="customer.documentNumber"
                        render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="text"
                                        className={inputCommonClassnames}
                                        disabled={
                                            mutatioResult.isPending || disabled
                                        }
                                    />
                                </FormControl>
                                <FormDescription>
                                    {t('input1.description')}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>,
            <FormField
                key={'formItem3'}
                control={form.control}
                name="customer.name"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className={labelClassname}>
                            {t('input2.label')}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                className={inputCommonClassnames}
                                disabled={mutatioResult.isPending || disabled}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input2.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
            <FormField
                key={'formItem4'}
                control={form.control}
                name="customer.lastname"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className={labelClassname}>
                            {t('input3.label')}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="text"
                                className={inputCommonClassnames}
                                disabled={mutatioResult.isPending || disabled}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input3.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
            <FormField
                key={'formItem5'}
                control={form.control}
                name="customer.email"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className={labelClassname}>
                            {t('input4.label')}
                        </FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type="email"
                                className={inputCommonClassnames}
                                disabled={mutatioResult.isPending || disabled}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input4.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
            // <FormField
            //     key={'formItem6'}
            //     control={form.control}
            //     name="customer.phone"
            //     render={({ field }) => (
            //         <MemoizedPhoneInputField
            //             field={field}
            //             label={t('input5.label')}
            //             description={t('input5.description')}
            //             defaultCountry={defaultTelCode}
            //             placeholder={defaultTelNumberPlaceholder}
            //             locale={locale}
            //             disabled={mutatioResult.isPending || disabled || false}
            //         />
            //     )}
            // />,
            <FormField
                key={'formItem6'}
                control={form.control}
                name="customer.phone"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel className={labelClassname}>
                            {t('input5.label')}
                        </FormLabel>
                        <FormControl>
                            <MemoizedPhoneInput
                                defaultCountry={defaultTelCode}
                                placeholder={defaultTelNumberPlaceholder}
                                value={field.value}
                                onChange={value => field.onChange(value)}
                                locale={locale}
                                className={cn(
                                    inputCommonClassnames,
                                    '!px-0 gap-2 bg-transparent'
                                )}
                                inputClassname={inputCommonClassnames}
                                countrySelectClassname={cn(
                                    inputCommonClassnames,
                                    'w-fit md:min-w-[80px]'
                                )}
                                flagSize="medium"
                                disabled={mutatioResult.isPending || disabled}
                            />
                        </FormControl>
                        <FormDescription>
                            {t('input5.description')}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />,
        ],
    };

    return (
        <SectionWrapper
            className={cn(sectionLayoutClassnames, 'bg-primary/10')}
        >
            <SectionHeader
                headerTitle={{
                    text: t('title'),
                }}
                description={{
                    text: t('description'),
                }}
                alignment="left"
            >
                {/* Additional content can be added here */}
            </SectionHeader>
            <div
                className={cn(
                    formGridClassnames.generalGrid.base,
                    formGridClassnames.generalGrid.md,
                    'place-items-start'
                )}
            >
                {formGrid.items.map((item, index) => (
                    <React.Fragment key={index}>{item}</React.Fragment>
                ))}
            </div>
        </SectionWrapper>
    );
};
