import { SupportedLocales } from '@/i18n/routing';

export const formatPrice = (
    priceText: string,
    currencyText: string,
    locale?: SupportedLocales
) => {
    const price = Number(priceText);
    if (isNaN(price)) {
        return priceText;
    }
    // Usar un formato específico en lugar de depender de la configuración local del dispositivo
    let formatter;
    let defaultLocale;

    if (!locale) {
        // Si no se proporciona un locale, intenta obtenerlo del navegador
        defaultLocale = 'es-PE';
    }

    defaultLocale = locale === 'es' ? 'es-PE' : locale;
    try {
        // Intenta usar un locale específico para consistencia
        formatter = new Intl.NumberFormat(defaultLocale, {
            style: 'currency',
            currency: currencyText,
            minimumFractionDigits: 2,
        });
    } catch {
        // Fallback por si hay un error con el locale o la moneda
        return `${currencyText} ${price.toFixed(2)}`;
    }

    return formatter.format(price);
};
