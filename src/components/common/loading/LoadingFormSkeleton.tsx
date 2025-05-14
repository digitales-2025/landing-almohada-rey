import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const OneRowLoadingFormSkeleton = ({
    className,
    itemClassName,
}: {
    className?: string;
    itemClassName?: string;
}) => {
    const itemClassnames = cn(
        'h-10 w-full rounded-none bg-primary/5',
        itemClassName
    );
    return (
        <div className={cn('animate-pulse')}>
            <div
                className={cn(
                    'grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-5 gap-4 place-items-stretch h-full',
                    className
                )}
            >
                {/* First column */}
                <Skeleton className={itemClassnames} />

                {/* Second column */}
                <Skeleton className={itemClassnames} />

                {/* Third column */}
                <Skeleton className={itemClassnames} />

                {/* Fourth column */}
                <Skeleton className={itemClassnames} />

                <Skeleton
                    className={cn(
                        itemClassnames,
                        'md:col-span-2 2xl:col-span-1'
                    )}
                />
            </div>
        </div>
    );
};

export const LargeLoadingFormSkeleton = ({
    dark = false,
    className,
}: {
    dark?: boolean;
    className?: string;
}) => {
    const localClassnames = cn(!dark && 'bg-primary/5', className);
    return (
        <div className={cn('animate-pulse')}>
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton className={cn('h-10', localClassnames)} />
                <Skeleton className={cn('h-10', localClassnames)} />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton className={cn('h-10', localClassnames)} />
                <Skeleton className={cn('h-10', localClassnames)} />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton className={cn('h-10', localClassnames)} />
                <Skeleton className={cn('h-10', localClassnames)} />
            </div>
        </div>
    );
};
