import React from 'react';
import { revalidatePath } from 'next/cache';
import { getLocale, getTranslations } from 'next-intl/server';

import { DetailedRoomWithImages } from '@/actions/rooms/room';
import { getRoom } from '@/actions/rooms/room.actions';
import { FetchingError } from '@/components/common/Errors/FetchingErrors';
import { LoadingCardSkeleton } from '@/components/common/loading/LoadingCardSkeleton';
import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
import { PageLayout } from '@/components/layout/PageLayout';
import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import {
    basePageHorizontalPadding,
    SectionWrapper,
} from '@/components/layout/section/base-section';
import { TextEffect } from '@/components/ui/text-effect';
import { defaultLocale } from '@/i18n/routing';
import { formatPrice } from '@/lib/i18n-formatPrice';
import { cn } from '@/lib/utils';
import { BookingSection } from './components/bookingSection/bookingSection';
import { RoomCarousel } from './components/MainRoomCarousel';
import { MoreDetailsSection } from './components/MoreDetailsSection';
import { RoomDescriptionSection } from './components/RoomDescriptionSection';
import { MoreRoomSection } from './components/roomsCarousel/MoreRoomSection';

export default async function page({
    params,
}: {
    params: Promise<{
        roomId: string;
    }>;
}) {
    const { roomId } = await params;
    const t = await getTranslations('IndexPageRoom');
    const locale = await getLocale();
    let room: DetailedRoomWithImages | undefined = undefined; // Re-enable room declaration
    try {
        const response = await getRoom(roomId, locale);
        if ('error' in response) {
            throw new Error(response.error);
        }
        room = response; // ajusta según tu API
    } catch (error) {
        // Renderiza el error aquí si no usas ErrorBoundary
        return (
            <PageLayout>
                {/* <SectionWrapper>
                    <SectionHeader
                        headerTitle={{ text: t('title').toUpperCase() }}
                        description={{ text: t('description') }}
                    />
                </SectionWrapper> */}
                <FetchingError
                    title="Error"
                    message={
                        t('fetching.error.message') +
                        ' ' +
                        (error instanceof Error ? error.message : '')
                    }
                    refetchButtonLabel={t('fetching.error.actionButton.label')}
                    onRefetch={() => {
                        revalidatePath(`/habitaciones/${roomId}`);
                    }}
                />
            </PageLayout>
        );
    }

    if (!room) {
        return (
            <PageLayout>
                <SectionWrapper className={cn(sectionLayoutClassnames)}>
                    {/* <SectionHeader
                        headerTitle={{
                            text: t('title').toUpperCase(),
                        }}
                        description={{
                            text: t('description'),
                        }}
                    ></SectionHeader> */}
                    <LoadingCardSkeleton />
                </SectionWrapper>
            </PageLayout>
        );
    }

    const dynamicLabel = t('title', { roomNumber: room.number.toString() });

    const roomfeatures = [
        {
            label: t('features.item1.label'),
            value: t('features.item1.value', {
                count: room.RoomTypes.guests,
            }),
        },
        {
            label: t('features.item2.label'),
            value:
                locale === defaultLocale
                    ? room.RoomTypes.bed
                    : room.RoomTypes.bedEn,
        },
        {
            label: t('features.item3.label'),
            value:
                formatPrice(room.RoomTypes.price.toString(), 'PEN', locale) +
                ' ' +
                t('features.item3.sufix'),
        },
    ];
    return (
        <PageLayout classname="pb-0">
            <BaseHeroWrapper
                className="min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] xl:min-h-[700px] flex items-center justify-center mb-4 pb-16 sm:pb-20 md:pb-18 lg:pb-30 xl:pb-40"
                image={{
                    src:
                        room.RoomTypes.ImageRoomType.find(image => image.isMain)
                            ?.imageUrl || '/rooms/rooms_placeholder.webp',
                    alt: 'Experiencias Hero Image',
                    quality: 100,
                    placeholder: 'blur',
                    blurDataURL: '/booking/BookingPlaceholderRingbell.webp',
                    unoptimized: true,
                    className: 'object-bottom',
                }}
                gradientEffectClassname="from-black/30 to-black/80"
            >
                <div className="w-full animate-fade">
                    <BreadcrumbNav
                        className="mx-auto w-fit"
                        isDynamicRoute={true}
                        dynamicLabel={dynamicLabel}
                    ></BreadcrumbNav>
                </div>
                <TextEffect
                    preset="fade-in-blur"
                    speedSegment={0.3}
                    as="h1"
                    className="text-balance text-h5 sm:text-h3 md:text-h3 lg:text-[8rem] xl:text-[9rem] 2xl:text-h2 text-background font-h1 truncate uppercase mt-8"
                >
                    {locale === defaultLocale
                        ? room.RoomTypes.name
                        : room.RoomTypes.nameEn}
                </TextEffect>
                <div
                    className={cn(
                        'flex justify-between gap-2 md:gap-4 items-start mt-18',
                        basePageHorizontalPadding
                    )}
                >
                    {roomfeatures.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-y-2 sm:gap-y-4 text-start items-start justify-center max-w-[200px] sm:max-w-[300px] sm:min-w-[180px] md:max-w-[400px] xl:max-w-[473px] md:min-w-[200px] lg:min-w-[300px] xl:min-w-[360px] 2xl:min-w-[473px]"
                        >
                            <span
                                className={cn(
                                    'text-sm md:text-base lg:text-p font-light tracking-normal',
                                    'text-background'
                                )}
                            >
                                {feature.label}
                            </span>
                            <span className="text-h8 sm:text-h7 md:text-h6 lg:text-h5 xl:text-h4 2xl:text-h3 font-serif text-primary-foreground leading-6 sm:leading-9 md:leading-11 lg:leading-13 xl:leading-16 w-fit text-wrap line-clamp-3">
                                {feature.value}
                            </span>
                        </div>
                    ))}
                </div>
            </BaseHeroWrapper>
            <div className="h-fit">
                <RoomCarousel
                    images={room.RoomTypes.ImageRoomType.filter(
                        image => !image.isMain
                    )} // Exclude the main image
                ></RoomCarousel>
            </div>
            <RoomDescriptionSection
                detailedRoom={room}
            ></RoomDescriptionSection>
            <MoreDetailsSection></MoreDetailsSection>
            <MoreRoomSection></MoreRoomSection>
            <BookingSection></BookingSection>
        </PageLayout>
    );
}
