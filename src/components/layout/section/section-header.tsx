import React from 'react';

import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export type TitleProps = {
    text: string;
    classname?: string;
};

export type DescriptionProps = {
    text: string;
    className?: string;
};

type OptionProps = {
    label: string;
    href: string;
    className?: string;
};

interface SectionHeaderProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    children?: React.ReactNode;
    className?: string;
    blockClassName?: string;
    headerTitle: TitleProps;
    alignment?: 'left' | 'center' | 'right';
    description?: DescriptionProps;
    onlyTitle?: boolean;
    option?: OptionProps;
}

export const SectionHeader = ({
    children,
    className,
    headerTitle,
    description,
    option,
    onlyTitle = false,
    blockClassName,
    ...rest
}: SectionHeaderProps) => {
    const alignment = rest.alignment ?? 'center';
    const textAlign =
        alignment === 'left'
            ? 'text-left'
            : alignment === 'right'
              ? 'text-right'
              : 'text-center';

    const notCenterAlignment = alignment === 'left' || alignment == 'right';
    const isOption = option && notCenterAlignment;

    const decriptionDefaultClassName =
        'font-h3 !text-h6 sm:!text-h5 lg:!text-h3 !leading-9 sm:!leading-12 lg:!leading-18  text-balance text-secondary dark:text-secondary-foreground';

    return (
        <header
            {...rest}
            className={cn(
                'w-full',
                isOption && 'flex justify-between items-end space-x-2',
                className
            )}
        >
            <div
                className={cn(
                    'mx-auto space-y-2 md:space-y-3 lg:space-y-4 max-w-[900px]',
                    blockClassName,
                    notCenterAlignment && 'mx-0'
                )}
            >
                {!onlyTitle && (
                    <h2
                        className={cn(
                            'font-h8 !text-h9 md:!text-h8 font-light tracking-[0.25em] text-primary dark:text-secondary-foreground',
                            textAlign,
                            headerTitle.classname ?? ''
                        )}
                    >
                        {headerTitle.text}
                    </h2>
                )}
                {!onlyTitle && description && (
                    <p
                        className={cn(
                            decriptionDefaultClassName,
                            textAlign,
                            description.className ?? ''
                        )}
                    >
                        {description.text}
                    </p>
                )}
                {onlyTitle && (
                    <h2
                        className={cn(
                            decriptionDefaultClassName,
                            textAlign,
                            headerTitle.classname ?? ''
                        )}
                    >
                        {headerTitle.text}
                    </h2>
                )}
                {children && <div className="mt-2 text-center">{children}</div>}
            </div>
            {isOption && option && (
                <div>
                    <Link
                        className={cn(
                            buttonVariants({
                                variant: 'link',
                                size: 'lg',
                            }),
                            'px-0 py-0 text-primary h-fit text-sm md:text-base'
                        )}
                        href={option.href}
                    >
                        {option.label}
                    </Link>
                </div>
            )}
        </header>
    );
};
