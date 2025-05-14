import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

import { DetailedReservation } from '@/actions/booking/booking';
import { useRouter } from '@/i18n/navigation';
import { defaultLocale } from '@/i18n/routing';
import { getCurrentLimaDate } from '@/lib/timedate/peru-datetime';
import {
    BaseWsErrorResponse,
    BaseWsResponse,
    OnConnectionResponse,
    ReservationErrorReasons,
    StartBookingReservationResponseDto,
} from '../types/ws.dto';
import { formatTimeLeft, useChronometer } from './useWsChronemeter';

// Eventos que el CLIENTE EMITE hacia el servidor
const clientEmitEvents = {
    startBookingPayment: 'startBookingPayment',
    cancelBookingPayment: 'cancelBookingPayment',
    completeBookingPayment: 'completeBookingPayment',
    errorBookingPayment: 'errorBookingPayment',
    pong: 'pong', // Respuesta al ping del servidor
};

// Eventos que el CLIENTE ESCUCHA desde el servidor
const clientListenEvents = {
    ping: 'ping', // El servidor envía ping y nosotros respondemos con pong
    onNoPing: 'onNoPing', // El servidor nos avisa que ya no recibe pongs
    onPong: 'onPong', // Respuesta a cualquier eventualidad despues de enviar un pong
    onConnection: 'onConnection',
    onDisconnection: 'onDisconnection',
    onStartBookingPayment: 'onStartBookingPayment',
    onCancelBookingPayment: 'onCancelBookingPayment',
    onCompleteBookingPayment: 'onCompleteBookingPayment',
    onErrorBookingPayment: 'onErrorBookingPayment',
};

// Mantenemos una instancia de socket global para evitar múltiples conexiones
let globalSocketInstance: Socket | null = null;
let socketInitialized = false;

