import { useLocale, useTranslations } from 'next-intl';
import { FaPhoneVolume, FaShower } from 'react-icons/fa';
// import { GiBathtub, GiSofa } from 'react-icons/gi';
// import { IoBedSharp, IoTvSharp } from 'react-icons/io5';
import { IoIosWifi } from 'react-icons/io';
import {
    //MdCountertops,
    MdResetTv,
} from 'react-icons/md';
import { PiDeskFill } from 'react-icons/pi';

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

export const RoomsSection = () => {
    const locale = useLocale();
    const t = useTranslations('IndexPageRooms.roomsSection');
    const princingClassnames =
        '!text-h7 lg:!text-h6 xl:!text-h6 2xl:!text-h6 text-primary';
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
    const cards: CustomCardProps[] = [
        {
            cardImage: {
                alt: t('room1.title'),
                src: '/rooms/rooms_section/master_suite.webp',
            },
            cardTitle: {
                text: t('room1.title'),
            },
            description: {
                text: t('room1.description'),
            },
            features: [
                {
                    caption: t('room1.features.item1'),
                },
                {
                    caption: t('room1.features.item2'),
                },
                [...commonFeatures],
            ],
            pricing: {
                price: formatPrice(
                    t('room1.pricing.price'),
                    t('room1.pricing.currency'),
                    locale
                ),
                caption: t('room1.pricing.label'),
                sufix: t('room1.pricing.sufix'),
                actionButton: {
                    label: t('room1.ctaButton.label'),
                    href: t('room1.ctaButton.link'),
                },
                className: princingClassnames,
            },
        },
        {
            cardImage: {
                alt: t('room2.title'),
                src: '/rooms/rooms_section/master_room.webp',
            },
            cardTitle: {
                text: t('room2.title'),
            },
            description: {
                text: t('room2.description'),
            },
            features: [
                {
                    caption: t('room2.features.item1'),
                },
                {
                    caption: t('room2.features.item2'),
                },
                [...commonFeatures],
            ],
            pricing: {
                price: formatPrice(
                    t('room2.pricing.price'),
                    t('room2.pricing.currency'),
                    locale
                ),
                caption: t('room2.pricing.label'),
                sufix: t('room2.pricing.sufix'),
                actionButton: {
                    label: t('room2.ctaButton.label'),
                    href: t('room2.ctaButton.link'),
                },
                className: princingClassnames,
            },
        },
        {
            cardImage: {
                alt: t('room3.title'),
                src: '/rooms/rooms_section/family_room.webp',
            },
            cardTitle: {
                text: t('room3.title'),
            },
            description: {
                text: t('room3.description'),
            },
            features: [
                {
                    caption: t('room3.features.item1'),
                },
                {
                    caption: t('room3.features.item2'),
                },
                [...commonFeatures],
            ],
            pricing: {
                price: formatPrice(
                    t('room3.pricing.price'),
                    t('room3.pricing.currency'),
                    locale
                ),
                caption: t('room3.pricing.label'),
                sufix: t('room3.pricing.sufix'),
                actionButton: {
                    label: t('room3.ctaButton.label'),
                    href: t('room3.ctaButton.link'),
                },
                className: princingClassnames,
            },
        },
        {
            cardImage: {
                alt: t('room4.title'),
                src: '/rooms/rooms_section/double_room.webp',
            },
            cardTitle: {
                text: t('room4.title'),
            },
            description: {
                text: t('room4.description'),
            },
            features: [
                {
                    caption: t('room4.features.item1'),
                },
                {
                    caption: t('room4.features.item2'),
                },
                [...commonFeatures],
            ],
            pricing: {
                price: formatPrice(
                    t('room4.pricing.price'),
                    t('room4.pricing.currency'),
                    locale
                ),
                caption: t('room4.pricing.label'),
                sufix: t('room4.pricing.sufix'),
                actionButton: {
                    label: t('room4.ctaButton.label'),
                    href: t('room4.ctaButton.link'),
                },
                className: princingClassnames,
            },
        },
        {
            cardImage: {
                alt: t('room5.title'),
                src: '/rooms/rooms_section/simple_room.webp',
            },
            cardTitle: {
                text: t('room5.title'),
            },
            description: {
                text: t('room5.description'),
            },
            features: [
                {
                    caption: t('room5.features.item1'),
                },
                {
                    caption: t('room5.features.item2'),
                },
                [...commonFeatures],
            ],
            pricing: {
                price: formatPrice(
                    t('room5.pricing.price'),
                    t('room5.pricing.currency'),
                    locale
                ),
                caption: t('room5.pricing.label'),
                sufix: t('room5.pricing.sufix'),
                actionButton: {
                    label: t('room5.ctaButton.label'),
                    href: t('room5.ctaButton.link'),
                },
                className: princingClassnames,
            },
        },
    ];
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
                {cards.map((card, index) => (
                    <CustomCard
                        key={index}
                        cardImage={card.cardImage}
                        cardTitle={{
                            text: card.cardTitle.text,
                            className: cn('', card.cardTitle.className),
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
};
