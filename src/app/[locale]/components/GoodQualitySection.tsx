import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import {
    basePageHorizontalPadding,
    onlyLeftPageHorizontalPadding,
    onlyRightPageHorizontalPadding,
    resetPageHorizontalPadding,
    SectionWrapper,
} from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

type GalleryItem = {
    className?: string;
    image: {
        src: string;
        alt: string;
        fill?: boolean;
        isLeft?: boolean;
        className?: string;
    };
    title: {
        text: string;
        className?: string;
    };
    order: number;
};

export const GalleryCard = ({
    image,
    title,
    order,
    className,
}: {
    image: GalleryItem['image'];
    title: GalleryItem['title'];
    order: GalleryItem['order'];
    className?: string;
}) => {
    const fillClassName = image.fill
        ? 'w-full'
        : 'max-w-[576px] w-[376px] md-[476px] lg:w-full';
    return (
        <div
            className={cn(
                'lg:h-[672px] flex space-x-2',
                fillClassName,
                className
            )}
        >
            {!image.isLeft && (
                <div className="w-fit">
                    <span className="inline-block text-base ld:text-p text-primary">{`0${order}. `}</span>
                </div>
            )}
            <div className="h-full overflow-clip max-h-full w-full flex flex-col space-y-2 lg:space-y-4">
                {!image.isLeft && (
                    <h3
                        className={cn(
                            'text-pretty text-h6 md:text-h5 lg:text-h4 text-secondary dark:text-secondary-foreground font-serif',
                            title.className
                        )}
                    >
                        {title.text}
                    </h3>
                )}
                {image.isLeft && (
                    <div className="flex space-x-2 justify-end w-full">
                        <span className="inline-block text-base ld:text-p text-primary">{`0${order}. `}</span>
                        <h3
                            className={cn(
                                'text-pretty text-h6 md:text-h5 lg:text-h4 text-secondary dark:text-secondary-foreground font-serif',
                                title.className
                            )}
                        >
                            {title.text}
                        </h3>
                    </div>
                )}
                <img
                    src={image.src}
                    className={cn(
                        'h-full max-h-full w-full object-cover',
                        image.className
                    )}
                    alt={image.alt}
                />
            </div>
        </div>
    );
};

export const LeftFilledGalleryCard = () => {
    return <div>GoodQualitySection</div>;
};

export const GoodQualitySection = () => {
    const t = useTranslations('IndexPage.goodQualitySection');
    const rowClassName = 'w-full flex gap-4 lg:gap-6';
    const gallery: Record<string, GalleryItem[]> = {
        row1: [
            {
                image: {
                    src: '/home/gallery/home_gallery_1.webp',
                    alt: 'TerracePhoto',
                },
                title: {
                    text: t('gallery.item1.title'),
                },
                order: 1,
            },
            {
                image: {
                    src: '/home/gallery/home_gallery_2.webp',
                    alt: 'RoomPhoto',
                    fill: true,
                },
                title: {
                    text: t('gallery.item2.title'),
                },
                order: 2,
                className: 'flex-grow',
            },
        ],
        row2: [
            {
                image: {
                    src: '/home/gallery/home_gallery_3.webp',
                    alt: 'RoomPhoto',
                    fill: true,
                    isLeft: true,
                },
                title: {
                    text: t('gallery.item3.title'),
                },
                order: 3,
                className: 'flex-grow',
            },
            {
                image: {
                    src: '/home/gallery/home_gallery_4.webp',
                    alt: 'RoomPhoto',
                },
                title: {
                    text: t('gallery.item4.title'),
                },
                order: 4,
            },
        ],
        row3: [
            {
                image: {
                    src: '/home/gallery/home_gallery_5.webp',
                    alt: 'RoomPhoto',
                },
                title: {
                    text: t('gallery.item5.title'),
                },
                order: 5,
            },
            {
                image: {
                    src: '/home/gallery/home_gallery_6.webp',
                    alt: 'RoomPhoto',
                    fill: true,
                },
                title: {
                    text: t('gallery.item6.title'),
                },
                order: 6,
                className: 'flex-grow',
            },
        ],
    };
    return (
        <SectionWrapper
            className={cn(
                sectionLayoutClassnames,
                'bg-primary/15',
                resetPageHorizontalPadding
            )}
        >
            <SectionHeader
                className={basePageHorizontalPadding}
                blockClassName="mx-0"
                alignment="left"
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('caption'),
                }}
            ></SectionHeader>
            <div className={cn(onlyLeftPageHorizontalPadding, rowClassName)}>
                {gallery.row1.map(item => (
                    <GalleryCard
                        key={item.title.text}
                        image={item.image}
                        title={item.title}
                        order={item.order}
                        className={cn(item.className)}
                    />
                ))}
            </div>
            <div className={cn(onlyRightPageHorizontalPadding, rowClassName)}>
                {gallery.row2.map(item => (
                    <GalleryCard
                        key={item.title.text}
                        image={item.image}
                        title={item.title}
                        order={item.order}
                        className={cn(item.className)}
                    />
                ))}
            </div>
            <div className={cn(onlyLeftPageHorizontalPadding, rowClassName)}>
                {gallery.row3.map(item => (
                    <GalleryCard
                        key={item.title.text}
                        image={item.image}
                        title={item.title}
                        order={item.order}
                        className={cn(item.className)}
                    />
                ))}
            </div>
            <div
                className={cn(
                    basePageHorizontalPadding,
                    'flex flex-col items-center justify-center space-y-2 lg:space-y-4 max-w-[900px] mx-auto pt-3'
                )}
            >
                <p className="text-balance text-sm md:text-base lg:text-p tracking-normal text-center w-full text-secondary/60 dark:text-secondary-foreground">
                    {t('description')}
                </p>
                <Link
                    href={t('ctaButton.link')}
                    className={cn(
                        buttonVariants({
                            variant: 'default',
                            size: 'lg',
                        }),
                        'text-primary-foreground bg-secondary border-none rounded-none w-fit text-center text-base lg:text-p1 lg:tracking-normal h-fit'
                    )}
                >
                    <span className="leading-12 lg:leading-14">
                        {t('ctaButton.label').toUpperCase()}
                    </span>
                </Link>
            </div>
        </SectionWrapper>
    );
};
