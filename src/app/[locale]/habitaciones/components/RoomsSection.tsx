import { useTranslations } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { FaPhoneVolume, FaShower } from 'react-icons/fa';
import { IoIosWifi } from 'react-icons/io';
import { IoBed } from 'react-icons/io5';
import { MdResetTv } from 'react-icons/md';
import { PiDeskFill } from 'react-icons/pi';

import { RoomTypeWithMainImg } from '@/actions/rooms/room';
import { getAllRoomTypes } from '@/actions/rooms/room.actions';
import { FetchingError } from '@/components/common/Errors/FetchingErrors';
import { LoadingCardSkeleton } from '@/components/common/loading/LoadingCardSkeleton';
import {
    CustomCard,
    CustomCardProps,
    IconFeature,
} from '@/components/customized/card/custom-card';
import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { formatPrice } from '@/lib/i18n-formatPrice';
import { cn } from '@/lib/utils';

export async function RoomsSection() {
    const locale = await getLocale();
    const t = await getTranslations('IndexPageRooms.roomsSection');
    const pricingClassnames =
        '!text-h7 lg:!text-h6 xl:!text-h6 2xl:!text-h6 text-primary';

    // const { useRoomTypeQuery } = useRooms();
    // const {
    //     data: roomTypes,
    //     isLoading,
    //     isError,
    //     error,
    //     refetch,
    // } = useRoomTypeQuery();
    const commonFeatures: IconFeature[] = [
        {
            Icon: IoIosWifi,
            tooltip: t('commonFeatures.item1'),
        },
        {
            Icon: MdResetTv,
            tooltip: t('commonFeatures.item2'),
        },
        {
            Icon: FaPhoneVolume,
            tooltip: t('commonFeatures.item3'),
        },
        {
            Icon: FaShower,
            tooltip: t('commonFeatures.item4'),
        },
        {
            Icon: PiDeskFill,
            tooltip: t('commonFeatures.item5'),
        },
    ];

    let roomTypes: RoomTypeWithMainImg[];

    try {
        const response = await getAllRoomTypes({
            locale,
        });
        if ('error' in response) {
            throw new Error(response.error);
        }
        roomTypes = response; // ajusta según tu API
    } catch (error) {
        // Renderiza el error aquí si no usas ErrorBoundary
        return (
            <SectionWrapper className={cn(sectionLayoutClassnames)}>
                <SectionHeader
                    headerTitle={{ text: t('title').toUpperCase() }}
                    description={{ text: t('description') }}
                />
                <FetchingError
                    title="Error"
                    message={
                        t('fetchingError.message') +
                        ' ' +
                        (error instanceof Error ? error.message : '')
                    }
                    // onRefetch={() => {
                    //     /* No hay refetch en server, solo recarga la página */ window.location.reload();
                    // }}
                    // refetchButtonLabel={t('fetchingError.actionButton.label')}
                />
            </SectionWrapper>
        );
    }

    if (!roomTypes) {
        return (
            <SectionWrapper className={cn(sectionLayoutClassnames)}>
                <SectionHeader
                    headerTitle={{
                        text: t('title').toUpperCase(),
                    }}
                    description={{
                        text: t('description'),
                    }}
                ></SectionHeader>
                <LoadingCardSkeleton />
            </SectionWrapper>
        );
    }

    // if (isLoading) {
    //     return (
    //         <SectionWrapper className={cn(sectionLayoutClassnames)}>
    //             <SectionHeader
    //                 headerTitle={{
    //                     text: t('title').toUpperCase(),
    //                 }}
    //                 description={{
    //                     text: t('description'),
    //                 }}
    //             ></SectionHeader>
    //             <LoadingCardSkeleton />
    //         </SectionWrapper>
    //     );
    // }
    // if (isError) {
    //     return (
    //         <SectionWrapper className={cn(sectionLayoutClassnames)}>
    //             <SectionHeader
    //                 headerTitle={{
    //                     text: t('title').toUpperCase(),
    //                 }}
    //                 description={{
    //                     text: t('description'),
    //                 }}
    //             ></SectionHeader>
    //             <FetchingError
    //                 title={'Error'}
    //                 message={t('fetchingError.message') + ' ' + error.message}
    //                 onRefetch={() => {
    //                     refetch();
    //                 }}
    //                 refetchButtonLabel={t('fetchingError.actionButton.label')}
    //             ></FetchingError>
    //         </SectionWrapper>
    //     );
    // }

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
                    caption: t('commonFeatures.guest', {
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
                caption: t('room1.pricing.label'),
                sufix: t('room1.pricing.sufix'),
                actionButton: {
                    label: t('room1.ctaButton.label'),
                    href: t('room1.ctaButton.link'),
                },
                className: pricingClassnames,
            },
        };
    });
    return (
        <SectionWrapper className={cn(sectionLayoutClassnames)}>
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('description'),
                }}
            ></SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-x-4 gap-y-8 lg:gap-x-6 lg:gap-y-10">
                {rooms.map((card, index) => (
                    <CustomCard
                        key={index}
                        cardImage={card.cardImage}
                        cardTitle={{
                            text: card.cardTitle.text,
                            className: cn(
                                'capitalize',
                                card.cardTitle.className
                            ),
                        }}
                        description={{
                            text: card.description!.text,
                            collapsible: {
                                lineClamp: 3,
                            },
                        }}
                        features={card.features}
                        pricing={card.pricing}
                        hasSeparator={true}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
}

export const LoadingRoomSection = () => {
    const t = useTranslations('IndexPageRooms.roomsSection');
    return (
        <SectionWrapper className={cn(sectionLayoutClassnames)}>
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('description'),
                }}
            ></SectionHeader>
            <LoadingCardSkeleton classNameSkeletonItems="bg-primary/10" />
        </SectionWrapper>
    );
};
