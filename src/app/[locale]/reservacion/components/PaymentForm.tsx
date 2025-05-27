import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface PaymentFormProps {
    token: string;
    popin?: boolean;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ token, popin = false }) => {
    const t = useTranslations('checkout');

    useEffect(() => {
        // Cargar el script de Krypton para IZIPAY
        const script = document.createElement('script');
        script.src =
            'https://static.micuentaweb.pe/static/js/krypton-client/V4.0/stable/kr-payment-form.min.js';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            // Configurar el formulario una vez que el script esté listo
            if (window.KR) {
                window.KR.setFormConfig({
                    formToken: token,
                    'kr-language': 'es-ES',
                    'kr-popin': popin,
                    'kr-button-label': t('pay'),
                    'kr-button-style': 'default',
                    'kr-button-text-style': 'bold',
                });

                window.KR.onSubmit(function (data) {
                    console.log('Pago exitoso', data);
                    // Aquí puedes redirigir o mostrar mensaje de éxito
                });

                window.KR.onError(function (err) {
                    console.error('Error en el pago', err);
                    console.error('Código de error:', err.errorCode);
                    console.error('Mensaje:', err.errorMessage);
                    console.error('Detalles:', err.detailedErrorMessage);
                });

                window.KR.render();
            }
        };

        return () => {
            if (script.parentNode) {
                document.head.removeChild(script);
            }
        };
    }, [token, popin, t]);

    return (
        <div className="w-full bg-white p-6 rounded-2xl shadow-xl border border-gray-200 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Detalles de Pago
            </h2>
            <p className="text-center text-gray-500 text-sm mb-6">
                Tu información está cifrada y protegida con PCI DSS.
            </p>

            <div
                className="kr-embedded"
                kr-popin={popin ? 'kr-popin' : ''}
                kr-form-token={token}
            >
                <div className="kr-payment-method"> </div>
                <div className="kr-pan"> </div>
                <div className="kr-expiry"></div>
                <div className="kr-security-code"></div>
                <div className="kr-installment-number"></div>
                <div className="kr-first-installment-delay"></div>

                <div className="kr-payment-button" kr-payment-method="[CARDS]">
                    {t('pay')} %amount-and-currency%
                </div>
            </div>

            <div className="mt-6 flex justify-center gap-4">
                <img
                    src="/booking/PCICertification.png"
                    alt="PCI Certificación"
                    className="h-12 object-contain"
                />
                <img
                    src="/booking/SSLCertification.png"
                    alt="SSL Certificación"
                    className="h-12 object-contain"
                />
            </div>
        </div>
    );
};

export default PaymentForm;
