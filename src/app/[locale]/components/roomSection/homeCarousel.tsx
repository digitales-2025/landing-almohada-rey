'use client';

import { useRef, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useLocale, useTranslations } from 'next-intl';

import { CheckRoomAvailabilityDto } from '@/actions/booking/booking';
import { FetchingError } from '@/components/common/Errors/FetchingErrors';
import { LoadingCardSkeleton } from '@/components/common/loading/LoadingCardSkeleton';
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
import { useAvailability } from '@/hooks/queries/booking/useRoomAvailability';
import { useRooms } from '@/hooks/queries/rooms/useRooms';
import { useRouter } from '@/i18n/navigation';
import { formatPrice } from '@/lib/i18n-formatPrice';
import { getCheckInDate, getCheckOutDate } from '@/lib/timedate/peru-datetime';

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

export function HomeCarousel() {
    const t = useTranslations('IndexPage.confortableRoomsSection');
    const locale = useLocale();
    const router = useRouter();
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

    const today = getCheckInDate();
    const tomorrowDate = new Date(today.getTime()); // Crear una copia
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = getCheckOutDate(tomorrowDate);

    const defaultAvailabilityDataRef = useRef<CheckRoomAvailabilityDto>({
        checkInDate: today.toISOString(),
        checkOutDate: tomorrow.toISOString(),
        guestNumber: 1,
    });

    const { query: availableRooms, selectRandomRoomByType } = useAvailability(
        defaultAvailabilityDataRef.current
    );

    if (
        isLoading ||
        !roomTypes ||
        availableRooms.isLoading ||
        !availableRooms.data
    ) {
        return <LoadingCardSkeleton classNameSkeletonItems="bg-primary/10" />;
    }

    if (isError) {
        return (
            <FetchingError
                title={'Error'}
                message={t('fetchingError.message') + ' ' + error.message}
                onRefetch={() => {
                    refetch();
                }}
                refetchButtonLabel={t('fetchingError.actionButton.label')}
            ></FetchingError>
        );
    }

    if (availableRooms.isError) {
        return (
            <FetchingError
                title={'Error'}
                message={
                    t('fetchingError.message') +
                    ' ' +
                    availableRooms.error.message
                }
                onRefetch={() => {
                    availableRooms.refetch();
                }}
                refetchButtonLabel={t('fetchingError.actionButton.label')}
            ></FetchingError>
        );
    }

    // const carouselItems: CarouselItemProps[] = [
    //     {
    //         image: '/home/carousel/home_carousel_1.webp',
    //         title: t('carousel.item1.title'),
    //         pricing: {
    //             label: t('carousel.item1.pricing.label'),
    //             price: formatPrice(
    //                 t('carousel.item1.pricing.price'),
    //                 t('carousel.item1.pricing.currency'),
    //                 locale
    //             ),
    //             sufix: t('carousel.item1.pricing.sufix'),
    //         },
    //         features: [
    //             { label: t('carousel.item1.features.item1') },
    //             { label: t('carousel.item1.features.item2') },
    //             { label: t('carousel.item1.features.item3') },
    //         ],
    //     },
    //     {
    //         image: '/home/carousel/home_carousel_2.webp',
    //         title: t('carousel.item2.title'),
    //         pricing: {
    //             label: t('carousel.item2.pricing.label'),
    //             price: formatPrice(
    //                 t('carousel.item2.pricing.price'),
    //                 t('carousel.item2.pricing.currency'),
    //                 locale
    //             ),
    //             sufix: t('carousel.item2.pricing.sufix'),
    //         },
    //         features: [
    //             { label: t('carousel.item2.features.item1') },
    //             { label: t('carousel.item2.features.item2') },
    //             { label: t('carousel.item2.features.item3') },
    //         ],
    //     },
    //     {
    //         image: '/home/carousel/home_carousel_1.webp',
    //         title: t('carousel.item3.title'),
    //         pricing: {
    //             label: t('carousel.item3.pricing.label'),
    //             price: formatPrice(
    //                 t('carousel.item3.pricing.price'),
    //                 t('carousel.item3.pricing.currency'),
    //                 locale
    //             ),
    //             sufix: t('carousel.item3.pricing.sufix'),
    //         },
    //         features: [
    //             { label: t('carousel.item3.features.item1') },
    //             { label: t('carousel.item3.features.item2') },
    //             { label: t('carousel.item3.features.item3') },
    //         ],
    //     },
    // ];

    const carouselItems: CarouselItemProps[] =
        roomTypes.map(roomType => {
            let href = t('carousel.item1.ctaButton.link');
            const roomtypesWithAvailableRooms = availableRooms.data.filter(
                room => room.RoomTypes.id === roomType.id
            );
            const roomtypesWithAvailableRoomsIds =
                roomtypesWithAvailableRooms.map(room => room.id);
            if (roomtypesWithAvailableRoomsIds.includes(roomType.id)) {
                const randomRoomId = selectRandomRoomByType(roomType.id);
                href = `/habitaciones/${randomRoomId}`;
            }

            return {
                image: roomType.mainImageUrl,
                title: roomType.name,
                href: href,
                pricing: {
                    label: t('carousel.item1.pricing.label'),
                    price: formatPrice(
                        roomType.price.toString(),
                        'PEN',
                        locale
                    ),
                    sufix: t('carousel.item1.pricing.sufix'),
                },
                features: [
                    {
                        label: t('commonFeatures.guest', {
                            count: roomType.guests,
                        }),
                    },
                    { label: roomType.bed },
                ],
            };
        }) || [];

    return (
        <div className="px-6 lg:px-12 relative h-fit">
            <Carousel
                setApi={setApi}
                opts={{
                    loop: true,
                }}
                plugins={[
                    Autoplay({
                        delay: 3000,
                        stopOnInteraction: true,
                        stopOnMouseEnter: true,
                    }),
                ]}
            >
                <CarouselContent className="gap-10">
                    {carouselItems.map((item, index) => (
                        <CarouselItem key={index} className="md:basis-1/2">
                            <CustomCard
                                onClick={() => {
                                    router.push(
                                        t('carousel.item1.ctaButton.link')
                                    );
                                }}
                                cardTitle={{
                                    text: item.title,
                                    className: 'text-lg font-bold capitalize',
                                }}
                                cardImage={{
                                    src: item.image,
                                    alt: item.title,
                                }}
                                pricing={{
                                    caption: item.pricing.label,
                                    price: item.pricing.price,
                                    sufix: item.pricing.sufix,
                                }}
                                features={item.features.map(feature => ({
                                    caption: feature.label,
                                }))}
                                hasSeparator={false}
                                className="cursor-pointer"
                                headerClassname="px-5 lg:px-8 pb-3"
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
