import React from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

type NextImageConfig = {
    src: string;
    // width?: number;
    // height?: number;
    quality?: number;
    blurDataURL?: string;
    placeholder?: 'blur' | 'empty';
    unoptimized?: boolean;
    priority?: boolean;
    fill?: boolean;
    // sizes?: string;
    className?: string;
    alt?: string;
};

/**
 * Props for the BaseHeroWrapper component
 * @interface BaseHeroWrapperProps
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 * @property {React.ReactNode} children - The content to be rendered inside the hero section
 * @property {NextImageConfig} image - The configuration object for the hero background image
 * @property {string} [gradientEffectClassname] - Optional CSS class name for applying a gradient effect over the hero image
 Tailwind default classnames: "from-black/20 to-black/80"
 */
interface BaseHeroWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    image: NextImageConfig;
    gradientEffectClassname?: string;
}

export const BaseHeroWrapper = ({
    children,
    className,
    image,
    gradientEffectClassname,
    ...rest
}: BaseHeroWrapperProps) => {
    return (
        <div
            className={cn(
                'relative h-fit mx-auto px-6 pt-32 pb-12 sm:pb-16 md:pb-18 lg:pb-20 xl:pb-40 lg:pt-56',
                className
            )}
            {...rest}
        >
            <div
                className={cn(
                    'absolute inset-0 -z-10 bg-gradient-to-t from-black/20 to-black/80',
                    gradientEffectClassname ?? ''
                )}
            />
            <figure className="absolute inset-0 -z-20 to-transparent">
                <Image
                    src={
                        image.src ??
                        'https://images.pexels.com/photos/1850595/pexels-photo-1850595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
                    }
                    fill
                    alt={image.alt ?? 'Hero Image'}
                    quality={image.quality ?? undefined}
                    placeholder={image.placeholder ?? 'empty'}
                    blurDataURL={image.blurDataURL ?? undefined}
                    unoptimized={image.unoptimized ?? false}
                    // sizes={image.sizes ?? "100vw"}
                    className={cn(
                        'object-cover w-full h-full',
                        image.className ?? ''
                    )}
                    priority
                />
            </figure>
            <div className="relative z-10 mx-auto text-center text-wrap">
                {children}
            </div>
        </div>
    );
};