export function useBookingWebSocket(locale: string, reservationId: string) {
    const t = useTranslations('IndexPageBooking');
    const reservationRef = useRef<DetailedReservation | undefined>(undefined);
    const setReservation = (reservation: DetailedReservation | undefined) => {
        reservationRef.current = reservation;
    };
    const validateReservationStatus = (reservation: DetailedReservation) => {
        if (reservation.status !== 'PENDING') {
            return false;
        }
        return true;
    };
    const validateReservationDates = (reservation: DetailedReservation) => {
        const today = getCurrentLimaDate();
        const checkInDate = new Date(reservation.checkInDate);
        const checkOutDate = new Date(reservation.checkOutDate);
        if (checkInDate < today || checkOutDate < today) {
            return false;
        }
        return true;
    };
    const [isConnected, setIsConnected] = useState(false);
    const [isConnecting, setIsConnecting] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    // Estado de conexión
    const [connectionQuality, setConnectionQuality] = useState<
        'good' | 'poor' | 'critical' | 'lost'
    >('good');
    const [canContinue, setCanContinue] = useState(false);
    const [clientId, setClientId] = useState<string | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fakeId = useRef('Hola').current; // Usando useRef para estabilizar esta referencia

    const lastPingRef = useRef<number>(Date.now());

    const router = useRouter();
    const chronometer = useChronometer();
    const {
        startChronometer,
        stopChronometer,
        activateChronometer,
        // pauseChronometer,
        // resumeChronometer,
    } = chronometer;

    // Memorizamos la función para evitar recreaciones innecesarias
    const redirectToRooms = useCallback(() => {
        const route =
            locale !== defaultLocale
                ? `/rooms#booking`
                : '/habitaciones#reservar';
        router.replace(route); // Redirigir a la página de inicio
        setIsLoading(false);
    }, [locale, router]);

    const handleError = useCallback((error: BaseWsErrorResponse) => {
        switch (error.reason as ReservationErrorReasons) {
            case 'RESERVATION_CANCELLED': //Cancellation occured in the backend
                toast.error(error.message);
                setIsLoading(false);
                setCanContinue(false);
                setConnectionQuality('lost');
                setIsConnected(false);
                setIsConnecting(true);
                setClientId(null);
                redirectToRooms();
                break;
            case 'RESERVATION_NOTIFICATION':
                toast.error(error.message);
                setIsLoading(false);
                break;
            case 'RESERVATION_REDIRECT':
                toast.error(error.message);
                setIsLoading(false);
                setIsRedirecting(true);
                redirectToRooms();
                break;
            default:
                toast.error(t('generalError.message'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const ifErrorHandleIt = useCallback(
        (data: BaseWsResponse) => {
            if (data.error && data.reason && data.message) {
                handleError(data as BaseWsErrorResponse);
            } else if (data.error && !data.reason) {
                toast.error(t('generalError.message'));
                redirectToRooms();
                setIsLoading(false);
            } else {
                return;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [handleError]
    );

    // Cancelar la reserva
    const cancelBookingPayment = useCallback(() => {
        stopChronometer();

        if (socketRef.current && clientId) {
            setIsLoading(false);
            socketRef.current.emit(clientEmitEvents.cancelBookingPayment, {
                clientId,
                locale,
                reservationId,
            });
        }

        redirectToRooms();
    }, [clientId, locale, stopChronometer, redirectToRooms, reservationId]);

    // Iniciar el cronómetro de reserva
    const startBookingPayment = useCallback(() => {
        if (socketRef.current && clientId) {
            console.log('Iniciando cronómetro de reserva');
            setIsLoading(true);
            socketRef.current.emit(clientEmitEvents.startBookingPayment, {
                clientId,
                locale,
                reservationId,
            });
        } else {
            // No intentamos reconexión, solo notificamos el problema
            toast.error(
                'No se pudo iniciar la reserva. Por favor, inténtalo de nuevo.'
            );
            cancelBookingPayment();
        }
    }, [clientId, locale, reservationId, cancelBookingPayment]);

    // Completar la reserva
    const completeBookingPayment = useCallback(
        (bookingData?: any) => {
            if (socketRef.current && clientId) {
                console.log('Completando reserva');
                setIsLoading(true);
                stopChronometer();
                socketRef.current.emit(
                    clientEmitEvents.completeBookingPayment,
                    {
                        clientId,
                        locale,
                        reservationId,
                        data: bookingData,
                    }
                );
            }
        },
        [clientId, locale, stopChronometer, reservationId]
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

    // Función para eliminar listeners (limpieza)
    const removeSocketListeners = useCallback((socket: Socket) => {
        socket.off('connect');
        socket.off('disconnect');
        socket.off(clientListenEvents.ping);
        socket.off(clientListenEvents.onConnection);
        socket.off(clientListenEvents.onNoPing);
        socket.off(clientListenEvents.onStartBookingPayment);
        socket.off(clientListenEvents.onCancelBookingPayment);
        socket.off(clientListenEvents.onCompleteBookingPayment);
        socket.off('connect_error');
    }, []);

    // Función para registrar listeners (simplifica la limpieza)
    const setupSocketListeners = useCallback(
        (socket: Socket) => {
            // Listeners básicos de conexión
            socket.on('connect', () => {
                setIsConnected(true);
                setIsConnecting(false);
                setIsRedirecting(false);
                setIsLoading(true);
                setClientId(socket.id ?? fakeId);
                setConnectionQuality('good');
                lastPingRef.current = Date.now();
                console.log('WebSocket conectado con ID:', socket.id);
            });

            socket.on('disconnect', () => {
                setIsConnected(false);
                setIsConnecting(true);
                setClientId(null);
                setConnectionQuality('lost');
                console.log('WebSocket desconectado');
            });

            socket.on(
                clientListenEvents.onConnection,
                (res: OnConnectionResponse) => {
                    setIsConnected(true);
                    setIsConnecting(false);
                    setClientId(socket.id ?? fakeId);
                    setIsLoading(false);
                    setConnectionQuality('good');

                    if (res.clientId === socket.id && res.error) {
                        ifErrorHandleIt({
                            error: res.error,
                            reason: res.reason,
                            message: res.message,
                        });
                    }

                    if (res.clientId === socket.id && !res.error && res.data) {
                        setClientId(res.clientId as string);
                        if (!res.data.reservation) {
                            setIsLoading(false);
                            setCanContinue(false);
                            setConnectionQuality('lost');
                            setIsConnected(false);
                            setIsConnecting(true);
                            setClientId(null);
                            cancelBookingPayment();
                        }
                        if (!validateReservationStatus(res.data.reservation)) {
                            setIsLoading(false);
                            setCanContinue(false);
                            setIsConnected(false);
                            setIsConnecting(true);
                            setClientId(null);
                            redirectToRooms();
                            toast.error(
                                locale === defaultLocale
                                    ? 'La reserva es inválida'
                                    : 'The reservation is invalid'
                            );
                        }
                        if (!validateReservationDates(res.data.reservation)) {
                            setIsLoading(false);
                            setCanContinue(false);
                            setIsConnected(false);
                            setIsConnecting(true);
                            setClientId(null);
                            redirectToRooms();
                            toast.error(
                                locale === defaultLocale
                                    ? 'La reserva es inválida'
                                    : 'The reservation is invalid'
                            );
                        }
                        setReservation(res.data.reservation);
                    }
                }
            );

            // Respondemos a los pings del servidor con pongs para mantener la conexión activa
            socket.on(clientListenEvents.ping, () => {
                console.log(
                    'Ping recibido del servidor, respondiendo con pong'
                );
                lastPingRef.current = Date.now();

                if (socket && socket.connected && socket.id) {
                    socket.emit(clientEmitEvents.pong, {
                        clientId: socket.id,
                        timestamp: Date.now(),
                        reservationId,
                    });
                }

                // Si la conexión estaba marcada como pobre, restaurarla a buena
                if (connectionQuality === 'poor') {
                    setConnectionQuality('good');
                    toast.success(t('connection.status.good'));
                }
            });

            socket.on(clientListenEvents.onPong, (data: BaseWsResponse) => {
                if (data.clientId === socket.id && data.error) {
                    toast.error(data.message);
                    setConnectionQuality('poor');
                    toast.warning(data.message);
                } else if (data.clientId === socket.id && !data.error) {
                    // Si el servidor responde a nuestro pong, la conexión es buena
                    setConnectionQuality('good');
                }
            });

            socket.on(clientListenEvents.onNoPing, data => {
                // console.warn(
                //     'El servidor no recibe pongs, la conexión puede estar comprometida'
                // );
                setConnectionQuality('critical');
                toast.warning(data.message, {
                    description: t('connection.criticalDescription'),
                });
            });

            // Escuchar eventos del servidor para el cronómetro
            socket.on(
                clientListenEvents.onStartBookingPayment,
                (res: StartBookingReservationResponseDto) => {
                    if (res.clientId === socket.id && res.error) {
                        ifErrorHandleIt({
                            error: res.error,
                            reason: res.reason,
                            message: res.message,
                        });
                    }
                    // Opcionalmente puedes iniciar el cronómetro si el servidor lo indica
                    if (res.clientId === socket.id && res.data?.timeLimit) {
                        toast.info(
                            t('events.startReservation.message', {
                                timeLeft: formatTimeLeft(res.data.timeLimit),
                            }),
                            {
                                description: t(
                                    'events.startReservation.additionalInfo'
                                ),
                            }
                        );
                        setIsLoading(false);
                        activateChronometer();
                        setCanContinue(true);
                        startChronometer(res.data.timeLimit ?? 60);
                    }
                }
            );

            socket.on(
                clientListenEvents.onCancelBookingPayment,
                (data: BaseWsResponse) => {
                    setIsLoading(false);
                    if (data.error) {
                        // toast.error(data.message);
                        // setCanContinue(false);
                        // setConnectionQuality('lost');
                        // setIsConnected(false);
                        // setIsConnecting(true);
                        // setClientId(null);
                        // setError(data.message);
                        // return;
                        ifErrorHandleIt(data);
                    }
                    if (data.clientId === socket.id) {
                        stopChronometer();
                        toast.error('Reserva cancelada');
                        redirectToRooms();
                    }
                }
            );

            // Manejo de errores
            socket.on('connect_error', err => {
                console.error('Error de conexión:', err);
                setError(`Error de conexión: ${err.message}`);
                setConnectionQuality('lost');

                toast.error('Error de conexión. La reserva será cancelada.');
                cancelBookingPayment();
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [
            activateChronometer,
            startChronometer,
            stopChronometer,
            connectionQuality,
            cancelBookingPayment,
            redirectToRooms,
            fakeId,
            reservationId,
        ]
    );

    // Inicializar conexión - Este efecto solo se ejecutará una vez al montar el componente
    useEffect(() => {
        // Si ya existe una instancia global, la usamos
        if (globalSocketInstance && socketInitialized) {
            socketRef.current = globalSocketInstance;
            // Configurar listeners en la instancia existente
            setupSocketListeners(globalSocketInstance);
            return;
        }

        // Si no, creamos una nueva
        console.log('Creando nueva conexión WebSocket');

        // Asegúrate de usar la URL correcta de tu servidor NestJS
        const socketUrl =
            process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:4000';
        const socket = io(socketUrl, {
            // Opciones para mejorar la estabilidad de la conexión
            query: {
                reservationId,
                locale,
            },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            timeout: 20000,
            transports: ['websocket', 'polling'],
            forceNew: false, // Cambiado a false para permitir reutilizar la conexión
            withCredentials: false,
        });

        // Guardar referencia local y global
        socketRef.current = socket;
        globalSocketInstance = socket;
        socketInitialized = true;

        // Configurar listeners de manera agrupada para facilitar la limpieza
        setupSocketListeners(socket);

        // Configuración para cancelar cuando hay mala conexión persistente
        const poorConnectionTimeout = setTimeout(() => {
            if (connectionQuality === 'poor') {
                console.error(
                    'Conexión persistentemente débil, cancelando reserva'
                );
                toast.error(
                    'Se ha perdido la conexión. La reserva será cancelada.'
                );
                cancelBookingPayment();
            }
        }, 5000);

        return () => {
            // Limpiar timeout
            clearTimeout(poorConnectionTimeout);

            // No desconectamos el socket al desmontar el componente, solo quitamos los listeners
            if (socket) {
                console.log('Limpiando listeners de socket');
                removeSocketListeners(socket);
                // No desconectamos para mantener la conexión
                // socket.disconnect();
            }
        };
    }, [
        locale,
        reservationId,
        setupSocketListeners,
        removeSocketListeners,
        connectionQuality,
        cancelBookingPayment,
    ]);

    // Función de limpieza cuando el componente se desmonte completamente (navegación o cierre)
    useEffect(() => {
        return () => {
            // Solo desconectamos el socket cuando la aplicación se cierra o cuando navegamos fuera completamente
            if (globalSocketInstance) {
                console.log('Desmontando completamente y desconectando socket');
                globalSocketInstance.disconnect();
                globalSocketInstance = null;
                socketInitialized = false;
            }
        };
    }, []);

    return {
        reservationRef,
        isConnected,
        isConnecting,
        isLoading,
        isRedirecting,
        canContinue,
        connectionQuality,
        clientId,
        client: socketRef,
        error,
        startBookingPayment,
        cancelBookingPayment,
        completeBookingPayment,
        notifyBookingError,
        chronometer,
    };
}

export type BookingWebSocketHookReturnType = ReturnType<
    typeof useBookingWebSocket
>;
