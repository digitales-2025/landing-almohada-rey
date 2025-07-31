import { defineRouting } from 'next-intl/routing';

export default defineRouting({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    localeDetection: true,
    localeCookie: {
        name: 'USER_LOCALE',
        maxAge: 60 * 60 * 24 * 365, // 1 año
    },
    pathnames: {
        '/': '/',
        '/habitaciones': {
            es: '/habitaciones',
            en: '/rooms',
        },
        '/galeria': {
            es: '/galeria',
            en: '/gallery',
        },
        '/experiencias': {
            es: '/experiencias',
            en: '/experiences',
        },
        '/viajeros': {
            es: '/viajeros',
            en: '/travelers',
        },
    },
});
