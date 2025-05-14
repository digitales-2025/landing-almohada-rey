import { useCallback, useRef, useState } from 'react';

export const useChronometer = (timeLeftParam: number = 0) => {
    const [timeLeft, setTimeLeft] = useState<number>(timeLeftParam);
    const [isAbleToUse, setIsAbleToUse] = useState<boolean>(false);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startChronometer = useCallback((duration: number) => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeLeft(duration);
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);
    const stopChronometer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }, []);

    const pauseChronometer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setIsRunning(false);
    }, []);

    const resumeChronometer = useCallback(() => {
        if (intervalRef.current) return;
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    setIsRunning(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const resetChronometer = useCallback(() => {
        setTimeLeft(timeLeftParam);
        setIsRunning(false);
    }, [timeLeftParam]);

    const activateChronometer = useCallback(() => {
        setIsAbleToUse(true);
    }, []);

    return {
        timeLeft,
        isRunning,
        isAbleToUse,
        startChronometer,
        stopChronometer,
        resumeChronometer,
        pauseChronometer,
        activateChronometer,
        resetChronometer,
    };
};

export const formatTimeLeft = (timeLeft: number) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export type ChronometerHookReturnType = ReturnType<typeof useChronometer>;
