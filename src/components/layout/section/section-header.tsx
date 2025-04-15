import { cn } from '@/lib/utils';
import React from 'react';

type TitleProps = {
    text: string;
    classname?: string;
};

type DescriptionProps = {
    text: string;
    className?: string;
};

interface SectionHeaderProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    children?: React.ReactNode;
    className?: string;
    headerTitle: TitleProps;
    alignment?: 'left' | 'center' | 'right';
    description?: DescriptionProps;
    onlyTitle?: boolean;
}

export const SectionHeader = ({
    children,
    className,
    headerTitle,
    description,
    onlyTitle = false,
    ...rest
}: SectionHeaderProps) => {
    const alignment = rest.alignment ?? 'center';
    const textAlign =
        alignment === 'left'
            ? 'text-left'
            : alignment === 'right'
            ? 'text-right'
            : 'text-center';

    const decriptionDefaultClassName =
        'font-h3 !text-h6 sm:!text-h5 lg:!text-h3 !leading-9 sm:!leading-12 lg:!leading-18  text-balance text-secondary dark:text-secondary-foreground';

    return (
        <header {...rest} className={cn('w-full', className)}>
            <div className='mx-auto space-y-2 md:space-y-3 lg:space-y-4 max-w-[900px]'>
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
        </header>
    );
};
