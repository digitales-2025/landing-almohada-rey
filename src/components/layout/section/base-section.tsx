import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { NextImageProps } from '@/types/next-image';

interface BaseSectionProps
    extends React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    > {
    children: React.ReactNode;
    imageProps?: NextImageProps;
}

export const basePageHorizontalPadding =
    'px-4 sm:px-6 lg:px-8 xl:px-50 2xl:px-54';
export const resetPageHorizontalPadding =
    'px-0 sm:px-0 lg:px-0 xl:px-0 2xl:px-0';
export const onlyLeftPageHorizontalPadding =
    'pl-4 sm:pl-6 lg:pl-8 xl:pl-50 2xl:pl-54';
export const onlyRightPageHorizontalPadding =
    'pr-4 sm:pr-6 lg:pr-8 xl:pr-50 2xl:pr-54';

export const SectionWrapper = ({
    children,
    className,
    imageProps,
    ...rest
}: BaseSectionProps) => {
    return (
        <section
            className={cn(
                'relative z-10 mx-auto w-full !space-y-4 sm:!space-y-6 md:!space-y-8 lg:!space-y-14',
                basePageHorizontalPadding,
                className
            )}
            {...rest}
        >
            {/* <div className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"></div */}
            {imageProps && (
                <figure className="absolute inset-0 -z-20 w-full h-full overflow-clip">
                    <Image
                        src={imageProps.src}
                        alt={imageProps.alt}
                        quality={imageProps.quality}
                        fill={imageProps.fill}
                        className={cn(
                            'object-cover w-full h-full',
                            imageProps.className ?? ''
                        )}
                        priority={imageProps.priority}
                        loading={imageProps.loading}
                        placeholder={imageProps.placeholder}
                        blurDataURL={imageProps.blurDataURL}
                        unoptimized={imageProps.unoptimized}
                    />
                </figure>
            )}
            {children}
            {/* <div className='max-w-[calc(100vw-2rem)]'>{children}</div> */}
        </section>
    );
};
