import { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

import { useRouter } from '@/i18n/navigation';
import { useChronometer } from './useWsChronemeter';

// Eventos que el CLIENTE EMITE hacia el servidor
const clientEmitEvents = {
    startBookingPayment: 'startBookingPayment',
    cancelBookingPayment: 'cancelBookingPayment',
    completeBookingPayment: 'completeBookingPayment',
    errorBookingPayment: 'errorBookingPayment',
};

// Eventos que el CLIENTE ESCUCHA desde el servidor
const clientListenEvents = {
    onConnection: 'onConnection',
    onDisconnection: 'onDisconnection',
    onStartBookingPayment: 'onStartBookingPayment',
    onCancelBookingPayment: 'onCancelBookingPayment',
    onCompleteBookingPayment: 'onCompleteBookingPayment',
    onErrorBookingPayment: 'onErrorBookingPayment',
};

export function useBookingWebSocket(locale: string) {
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [clientId, setClientId] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fakeId = 'Hola';

    const router = useRouter();
    const {
        isRunning,
        startChronometer,
        stopChronometer,
        pauseChronometer,
        resumeChronometer,
        timeLeft,
    } = useChronometer();

    // Inicializar conexión
    useEffect(() => {
        // Asegúrate de usar la URL correcta de tu servidor NestJS
        const socket = io(
            process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:4000',
            {
                // Opciones para mejorar la estabilidad de la conexión
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                timeout: 20000,
                transports: ['websocket', 'polling'],
                forceNew: true,
                withCredentials: false,
            }
        );
        socketRef.current = socket;

        socket.on('onConnection', () => {
            setIsConnected(true);
            setIsConnecting(false);
            setClientId(socket.id ?? fakeId);
            console.log('WebSocket conectado con ID:', socket.id);
        });

        socket.on('onDisconnection', () => {
            setIsConnected(false);
            setIsConnecting(true);
            setClientId(null);
            console.log('WebSocket desconectado');
        });

        socket.on(clientListenEvents.onConnection, data => {
            console.log('Evento de conexión:', data);
            if (data.clientId === socket.id && !data.error) {
                setClientId(data.clientId);
                // startBookingPayment();
            }
        });

        // Escuchar eventos del servidor para el cronómetro
        socket.on(clientListenEvents.onStartBookingPayment, res => {
            console.log('start data', res);
            toast.info(
                'Reserva iniciada. Tienes ' +
                    res.data.timeLimit +
                    ' segundos para completar el pago.'
            );
            // Opcionalmente puedes iniciar el cronómetro si el servidor lo indica
            if (res.clientId === socket.id && res.data.timeLimit) {
                startChronometer(res.data.timeLimit ?? 60);
            }
        });

        socket.on(clientListenEvents.onCancelBookingPayment, data => {
            if (data.clientId === socket.id) {
                stopChronometer();
            }
        });

        // Manejo de errores
        socket.on('connect_error', err => {
            console.error('Error de conexión:', err);
            setError(`Error de conexión: ${err.message}`);
        });

        return () => {
            socket.disconnect();
        };
    }, [startChronometer, stopChronometer]);

    // Iniciar el cronómetro de reserva
    const startBookingPayment = useCallback(() => {
        //startChronometer(60); // Inicia el cronómetro con un tiempo de 60 segundos
        if (socketRef.current && clientId) {
            console.log('Iniciando cronómetro de reserva');
            socketRef.current.emit(clientEmitEvents.startBookingPayment, {
                clientId,
                locale,
            });
        } else {
            console.warn(
                'No se puede iniciar el cronómetro: socket no conectado'
            );
            // Podemos reintentar la conexión
            if (socketRef.current && !socketRef.current.connected) {
                socketRef.current.connect();
            }
        }
        //
    }, [clientId, locale]);

    // Cancelar la reserva
    const cancelBookingPayment = useCallback(() => {
        stopChronometer();

        if (socketRef.current && clientId) {
            console.log('Cancelando reserva');
            socketRef.current.emit(clientEmitEvents.cancelBookingPayment, {
                clientId,
                locale,
            });
        }

        router.push('/'); // Redirigir a la página de inicio
    }, [clientId, locale, stopChronometer, router]);

    // Completar la reserva
    const completeBookingPayment = useCallback(
        (bookingData?: any) => {
            stopChronometer();
            if (socketRef.current && clientId) {
                console.log('Completando reserva');
                socketRef.current.emit(
                    clientEmitEvents.completeBookingPayment,
                    {
                        clientId,
                        locale,
                        data: bookingData,
                    }
                );
            }
        },
        [clientId, locale, stopChronometer]
    );

    // Notificar error en la reserva
    const notifyBookingError = useCallback(
        (errorData?: any) => {
            stopChronometer();
            if (socketRef.current && clientId) {
                console.log('Error en la reserva');
                socketRef.current.emit(clientEmitEvents.errorBookingPayment, {
                    clientId,
                    locale,
                    error: errorData,
                });
            }
        },
        [clientId, locale, stopChronometer]
    );

    const tryReconnection = useCallback((): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            pauseChronometer();
            if (socketRef.current && !socketRef.current.connected) {
                console.log('Intentando reconectar...');
                socketRef.current.once('onConnection', () => {
                    // console.log('Reconectado');
                    setIsConnected(true);
                    resolve(true);
                });
                socketRef.current.once('onDisconnection', err => {
                    console.error('Error de reconexión:', err);
                    setIsConnected(false);
                    cancelBookingPayment();
                    setError(`Error de reconexión: ${err.message}`);
                    reject(err);
                });
                socketRef.current.connect();
            } else {
                resumeChronometer();
                resolve(true);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [socketRef]);

    return {
        isConnected,
        isConnecting,
        clientId,
        client: socketRef,
        error,
        startBookingPayment,
        cancelBookingPayment,
        completeBookingPayment,
        notifyBookingError,
        tryReconnection,
        chronometer: {
            isRunning,
            timeLeft,
            startChronometer,
            stopChronometer,
        },
    };
}
