import * as React from 'react';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as RPNInput from 'react-phone-number-input';
import { Country } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';
import en from 'react-phone-number-input/locale/en.json';
import es from 'react-phone-number-input/locale/es.json';

import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SupportedLocales } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { Dictionary } from '@/types/api/translation-dictionary';

const dictionary: Dictionary = {
    emptyMessage: {
        es: 'No se encontró ningún país',
        en: 'No country found',
    },
    searchCountryPlaceHolder: {
        es: 'Buscar país...',
        en: 'Search country...',
    },
};

type FlagSize = 'small' | 'medium' | 'large';

type PhoneInputProps = Omit<
    React.ComponentProps<'input'>,
    'onChange' | 'value' | 'ref'
> &
    Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
        onChange?: (value: RPNInput.Value) => void;
        locale?: SupportedLocales;
        inputClassname?: string;
        countrySelectClassname?: string;
        flagSize?: FlagSize;
    };

const FlagComponent = ({
    country,
    countryName,
    flagSize,
}: RPNInput.FlagProps & { flagSize?: FlagSize }) => {
    const Flag = flags[country];

    // Define sizes for the container
    const flagSizeClassNames = {
        small: 'h-4 w-6',
        medium: 'h-5 w-7',
        large: 'h-6 w-8',
    };

    const sizeClass = flagSize
        ? flagSizeClassNames[flagSize]
        : flagSizeClassNames.small;

    return (
        <span className={cn('flex overflow-hidden rounded-sm', sizeClass)}>
            {Flag && (
                <div className="flex w-full h-full [&>svg]:!size-full">
                    <Flag title={countryName} />
                </div>
            )}
        </span>
    );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
    selectedCountry: RPNInput.Country;
    onChange: (country: RPNInput.Country) => void;
    flagSize?: FlagSize;
}

const CountrySelectOption = ({
    country,
    countryName,
    selectedCountry,
    onChange,
}: CountrySelectOptionProps) => {
    return (
        <CommandItem className="gap-2" onSelect={() => onChange(country)}>
            <FlagComponent country={country} countryName={countryName} />
            <span className="flex-1 text-sm">{countryName}</span>
            <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
            <CheckIcon
                className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
            />
        </CommandItem>
    );
};

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
    disabled?: boolean;
    value: RPNInput.Country;
    options: CountryEntry[];
    onChange: (country: RPNInput.Country) => void;
    locale?: SupportedLocales;
    className?: string;
    flagSize?: FlagSize;
};

const CountrySelect = ({
    disabled,
    value: selectedCountry,
    options: countryList,
    onChange,
    className,
    flagSize,
    locale,
}: CountrySelectProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        'flex gap-1 rounded-e-none rounded-s-lg border-r-0 px-3 focus:z-10',
                        className
                    )}
                    disabled={disabled}
                >
                    <FlagComponent
                        country={selectedCountry}
                        countryName={selectedCountry}
                        flagSize={flagSize}
                    />
                    <ChevronsUpDown
                        className={cn(
                            '-mr-2 size-4 opacity-50',
                            disabled ? 'hidden' : 'opacity-100'
                        )}
                    />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput
                        placeholder={
                            dictionary.searchCountryPlaceHolder[locale ?? 'es']
                        }
                    />
                    <CommandList>
                        <ScrollArea className="h-72">
                            <CommandEmpty>
                                {dictionary.emptyMessage[locale ?? 'es']}
                            </CommandEmpty>
                            <CommandGroup>
                                {countryList.map(({ value, label }) =>
                                    value ? (
                                        <CountrySelectOption
                                            key={value}
                                            country={value}
                                            countryName={label}
                                            selectedCountry={selectedCountry}
                                            onChange={onChange}
                                        />
                                    ) : null
                                )}
                            </CommandGroup>
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

const InputComponent = React.forwardRef<
    HTMLInputElement,
    React.ComponentProps<'input'>
>(({ className, ...props }, ref) => (
    <Input
        className={cn('rounded-e-lg rounded-s-none', className)}
        {...props}
        ref={ref}
    />
));
InputComponent.displayName = 'InputComponent';

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> =
    React.forwardRef<
        React.ElementRef<typeof RPNInput.default>,
        PhoneInputProps
    >(
        (
            {
                className,
                onChange,
                countrySelectClassname,
                inputClassname,
                locale = 'es',
                flagSize,
                ...props
            },
            ref
        ) => {
            return (
                <RPNInput.default
                    ref={ref}
                    className={cn('flex', className)}
                    flagComponent={FlagComponent}
                    labels={locale === 'es' ? es : en}
                    countrySelectComponent={props => (
                        <CountrySelect
                            {...props}
                            className={countrySelectClassname}
                            flagSize={flagSize}
                            locale={locale}
                        />
                    )}
                    inputComponent={props => (
                        <InputComponent {...props} className={inputClassname} />
                    )}
                    smartCaret={false}
                    onChange={value =>
                        onChange?.(value || ('' as RPNInput.Value))
                    }
                    {...props}
                />
            );
        }
    );
PhoneInput.displayName = 'PhoneInput';

interface MemoizedPhoneInputProps {
    value: string;
    onChange: (value: string) => void;
    defaultCountry: Country;
    placeholder: string;
    locale: SupportedLocales;
    className?: string;
    inputClassname?: string;
    countrySelectClassname?: string;
    flagSize?: 'small' | 'medium' | 'large';
    disabled?: boolean;
}
// Componente memorizado con comparación profunda
const MemoizedPhoneInput = React.memo(
    ({
        value,
        onChange,
        defaultCountry,
        placeholder,
        locale,
        className,
        inputClassname,
        countrySelectClassname,
        flagSize,
        disabled,
    }: MemoizedPhoneInputProps) => {
        // Memoizar el handler de cambio para prevenir recreaciones
        const handleChange = React.useCallback(
            (newValue: string) => {
                onChange(newValue);
            },
            [onChange]
        );

        return (
            <PhoneInput
                defaultCountry={defaultCountry}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                locale={locale}
                className={className}
                inputClassname={inputClassname}
                countrySelectClassname={countrySelectClassname}
                flagSize={flagSize}
                disabled={disabled}
            />
        );
    },
    // Función de comparación más adecuada que permite actualizaciones del valor
    (prevProps, nextProps) => {
        // Importante: NO comparar el value aquí, ya que necesitamos que se actualice
        // Sólo evitar renderizados si cambian estas props menos frecuentes
        return (
            prevProps.disabled === nextProps.disabled &&
            prevProps.defaultCountry === nextProps.defaultCountry &&
            prevProps.locale === nextProps.locale &&
            prevProps.placeholder === nextProps.placeholder
        );
    }
);

MemoizedPhoneInput.displayName = 'MemoizedPhoneInput';

export { PhoneInput, MemoizedPhoneInput };
