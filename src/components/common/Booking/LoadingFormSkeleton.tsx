import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

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

export const LargeLoadingFormSkeleton = () => {
    return (
        <div className="animate-pulse">
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
            </div>
        </div>
    );
};
