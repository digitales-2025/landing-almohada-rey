import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export const LoadingCardSkeleton = ({
    classNameSkeletonItems,
}: {
    classNameSkeletonItems?: string;
}) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(item => (
                <div key={item} className="space-y-3">
                    <div className="overflow-hidden">
                        <Skeleton
                            className={cn(
                                'h-48 w-full rounded-none',
                                classNameSkeletonItems
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <Skeleton
                            className={cn(
                                'h-4 w-[80%] rounded-none',
                                classNameSkeletonItems
                            )}
                        />
                        <Skeleton
                            className={cn(
                                'h-4 w-[90%] rounded-none',
                                classNameSkeletonItems
                            )}
                        />
                        <Skeleton
                            className={cn(
                                'h-4 w-[60%] rounded-none',
                                classNameSkeletonItems
                            )}
                        />
                        |
                    </div>
                    <div className="flex justify-between items-center pt-2">
                        <Skeleton
                            className={cn(
                                'h-8 w-20 rounded-none',
                                classNameSkeletonItems
                            )}
                        />
                        <Skeleton
                            className={cn(
                                'h-8 w-8 rounded-none',
                                classNameSkeletonItems
                            )}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};
