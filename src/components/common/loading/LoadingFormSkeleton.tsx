import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const OneRowLoadingFormSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {/* First column */}
                <Skeleton className="h-10" />

                {/* Second column */}
                <Skeleton className="h-10" />

                {/* Third column */}
                <Skeleton className="h-10" />

                {/* Fourth column */}
                <Skeleton className="h-10" />
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
