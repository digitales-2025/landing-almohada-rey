import React from 'react';
import { LucideIcon } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { LineClampParagraph } from '../paragraph/LineClampParagraph';

type ActionButton = {
    label: string;
    href: string;
    className?: string;
};

type CardImage = {
    src: string;
    alt: string;
    className?: string;
};

type Title = {
    text: string;
    className?: string;
};

type Caption = {
    text: string;
    className?: string;
};

type Description = {
    text: string;
    className?: string;
    collapsible?: {
        lineClamp: 1 | 2 | 3 | 4 | 5 | 6;
    };
};

type Pricing = {
    caption: string;
    price: string;
    currency?: string;
    sufix: string;
    actionButton?: ActionButton;
    className?: string;
};

export type Feature = {
    Icon?: LucideIcon | React.ElementType;
    caption: string;
};

export type IconFeature = {
    Icon: LucideIcon | React.ElementType;
    tooltip: string;
};

type IconFeatures = IconFeature[];

type Features = (Feature | IconFeatures)[];

export type CustomCardProps = {
    cardTitle: Title;
    cardImage?: CardImage;
    caption?: Caption;
    description?: Description;
    pricing?: Pricing;
    features?: Features;
    className?: string;
    headerClassname?: string;
    contentClassname?: string;
    href?: string;
    actionButton?: ActionButton;
    hasSeparator?: boolean;
};

type CardProps = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
> &
    CustomCardProps;
export const CardImage = ({ src, alt, className }: CardImage) => {
    return (
        <figure className="w-full max-w-full mb-2">
            <img
                src={src}
                alt={alt}
                className={cn(
                    'rounded-t-none object-cover max-w-full w-full aspect-3/2',
                    className
                )}
            />
        </figure>
    );
};

const CardFeature = ({ caption, Icon }: Feature) => {
    return (
        <div className="flex items-center space-x-2 text-secondary/50">
            {Icon && <Icon className="size-4" />}
            <span className="text-sm lg:text-base font-normal text-secondary/50 dark:text-secondary-foreground leading-4 lg:leading-5">
                {caption}
            </span>
        </div>
    );
};

