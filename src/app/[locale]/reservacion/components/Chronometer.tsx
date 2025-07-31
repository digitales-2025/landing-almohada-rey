import React from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import {
    ChronometerHookReturnType,
    formatTimeLeft,
} from '../hooks/useWsChronemeter';

export const Chronometer = ({
    warningWhen,
    chronometer,
}: {
    chronometer: ChronometerHookReturnType;
    warningWhen: number;
}) => {
    const t = useTranslations('IndexPageBooking.chronometer');
    // Usamos useRef para rastrear si ya se mostró la animación de advertencia
    const hasShownWarning = React.useRef(false);

    // Usamos useState para controlar el estado de la animación
    const [showWarningAnimation, setShowWarningAnimation] =
        React.useState(false);

    // Efecto para controlar cuándo activar la animación
    React.useEffect(() => {
        if (chronometer.timeLeft <= warningWhen && !hasShownWarning.current) {
            // Primera vez que llega al umbral de advertencia
            setShowWarningAnimation(true);
            hasShownWarning.current = true;

            // Configurar un temporizador para desactivar la animación después de completarse
            // (la duración debe coincidir con la de tu animación)
            const animationTimer = setTimeout(() => {
                setShowWarningAnimation(false);
            }, 900); // 300ms x 3 (animate-thrice)

            return () => clearTimeout(animationTimer);
        }
    }, [chronometer.timeLeft, warningWhen]);

    const TimerDisplay = React.memo(({ timeLeft }: { timeLeft: number }) => {
        return (
            <div className="fixed z-20 bottom-0 right-0 p-4 w-full flex justify-center bg-none h-fit">
                <div
                    className={cn(
                        'bg-primary-foreground text-secondary px-4 py-2 rounded shadow-lg max-w-fit text-xl',
                        timeLeft <= warningWhen && 'text-destructive', // Color siempre rojo bajo el umbral
                        showWarningAnimation &&
                            'scale-105 animate-shake animate-thrice animate-duration-300 animate-ease-linear' // Animación solo cuando se activa
                    )}
                >
                    <span>
                        {t('timeLeftLabel', {
                            timeLeft: formatTimeLeft(timeLeft),
                        })}
                    </span>
                </div>
            </div>
        );
    });
    TimerDisplay.displayName = 'Chronometer';

    return <TimerDisplay timeLeft={chronometer.timeLeft} />;
};
