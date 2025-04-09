import { Bike, Bus, CalendarDays, GalleryHorizontalEnd, Lamp } from "lucide-react";

import { LogoAlmohadaRey } from "@/assets/icons/LogoAlmohadaRey";
import { LogoAlmohadaReyMobile } from "@/assets/icons/LogoAlmohadaReyMobile";
import { NavigationConfig, NavItem } from "../types/nav-items";

// Definición de los ítems de navegación
export const navItems: NavItem[] = [
  // Izquierda del logo
  {
    id: "rooms",
    title: "Habitaciones",
    href: "/habitaciones",
    icon: Lamp,
    type: "link",
    position: "left",
    device: "all",
  },
  {
    id: "gallery",
    title: "Galería",
    href: "/gallery",
    icon: GalleryHorizontalEnd,
    type: "link",
    position: "left",
    device: "all",
  },
  // Logo central (actúa como home)
  {
    id: "home",
    title: "", // Sin texto, solo logo
    href: "/",
    type: "logo", // Tipo especial para el logo
    position: "center",
    device: "all",
  },
  // Derecha del logo
  {
    id: "experiences",
    title: "Experiencias",
    href: "/experiencias",
    icon: Bike,
    type: "link",
    position: "right",
    device: "all",
  },
  {
    id: "trips",
    title: "Viajes",
    href: "/viajes",
    icon: Bus,
    type: "link",
    position: "right",
    device: "all",
  },
  {
    id: "reservations",
    title: "Reservas",
    href: "/reservas",
    icon: CalendarDays,
    type: "button",
    position: "right",
    device: "all",
    isHighlighted: true,
  },
];

// Configuración completa de navegación
export const navigationConfig: NavigationConfig = {
  logo: {
    type: "component",
    text: "Almohada Rey",
    desktop: LogoAlmohadaRey,
    mobile: LogoAlmohadaReyMobile,
    width: 220,
    height: 80,
    mobileWidth: 160,
    mobileHeight: 55,
    alt: "Almohada Rey Logo",
  },
  items: navItems,
  mobileBreakpoint: "md",
  showOnScroll: false,
  hideOnScroll: true,
  sticky: true,
  centerLogo: true,
};
