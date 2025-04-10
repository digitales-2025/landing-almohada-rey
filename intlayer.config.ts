import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.SPANISH_PERU,
      // Tus otros locales
    ],
    defaultLocale: Locales.SPANISH_PERU,
    
  },
  editor: {
    applicationURL: "http://localhost:3000",

    enabled: true,
  },
};

export default config;