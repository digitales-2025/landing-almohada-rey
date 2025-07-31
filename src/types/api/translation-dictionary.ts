import { SupportedLocales } from '@/i18n/routing';

export type Translations = {
    [key in SupportedLocales]: string;
};

export type Dictionary = {
    [key: string]: Translations;
};
