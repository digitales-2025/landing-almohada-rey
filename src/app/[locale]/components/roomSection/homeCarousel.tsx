'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { CustomCard } from '@/components/customized/card/custom-card';
import {
    NextButton,
    PrevButton,
    useCarouselButtons,
} from '@/components/customized/carousel/carousel-button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from '@/components/ui/carousel';
import { formatPrice } from '@/lib/i18n-formatPrice';

export type CarouselItemProps = {
    image: string;
    title: string;
    pricing: {
        label: string;
        price: string;
    };
    features: {
        label: string;
    }[];
};

export function HomeCarousel() {
    const t = useTranslations('IndexPage.confortableRoomsSection');
    const locale = useLocale();
    const [api, setApi] = useState<CarouselApi>();
    // const [_current, setCurrent] = useState(0);
    // const [_count, setCount] = useState(0);

    const carouselButtons = useCarouselButtons(api);

    const carouselItems: CarouselItemProps[] = [
        {
            image: '/home/carousel/home_carousel_1.webp',
            title: t('carousel.item1.title'),
            pricing: {
                label: t('carousel.item1.pricing.label'),
                price: formatPrice(
                    t('carousel.item1.pricing.price'),
                    t('carousel.item1.pricing.currency'),
                    locale
                ),
            },
            features: [
                { label: 'Feature 1' },
                { label: 'Feature 2' },
                { label: 'Feature 3' },
            ],
        },
        {
            image: '/home/carousel/home_carousel_2.webp',
            title: t('carousel.item2.title'),
            pricing: {
                label: t('carousel.item2.pricing.label'),
                price: formatPrice(
                    t('carousel.item2.pricing.price'),
                    t('carousel.item2.pricing.currency'),
                    locale
                ),
            },
            features: [
                { label: 'Feature 1' },
                { label: 'Feature 2' },
                { label: 'Feature 3' },
            ],
        },
        {
            image: '/home/carousel/home_carousel_1.webp',
            title: t('carousel.item3.title'),
            pricing: {
                label: t('carousel.item3.pricing.label'),
                price: formatPrice(
                    t('carousel.item3.pricing.price'),
                    t('carousel.item3.pricing.currency'),
                    locale
                ),
            },
            features: [
                { label: 'Feature 1' },
                { label: 'Feature 2' },
                { label: 'Feature 3' },
            ],
        },
    ];

    useEffect(() => {
        if (!api) {
            return;
        }

        // setCount(api.scrollSnapList().length);
        // setCurrent(api.selectedScrollSnap() + 1);

        // api.on('select', () => {
        //     setCurrent(api.selectedScrollSnap() + 1);
        // });
    }, [api]);
    return (
        <div className="px-6 lg:px-12 relative h-fit">
            <Carousel setApi={setApi}>
                <CarouselContent className="gap-10">
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <CustomCard
                                cardTitle={{
                                    text: item.title,
                                    className: 'text-lg font-bold',
                                }}
                                cardImage={{
                                    src: item.image,
                                    alt: item.title,
                                }}
                                description={{
                                    text: `${item.title} description`,
                                    className: 'text-sm',
                                }}
                                pricing={{
                                    caption: item.pricing.label,
                                    price: item.pricing.price,
                                    sufix: '/night',
                                }}
                                hasSeparator={false}
                                headerClassname="px-5 lg:px-8"
                                contentClassname="px-5 pb-5 lg:px-8 lg:pb-8"
                            ></CustomCard>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="h-full absolute left-0 z-10 top-0 flex items-center">
                <PrevButton
                    onClick={carouselButtons.onPrevButtonClick}
                ></PrevButton>
            </div>
            <div className="h-full absolute right-0 z-10 top-0 flex items-center">
                <NextButton
                    onClick={carouselButtons.onNextButtonClick}
                ></NextButton>
            </div>
        </div>
    );
}
