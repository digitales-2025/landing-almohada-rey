import { defineRouting } from "next-intl/routing";

export type SupportedLocales = "es" | "en";

export type RouteConfig = {
  [key in SupportedLocales]: {
    route: string;
    label: string;
    description?: string;
    image?: string;
  };
};

export type RouteConfigMap = {
  [key: string]: RouteConfig; //string is the route
};

export const supportedLocales: Record<SupportedLocales, SupportedLocales> = {
  es: "es",
  en: "en",
};

export const defaultLocale = supportedLocales.es;

//AÑADIR AQUI
export const defaultRoutes = {
  home: "/",
  rooms: "/habitaciones",
  gallery: "/galeria",
  experiences: "/experiencias",
  travelers: "/viajeros",
};

export type DefaultRoutes = keyof typeof defaultRoutes;

//AÑADIR AQUI
export const routes: RouteConfigMap = {
  [defaultRoutes.home]: {
    es: {
      route: "/",
      label: "Inicio",
      description: "Bienvenido a nuestra página de inicio",
      image: "/images/home.jpg",
    },
    en: {
      route: "/",
      label: "Home",
      description: "Welcome to our home page",
      image: "/images/home.jpg",
    },
  },
  [defaultRoutes.rooms]: {
    es: {
      route: "/habitaciones",
      label: "Habitaciones",
      description: "Descubre nuestras habitaciones",
      image: "/images/rooms.jpg",
    },
    en: {
      route: "/rooms",
      label: "Rooms",
      description: "Discover our rooms",
      image: "/images/rooms.jpg",
    },
  },
  [defaultRoutes.gallery]: {
    es: {
      route: "/galeria",
      label: "Galería",
      description: "Explora nuestra galería de imágenes",
      image: "/images/gallery.jpg",
    },
    en: {
      route: "/gallery",
      label: "Gallery",
      description: "Explore our image gallery",
      image: "/images/gallery.jpg",
    },
  },
  [defaultRoutes.experiences]: {
    es: {
      route: "/experiencias",
      label: "Experiencias",
      description: "Explora nuestras experiencias únicas",
      image: "/images/experiences.jpg",
    },
    en: {
      route: "/experiences",
      label: "Experiences",
      description: "Explore our unique experiences",
    },
  },
  [defaultRoutes.travelers]: {
    es: {
      route: "/viajeros",
      label: "Viajeros",
      description: "Conoce a nuestros viajeros",
      image: "/images/travelers.jpg",
    },
    en: {
      route: "/travelers",
      label: "Travelers",
      description: "Meet our travelers",
      image: "/images/travelers.jpg",
    },
  },
};

export const paths = Object.keys(routes);
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: [supportedLocales.es, supportedLocales.en],

  // Used when no locale matches
  defaultLocale: defaultLocale,

  localeDetection: true,

  localeCookie: {
    // Custom cookie name
    name: "USER_LOCALE",
    // Expire in one year
    maxAge: 60 * 60 * 24 * 365,
  },
  //AÑADIR AQUI
  pathnames: {
    // A list of all pathnames that are supported
    [defaultRoutes.home]: defaultRoutes.home,

    // Used when no pathname matches
    [defaultRoutes.rooms]: {
      es: routes[defaultRoutes.rooms].es.route,
      en: routes[defaultRoutes.rooms].en.route,
    },
    [defaultRoutes.gallery]: {
      es: routes[defaultRoutes.gallery].es.route,
      en: routes[defaultRoutes.gallery].en.route,
    },
    [defaultRoutes.experiences]: {
      en: routes[defaultRoutes.experiences].en.route,
    },
    [defaultRoutes.travelers]: {
      es: routes[defaultRoutes.travelers].es.route,
      en: routes[defaultRoutes.travelers].en.route,
    },
  },
  // alternateLinks: false //si se va a usar CMS activar esto, tambien si hay paginas exclusivas para un locale
  // para personalizar los 'alterantelinks', revisar https://next-intl.dev/docs/routing#alternateLinks
});