const IconCardFeature = ({ Icon, tooltip }: IconFeature) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="flex items-center space-x-2">
                    <Icon className="size-5 text-primary" />
                </TooltipTrigger>
                <TooltipContent className="flex items-center space-x-2 font-normal bg-primary-foreground text-secondary/50 dark:text-secondary-foreground">
                    <Icon className="size-4" />
                    <span className="text-sm lg:text-base">{tooltip}</span>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export const CustomCard = ({
    cardTitle,
    cardImage,
    caption,
    description,
    pricing,
    features,
    actionButton,
    hasSeparator = true,
    className,
    headerClassname,
    contentClassname,
    href,
    ...props
}: CardProps) => {
    const featureList = features?.map((feature, index) => {
        if (Array.isArray(feature)) {
            return (
                <div key={index} className="flex items-center space-x-2 w-fit">
                    {feature.map((iconFeature, iconIndex) => (
                        <IconCardFeature key={iconIndex} {...iconFeature} />
                    ))}
                </div>
            );
        }
        return <CardFeature key={index} {...feature} />;
    });

    return (
        <Card
            {...props}
            className={cn(
                'border-none !shadow-none rounded-none p-0 gap-2',
                className
            )}
        >
            <CardHeader className={'p-0 m-0'}>
                {cardImage && (
                    <CardImage
                        src={cardImage.src}
                        alt={cardImage.alt}
                        className={cn(cardImage.className)}
                    />
                )}
                <div className={headerClassname}>
                    {caption && (
                        <span
                            className={cn(
                                'text-primary dark:text-primary-foreground font-h9 text-h9 lg:text-h8 font-light tracking-[0.25em]',
                                caption?.className
                            )}
                        >
                            {caption?.text}
                        </span>
                    )}
                    <CardTitle
                        className={cn(
                            'w-full text-secondary dark:text-secondary-foreground font-serif text-h7 lg:text-h4 !font-normal !text-ellipsis',
                            cardTitle.className
                        )}
                    >
                        {href ? (
                            <Link
                                href={href}
                                className={cn(
                                    buttonVariants({ variant: 'link' }),
                                    'w-full max-w-full text-start justify-start text-inherit text-h7 lg:text-h4 !font-normal p-0 m-0 h-fit',
                                    cardTitle.className
                                )}
                            >
                                {cardTitle.text}
                            </Link>
                        ) : (
                            cardTitle.text
                        )}
                    </CardTitle>
                    {description && !description.collapsible && (
                        <CardDescription
                            className={cn(
                                'font-light text-secondary dark:text-secondary-foreground text-pretty w-full text-base lg:text-p lg:tracking-normal mt-2',
                                description?.className
                            )}
                        >
                            {description?.text}
                        </CardDescription>
                    )}
                    {description && description.collapsible && (
                        <LineClampParagraph
                            lineClamp={description.collapsible.lineClamp}
                            inlineButton={true}
                            text={description?.text}
                            className={cn(
                                'font-light text-secondary dark:text-secondary-foreground text-pretty w-full text-base lg:text-p lg:tracking-normal mt-2',
                                description?.className
                            )}
                        ></LineClampParagraph>
                    )}
                </div>
            </CardHeader>
            <div className={contentClassname ?? ''}>
                {features && hasSeparator && (
                    <Separator className="bg-secondary data-[orientation=horizontal]:!h-[1px]"></Separator>
                )}
                {features && (
                    <CardContent
                        className={cn(
                            'flex flex-wrap gap-2 p-0',
                            hasSeparator ? 'py-4' : 'pt-0'
                        )}
                    >
                        {featureList?.map((feature, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <Separator
                                        orientation="vertical"
                                        className="bg-secondary/50 data-[orientation=vertical]:!w-[1px] data-[orientation=vertical]:!h-auto"
                                    />
                                )}
                                {feature}
                            </React.Fragment>
                        ))}
                    </CardContent>
                )}
                {(pricing || actionButton) && hasSeparator && (
                    <Separator className="bg-secondary data-[orientation=horizontal]:!h-[1px]"></Separator>
                )}
                <CardFooter className="p-0 m-0 mt-2 lg:mt-3 w-full">
                    {pricing && (
                        <div className="flex items-center justify-between flex-wrap space-y-2 w-full">
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm lg:text-h8 text-secondary dark:text-secondary-foreground">
                                        {pricing.caption}
                                    </span>
                                </div>
                                <div className="flex space-x-1 font-serif">
                                    <span
                                        className={cn(
                                            'text-h7 lg:text-h5 xl:text-h4 text-primary dark:text-primary-foreground',
                                            pricing.className
                                        )}
                                    >
                                        {pricing.price}
                                    </span>
                                    <span
                                        className={cn(
                                            'text-h7 lg:text-h5 xl:text-h4 text-primary dark:text-primary-foreground',
                                            pricing.className
                                        )}
                                    >
                                        {pricing.sufix}
                                    </span>
                                </div>
                            </div>
                            {pricing.actionButton && (
                                <Link
                                    href={pricing.actionButton.href}
                                    className={cn(
                                        buttonVariants({
                                            variant: 'outline',
                                            size: 'lg',
                                        }),
                                        'w-full sm:w-fit rounded-none border-primary dark:border-primary-foreground text-primary'
                                    )}
                                >
                                    {pricing.actionButton.label}
                                </Link>
                            )}
                        </div>
                    )}
                    {actionButton && (
                        <Link
                            href={actionButton.href}
                            className={cn(
                                buttonVariants({ variant: 'link' }),
                                'w-full sm:w-fit dark:border-primary-foreground text-primary p-0 m-0'
                            )}
                        >
                            {actionButton.label}
                        </Link>
                    )}
                </CardFooter>
            </div>
        </Card>
    );
};
