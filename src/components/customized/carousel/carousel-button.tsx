'use client';

import React, {
    ComponentPropsWithRef,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { type EmblaCarouselType } from 'embla-carousel';

import { cn } from '@/lib/utils';
import { CarouselRightIcon } from './CarouselRightIcon';

type UseCarouselButtonsType = {
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
    onPrevButtonClick: () => void;
    onNextButtonClick: () => void;
};

export const useCarouselButtons = (
    emblaApi: EmblaCarouselType | undefined,
    onButtonClick?: (emblaApi: EmblaCarouselType) => void
): UseCarouselButtonsType => {
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

    const onPrevButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollPrev();
        if (onButtonClick) onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);

    const onNextButtonClick = useCallback(() => {
        if (!emblaApi) return;
        emblaApi.scrollNext();
        if (onButtonClick) onButtonClick(emblaApi);
    }, [emblaApi, onButtonClick]);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setPrevBtnDisabled(!emblaApi.canScrollPrev());
        setNextBtnDisabled(!emblaApi.canScrollNext());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onSelect(emblaApi);
        emblaApi.on('reInit', onSelect).on('select', onSelect);
    }, [emblaApi, onSelect]);

    return {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    };
};

type PropType = ComponentPropsWithRef<'button'>;

export const PrevButton: React.FC<PropType> = props => {
    const { children, ...restProps } = props;

    return (
        <button
            type="button"
            {...restProps}
            className={cn(
                'rounded-full w-14 lg:w-20 aspect-square flex items-center justify-center bg-primary/80 hover:bg-primary transition-colors text-primary-foreground shadow-sm cursor-pointer',
                restProps.className
            )}
        >
            <CarouselRightIcon className="rotate-180 w-[12px] h-[22px] lg:w-[22px] lg:h-[42px]"></CarouselRightIcon>
            {children}
        </button>
    );
};

export const NextButton: React.FC<PropType> = props => {
    const { children, ...restProps } = props;

    return (
        <button
            type="button"
            {...restProps}
            className={cn(
                'rounded-full w-14 lg:w-20 aspect-square flex items-center justify-center bg-primary/80 hover:bg-primary transition-colors text-primary-foreground shadow-sm cursor-pointer',
                restProps.className
            )}
        >
            <CarouselRightIcon className="w-[12px] h-[22px] lg:w-[22px] lg:h-[42px]"></CarouselRightIcon>
            {children}
        </button>
    );
};
