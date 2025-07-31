import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FetchingErrorProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    message?: string;
    onRefetch?: () => void;
    refetchButtonLabel?: string;
}

export const FetchingError = ({
    title = 'Error al cargar datos',
    message = 'No se pudieron cargar los datos. Por favor, inténtalo de nuevo.',
    onRefetch,
    refetchButtonLabel = 'Reintentar',
    className,
    ...props
}: FetchingErrorProps) => {
    return (
        <div
            className={cn(
                'bg-destructive/10 text-destructive rounded-md p-4 mt-2',
                className
            )}
            {...props}
        >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                <div className="flex items-center col-span-1">
                    <AlertCircle className="h-6 w-6" />
                </div>
                <div className="col-span-1 sm:col-span-2">
                    <h4 className="font-medium">{title}</h4>
                    {message && <p className="text-sm mt-1">{message}</p>}
                </div>
                {onRefetch && (
                    <div className="col-span-1 flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onRefetch}
                            className="hover:bg-destructive/20"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {refetchButtonLabel}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
