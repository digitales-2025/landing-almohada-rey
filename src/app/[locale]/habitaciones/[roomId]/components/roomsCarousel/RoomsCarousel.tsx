'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FaPhoneVolume, FaShower } from 'react-icons/fa';
import { IoIosWifi } from 'react-icons/io';
import { IoBed } from 'react-icons/io5';
import { MdResetTv } from 'react-icons/md';
import { PiDeskFill } from 'react-icons/pi';

import { FetchingError } from '@/components/common/Errors/FetchingErrors';
import { LoadingCardSkeleton } from '@/components/common/loading/LoadingCardSkeleton';
import {
    CustomCard,
    CustomCardProps,
    IconFeature,
} from '@/components/customized/card/custom-card';
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
import { useRooms } from '@/hooks/queries/rooms/useRooms';
import { formatPrice } from '@/lib/i18n-formatPrice';

export type CarouselItemProps = {
    image: string;
    title: string;
    pricing: {
        label: string;
        price: string;
        sufix: string;
    };
    features: {
        label: string;
    }[];
};

export function RoomsCarousel() {
    const t = useTranslations('IndexPageRoom');
    const locale = useLocale();
    const pricingClassnames =
        '!text-h7 lg:!text-h6 xl:!text-h6 2xl:!text-h6 text-primary';
    const [api, setApi] = useState<CarouselApi>();

    const carouselButtons = useCarouselButtons(api);

    const { useRoomTypeQuery } = useRooms();
    const {
        data: roomTypes,
        isLoading,
        isError,
        error,
        refetch,
    } = useRoomTypeQuery();

    if (isLoading || !roomTypes) {
        return <LoadingCardSkeleton classNameSkeletonItems="bg-secondary/10" />;
    }

    if (isError) {
        return (
            <FetchingError
                title={'Error'}
                message={t('fetching.error.message') + ' ' + error.message}
                onRefetch={() => {
                    refetch();
                }}
                refetchButtonLabel={t('fetching.error.actionButton.label')}
            ></FetchingError>
        );
    }

    const commonFeatures: IconFeature[] = [
        {
            Icon: IoIosWifi,
            tooltip: t('card.commonFeatures.item1'),
        },
        {
            Icon: MdResetTv,
            tooltip: t('card.commonFeatures.item2'),
        },
        {
            Icon: FaPhoneVolume,
            tooltip: t('card.commonFeatures.item3'),
        },
        {
            Icon: FaShower,
            tooltip: t('card.commonFeatures.item4'),
        },
        {
            Icon: PiDeskFill,
            tooltip: t('card.commonFeatures.item5'),
        },
    ];

    const rooms: CustomCardProps[] = roomTypes.map(roomType => {
        return {
            cardImage: {
                alt: roomType.name,
                src: roomType.mainImageUrl,
            },
            cardTitle: {
                text: roomType.name,
            },
            description: {
                text: roomType.description,
            },
            features: [
                {
                    caption: t('card.commonFeatures.guest', {
                        count: roomType.guests,
                    }),
                },
                [
                    {
                        tooltip: roomType.bed,
                        Icon: IoBed,
                    },
                    ...commonFeatures,
                ],
            ],
            pricing: {
                price: formatPrice(String(roomType.price), 'PEN', locale),
                caption: t('card.pricing.label'),
                sufix: t('card.pricing.sufix'),
                actionButton: {
                    label: t('card.ctaButton.label'),
                    href: t('card.ctaButton.link'),
                },
                className: pricingClassnames,
            },
        };
    });

    return (
        <div className="px-16 lg:px-24 relative h-fit">
            <Carousel
                setApi={setApi}
                opts={{
                    loop: true,
                    dragFree: true,
                    containScroll: 'keepSnaps',
                    skipSnaps: false,
                }}
            >
                <CarouselContent className="gap-10 ">
                    {rooms.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <CustomCard
                                className="w-full"
                                cardTitle={{
                                    text: item.cardTitle.text,
                                    className: 'text-lg font-bold capitalize',
                                }}
                                description={{
                                    text: item.description!.text,
                                    collapsible: {
                                        lineClamp: 3,
                                    },
                                }}
                                cardImage={item.cardImage}
                                pricing={item.pricing}
                                features={item.features}
                                hasSeparator={true}
                            ></CustomCard>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
            <div className="h-full absolute left-0 z-10 top-0 flex items-center">
                <PrevButton
                    className="bg-transparent shadow-none px-0 hover:bg-transparent opacity-50 hover:opacity-100"
                    iconClassName="lg:w-[50px] lg:h-[100px] text-secondary"
                    onClick={carouselButtons.onPrevButtonClick}
                    iconAlternateColor={true}
                ></PrevButton>
            </div>
            <div className="h-full absolute right-0 z-10 top-0 flex items-center">
                <NextButton
                    className="bg-transparent shadow-none px-0 hover:bg-transparent opacity-50 hover:opacity-100"
                    iconClassName="lg:w-[50px] lg:h-[100px] text-secondary"
                    onClick={carouselButtons.onNextButtonClick}
                    iconAlternateColor={true}
                ></NextButton>
            </div>
        </div>
    );
}
