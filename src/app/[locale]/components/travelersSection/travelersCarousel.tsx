'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { CustomCard } from '@/components/customized/card/custom-card';
import {
    NextButton,
    PrevButton,
    useCarouselButtons,
} from '@/components/customized/carousel/carousel-button';
import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';

type CarouselItemProps = {
    image: string;
    caption: string;
    description: string;
    href: string;
};

export const TravelersCarousel = () => {
    const t = useTranslations('IndexPage.travelersSection.carousel');
    const [api, setApi] = useState<CarouselApi>();
    const carouselButtons = useCarouselButtons(api);
    const carouselItems: CarouselItemProps[] = [
        {
            image: '/home/travellersCarousel/travellers_carousel_1.webp',
            caption: t('item1.title').toUpperCase(),
            description: t('item1.name'),
            href: '/viajeros',
        },
        {
            image: '/home/travellersCarousel/travellers_carousel_2.webp',
            caption: t('item2.title').toUpperCase(),
            description: t('item3.name'),
            href: '/viajeros',
        },
        {
            image: '/home/travellersCarousel/travellers_carousel_3.webp',
            caption: t('item3.title').toUpperCase(),
            description: t('item3.name'),
            href: '/viajeros',
        },
        {
            image: '/home/travellersCarousel/travellers_carousel_1.webp',
            caption: t('item1.title').toUpperCase(),
            description: t('item1.name'),
            href: '/viajeros',
        },
    ];
    return (
        <div className="relative h-fit">
            <Carousel setApi={setApi}>
                <CarouselContent className="gap-2 lg:gap-3">
                    {carouselItems.map((item, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 md:basis-1/3"
                        >
                            <CustomCard
                                caption={{
                                    text: item.caption,
                                    className:
                                        '!text-sm lg:!text-h9 !text-wrap leading-1 sm:leading-8 text-primary',
                                }}
                                cardTitle={{
                                    text: item.description,
                                    className:
                                        'font-normal !text-h8 sm:!text-h7 md:!text-h6 lg:!text-h5 !text-wrap leading-6 sm:leading-8 lg:leading-10 pb-1',
                                }}
                                cardImage={{
                                    src: item.image,
                                    alt: item.caption,
                                }}
                                hasSeparator={false}
                                headerClassname="truncate text-ellipsis"
                                contentClassname="truncate"
                                href={item.href}
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
};
