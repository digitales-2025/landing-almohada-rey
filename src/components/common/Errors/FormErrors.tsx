import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    message?: string;
    onRetry?: () => void;
    retryButtonLabel?: string;
}

export const SmallFormError = ({
    title = 'Ha ocurrido un error',
    message = 'No se pudo procesar el formulario. Por favor, inténtalo de nuevo.',
    onRetry,
    retryButtonLabel = 'Reintentar',
    className,
    ...props
}: FormErrorProps) => {
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
                {onRetry && (
                    <div className="col-span-1 flex justify-end">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onRetry}
                            className="hover:bg-destructive/20"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {retryButtonLabel}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export const LargeFormError = ({
    title = 'Ha ocurrido un error',
    message = 'No se pudo procesar el formulario. Por favor, verifica los datos e inténtalo de nuevo.',
    onRetry,
    retryButtonLabel = 'Reintentar',
    className,
    ...props
}: FormErrorProps) => {
    return (
        <div
            className={cn(
                'bg-destructive/10 text-destructive rounded-md p-5 mt-4',
                className
            )}
            {...props}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="flex-shrink-0">
                    <AlertCircle className="h-8 w-8" />
                </div>

                <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{title}</h3>
                    {message && (
                        <div className="mt-2 space-y-2">
                            <p className="text-sm">{message}</p>
                        </div>
                    )}
                </div>

                {onRetry && (
                    <div className="flex-shrink-0 mt-3 md:mt-0">
                        <Button
                            variant="outline"
                            onClick={onRetry}
                            className="border-destructive text-destructive hover:bg-destructive/10"
                        >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            {retryButtonLabel}
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};
