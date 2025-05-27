import React, { useState } from 'react';

import { requestPaymentToken } from '@/actions/booking/booking.actions';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import PaymentForm from './PaymentForm';

interface Props {
    disabled?: boolean;
    amount?: number;
    currency?: 'PEN' | 'USD';
    orderId?: string;
    clientEmail?: string;
}

export const PaymentSection = ({
    disabled,
    amount = 200,
    currency = 'PEN',
    orderId = `order-${Date.now()}`,
    clientEmail = 'cliente@example.com',
}: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRequestPaymentToken = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await requestPaymentToken(
                amount,
                currency,
                orderId,
                clientEmail
            );

            if (response?.token) {
                setToken(response.token);
            } else {
                throw new Error('No se recibió un token válido');
            }
        } catch (err: any) {
            setError(err.message || 'Error al crear el token de pago');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SectionWrapper>
            <SectionHeader
                onlyTitle={true}
                headerTitle={{ text: 'Pago con Izipay' }}
                alignment="left"
            />

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700">
                    {error}
                </div>
            )}

            {!token && (
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    disabled={loading || disabled}
                    onClick={handleRequestPaymentToken}
                >
                    {loading ? 'Generando pago...' : 'Pagar ahora'}
                </button>
            )}

            {token && (
                <div className="mt-6">
                    <PaymentForm popin={true} token={token} />
                </div>
            )}
        </SectionWrapper>
    );
};
