import { useLocale, useTranslations } from 'next-intl';
import { FaPhoneVolume, FaShower } from 'react-icons/fa';
import { GiBathtub, GiSofa } from 'react-icons/gi';
import { IoIosWifi } from 'react-icons/io';
import { IoBedSharp, IoTvSharp } from 'react-icons/io5';
import { MdCountertops, MdResetTv } from 'react-icons/md';
import { PiDeskFill } from 'react-icons/pi';

import {
    CustomCard,
    CustomCardProps,
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
                [
                    {
                        Icon: GiBathtub,
                        tooltip: t('room1.features.item3'),
                    },
                    {
                        Icon: GiSofa,
                        tooltip: t('room1.features.item4'),
                    },
                    {
                        Icon: IoIosWifi,
                        tooltip: t('room1.features.item5'),
                    },
                    {
                        Icon: IoTvSharp,
                        tooltip: t('room1.features.item6'),
                    },
                    {
                        Icon: FaPhoneVolume,
                        tooltip: t('room1.features.item7'),
                    },
                    {
                        Icon: PiDeskFill,
                        tooltip: t('room1.features.item8'),
                    },
                    {
                        Icon: MdCountertops,
                        tooltip: t('room1.features.item9'),
                    },
                ],
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
                [
                    {
                        Icon: FaShower,
                        tooltip: t('room2.features.item3'),
                    },
                    {
                        Icon: IoIosWifi,
                        tooltip: t('room2.features.item4'),
                    },
                    {
                        Icon: MdResetTv,
                        tooltip: t('room2.features.item5'),
                    },
                    {
                        Icon: IoTvSharp,
                        tooltip: t('room2.features.item6'),
                    },
                    {
                        Icon: FaPhoneVolume,
                        tooltip: t('room2.features.item7'),
                    },
                    {
                        Icon: PiDeskFill,
                        tooltip: t('room2.features.item8'),
                    },
                ],
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
                [
                    {
                        Icon: IoBedSharp,
                        tooltip: t('room3.features.item3'),
                    },
                    {
                        Icon: FaShower,
                        tooltip: t('room3.features.item4'),
                    },
                    {
                        Icon: IoIosWifi,
                        tooltip: t('room3.features.item5'),
                    },
                    {
                        Icon: MdResetTv,
                        tooltip: t('room3.features.item6'),
                    },
                    {
                        Icon: IoTvSharp,
                        tooltip: t('room3.features.item7'),
                    },
                    {
                        Icon: FaPhoneVolume,
                        tooltip: t('room3.features.item8'),
                    },
                    {
                        Icon: PiDeskFill,
                        tooltip: t('room3.features.item9'),
                    },
                ],
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
                [
                    {
                        Icon: IoBedSharp,
                        tooltip: t('room4.features.item3'),
                    },
                    {
                        Icon: FaShower,
                        tooltip: t('room4.features.item4'),
                    },
                    {
                        Icon: IoIosWifi,
                        tooltip: t('room4.features.item5'),
                    },
                    {
                        Icon: MdResetTv,
                        tooltip: t('room4.features.item6'),
                    },
                    {
                        Icon: IoTvSharp,
                        tooltip: t('room4.features.item7'),
                    },
                    {
                        Icon: FaPhoneVolume,
                        tooltip: t('room4.features.item8'),
                    },
                    {
                        Icon: PiDeskFill,
                        tooltip: t('room4.features.item9'),
                    },
                ],
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
                [
                    {
                        Icon: FaShower,
                        tooltip: t('room5.features.item3'),
                    },
                    {
                        Icon: IoIosWifi,
                        tooltip: t('room5.features.item4'),
                    },
                    {
                        Icon: MdResetTv,
                        tooltip: t('room5.features.item5'),
                    },
                    {
                        Icon: IoTvSharp,
                        tooltip: t('room5.features.item6'),
                    },
                    {
                        Icon: FaPhoneVolume,
                        tooltip: t('room5.features.item7'),
                    },
                    {
                        Icon: PiDeskFill,
                        tooltip: t('room5.features.item8'),
                    },
                ],
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
            <img
                className="w-full inset-0 absolute object-top h-full object-cover"
                src="/rooms/bookingSectionPlaceholder.webp"
                alt="bg-pattern"
            />
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('description'),
                }}
            ></SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 lg:gap-6">
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
