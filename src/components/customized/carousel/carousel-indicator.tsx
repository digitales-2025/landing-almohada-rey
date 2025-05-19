'use client';

import React, {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { EmblaCarouselType } from 'embla-carousel';

import { cn } from '@/lib/utils';

type useCarouselIndicatorType = {
    selectedIndex: number;
    scrollSnaps: number[];
    onDotButtonClick: (index: number) => void;
};

export const useCarouselIndicator = (
    emblaApi: EmblaCarouselType | undefined
): useCarouselIndicatorType => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi
            .on('reInit', onInit)
            .on('reInit', onSelect)
            .on('select', onSelect);
    }, [emblaApi, onInit, onSelect]);

    return {
        selectedIndex,
        scrollSnaps,
        onDotButtonClick,
    };
};

type PropType = ComponentPropsWithRef<'button'>;

type Props = React.FC<
    PropType & {
        variant?: 'default' | 'outline';
        selected: boolean;
    }
>;

export const CarouselDotButton: Props = props => {
    const {
        children,
        className,
        variant,
        selected = false,
        ...restProps
    } = props;
    const variantsMap = {
        default:
            'bg-primary-foreground transition-all duration-300 ease-in-out hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
        outline:
            'bg-transparent border border-primary-foreground hover:bg-primary/80 transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-1 focus:bg-primary-foreground disabled:opacity-50 disabled:pointer-events-none',
    };

    const onSelectedClassNameMap = {
        default: 'bg-primary-foreground/80',
        outline: 'bg-primary-foreground/80',
    };

    const chosenVariant = variantsMap[variant || 'default'];
    const selectedClassName = onSelectedClassNameMap[variant || 'default'];

    const buttonClassName = cn(
        'cursor-pointer rounded-full min-w-[8px] size-[10px] aspect-square',
        chosenVariant,
        selected && selectedClassName,
        className
    );

    return (
        <button type="button" className={buttonClassName} {...restProps}>
            {children}
        </button>
    );
};
