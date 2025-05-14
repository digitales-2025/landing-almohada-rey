import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ArrowRightIcon } from '@radix-ui/react-icons';
import { LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { Separator } from './separator';

interface BentoGridProps extends ComponentPropsWithoutRef<'div'> {
    children: ReactNode;
    className?: string;
}

type CardTitleProps = {
    text: string;
    className?: string;
};

type CardDetailProps = {
    Icon: LucideIcon;
    caption: string;
};

type pricingProps = {
    caption: string;
    price: string;
    currency: string;
    sufix: string;
};

export interface BentoCardProps extends ComponentPropsWithoutRef<'div'> {
    cardTitle: CardTitleProps;
    name: string;
    className: string;
    background: ReactNode;
    figureClassName?: string;
    description: string;
    href: string;
    cta: string;
    Icon?: React.ElementType;
    details?: CardDetailProps[];
    pricing?: pricingProps;
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
    return (
        <div
            className={cn(
                'grid w-full auto-rows-[22rem] grid-cols-3 gap-4',
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
};

const BentoCard = ({
    cardTitle,
    name,
    className,
    background,
    Icon,
    description,
    href,
    cta,
    details,
    pricing,
    figureClassName,
    ...props
}: BentoCardProps) => (
    <div
        key={name}
        className={cn(
            'group relative col-span-3 flex flex-col justify-end lg:justify-between overflow-hidden rounded-xl',
            // light styles
            'bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
            // dark styles
            'transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]',
            className,
            'border-none !shadow-none rounded-none'
        )}
        {...props}
    >
        <figure
            className={cn(
                'relative max-h-[40rem] min-h-[18rem] h-full',
                figureClassName
            )}
        >
            {background}
        </figure>
        <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 pb-0 px-0 lg:pb-6 lg:transition-all lg:duration-200 lg:group-hover:-translate-y-15 lg:bg-primary-foreground relative space-y-2">
            {/* <div
                className="absolute inset-0 lg:group-hover:bg-primary/[.05] lg:transform-gpu lg:transition-all lg:duration-300 lg:ease-in-out"
            ></div> */}
            {Icon && (
                <Icon className="h-12 w-12 lg:origin-left lg:transform-gpu text-secondary dark:text-secondary-foreground lg:transition-all lg:duration-300 lg:ease-in-out lg:group-hover:scale-75" />
            )}
            <h3
                className={cn(
                    '!text-secondary dark:text-secondary-foreground font-serif text-h7 md:text-h6 md:leading-8 2xl:leading-12 2xl:text-h4',
                    cardTitle.className ?? ''
                )}
            >
                {cardTitle.text}
            </h3>
            {details && (
                <div className="flex justify-start space-x-6 flex-wrap w-full gap-x-2">
                    {details?.map((detail, index) => (
                        <div
                            key={index}
                            className="flex items-center space-x-2 mb-2"
                        >
                            <detail.Icon className="size-5 text-primary dark:text-primary-foreground" />
                            <span className=" text-h9 lg:text-h8 text-secondary dark:text-secondary-foreground">
                                {detail.caption}
                            </span>
                        </div>
                    ))}
                </div>
            )}
            <p className="font-light text-secondary dark:text-secondary-foreground text-pretty w-full">
                {description}
            </p>
        </div>
        <div
            className={cn(
                'pointer-events-none lg:absolute lg:bottom-0 flex w-full lg:translate-y-10 lg:transform-gpu flex-row items-center p-4 px-0 lg:opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 z-10 group-hover:bg-primary-foreground'
            )}
        >
            {!pricing && (
                <div className="w-full space-y-2">
                    <Separator className="bg-secondary data-[orientation=horizontal]:!h-[1px]"></Separator>
                    <Button
                        variant="ghost"
                        asChild
                        size="sm"
                        className="pointer-events-auto text-primary dark:text-primary-foreground hover:bg-white/50 hover:text-primary hover:dark:bg-primary/10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-primary focus-visible:ring-offset-primary-foreground"
                    >
                        <Link href={href}>
                            {cta}
                            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
                        </Link>
                    </Button>
                </div>
            )}
            {pricing && (
                <div className="w-full space-y-2">
                    <Separator className="bg-secondary data-[orientation=horizontal]:!h-[1px]"></Separator>
                    <div className="flex items-center justify-between flex-wrap space-y-2">
                        <div className="flex space-x-4">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm lg:text-h8 text-secondary dark:text-secondary-foreground">
                                    {pricing.caption}
                                </span>
                            </div>
                            <div className="flex space-x-1">
                                {/* <span className="text-h5 text-primary font-serif dark:text-primary-foreground">
                                  {pricing.currency}
                              </span> */}
                                <span className="text-h7 lg:text-h5 text-primary font-serif dark:text-primary-foreground">
                                    {pricing.price}
                                </span>
                                <span className="text-h7  lg:text-h5 text-primary font-serif dark:text-primary-foreground">
                                    {pricing.sufix}
                                </span>
                            </div>
                        </div>
                        <Button
                            variant="default"
                            asChild
                            size="lg"
                            className="pointer-events-auto bg-secondary/80 hover:bg-secondary rounded-none dark:text-secondary hover:text-secondary-foreground hover:dark:bg-secondary-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-primary focus-visible:ring-offset-primary-foreground"
                        >
                            <Link href={href}>
                                {cta}
                                <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
                            </Link>
                        </Button>
                    </div>
                </div>
            )}
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-primary/[.05] group-hover:dark:bg-primary/10" />
        {/* <div className="hidden lg:block">
      
    </div>

    <div className="lg:hidden">
      <div
        className={cn(
          "pointer-events-none flex w-full",
        )}
      >
        <div className="w-full space-y-2">
          <Separator className="bg-secondary data-[orientation=horizontal]:!h-[1px]"></Separator>
          <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
            <Link href={href}>
              {cta}
              <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="pointer-events-none" />
    </div> */}
    </div>
);

export { BentoCard, BentoGrid };
