import { useTranslations } from 'next-intl';

import { CustomCard } from '@/components/customized/card/custom-card';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';

type CardProps = {
    image: string;
    cardTitle: {
        text: string;
        className?: string;
    };
    description: {
        text: string;
        className?: string;
    };
};

export const EnvironmentsSection = () => {
    const t = useTranslations('IndexPageRooms.environmentsSection');
    const cards: CardProps[] = [
        {
            image: '/rooms/envs_section/reception_env.webp',
            cardTitle: {
                text: t('gallery.item1.title'),
            },
            description: {
                text: t('gallery.item1.description'),
            },
        },
        {
            image: '/rooms/envs_section/parking_env.webp',
            cardTitle: {
                text: t('gallery.item2.title'),
                className:
                    'xl:text-h5 2xl:text-h4 overflow-hidden text-ellipsis whitespace-nowrap',
            },
            description: {
                text: t('gallery.item2.description'),
            },
        },
        {
            image: '/rooms/envs_section/conference_env.webp',
            cardTitle: {
                text: t('gallery.item3.title'),
            },
            description: {
                text: t('gallery.item3.description'),
            },
        },
        {
            image: '/rooms/envs_section/cofeeshop_env.webp',
            cardTitle: {
                text: t('gallery.item4.title'),
            },
            description: {
                text: t('gallery.item4.description'),
            },
        },
        {
            image: '/rooms/envs_section/living_env.webp',
            cardTitle: {
                text: t('gallery.item5.title'),
            },
            description: {
                text: t('gallery.item5.description'),
            },
        },
        {
            image: '/rooms/envs_section/restroom_env.webp',
            cardTitle: {
                text: t('gallery.item6.title'),
            },
            description: {
                text: t('gallery.item6.description'),
            },
        },
    ];
    return (
        <SectionWrapper>
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('description'),
                }}
            ></SectionHeader>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {cards.map((card, index) => (
                    <CustomCard
                        key={index}
                        cardImage={{
                            src: card.image,
                            alt: card.cardTitle.text,
                        }}
                        cardTitle={{
                            text: card.cardTitle.text,
                            className: card.cardTitle.className,
                        }}
                        description={{
                            text: card.description.text,
                            className: card.description.className,
                        }}
                    ></CustomCard>
                ))}
            </div>
        </SectionWrapper>
    );
};
