import { NavItemDevice, NavItemPosition, NavItemType } from "../types/nav-items";

// Configuración de estilos para los tipos de navegación
export type NavItemStyleConfig = {
  container: string;
  text: string;
  icon: string;
  active: string;
  hover: string;
  inactive: string;
  mobile?: {
    container?: string;
    text?: string;
    icon?: string;
  };
};

// Configuración de estilos según el tipo
export const navItemStyleConfig: Record<NavItemType, NavItemStyleConfig> = {
  logo: {
    container: "flex items-center gap-2",
    text: "text-2xl font-medium font-playfair",
    icon: "h-9 w-9",
    active: "",
    hover: "",
    inactive: "",
    mobile: {
      text: "text-xl font-medium font-playfair",
      container: "flex items-center justify-start gap-1",
    },
  },
  link: {
    container: "flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-300",
    text: "text-2xl font-medium font-playfair transition-colors duration-300",
    icon: "[&>svg]:size-12 transition-colors duration-300",
    active: "text-primary",
    hover: "hover:text-primary hover:scale-110 hover:bg-white/10 transition-all",
    inactive: "text-white",
    mobile: {
      container: "flex items-center justify-start gap-1 pl-0 pr-2 py-1.5 rounded-md transition-colors",
      text: "text-xl font-medium font-playfair transition-colors duration-300",
      icon: "[&>svg]:size-7 transition-colors duration-300",
    },
  },
  dropdown: {
    container: "flex items-center gap-3 px-4 py-3 rounded-md transition-colors duration-300",
    text: "text-2xl font-medium font-playfair transition-colors duration-300",
    icon: "[&>svg]:size-12 transition-colors duration-300",
    active: "text-primary",
    hover: "hover:text-primary hover:scale-110 hover:bg-white/10 transition-all",
    inactive: "text-white",
    mobile: {
      container: "flex items-center justify-start gap-1 pl-0 pr-2 py-1.5 rounded-md transition-colors relative group",
      text: "text-xl font-medium font-playfair transition-colors duration-300",
      icon: "[&>svg]:size-7 transition-colors duration-300",
    },
  },
  button: {
    container: "flex items-center gap-3 px-5 py-3 rounded-md transition-all duration-300",
    text: "text-2xl font-medium font-playfair",
    icon: "[&>svg]:size-12",
    active: "bg-primary text-white",
    hover:
      "hover:bg-primary/80 hover:scale-105 hover:shadow-lg transition-all border border-transparent hover:border-white/50",
    inactive: "bg-primary text-white",
    mobile: {
      container: "flex items-center justify-start gap-1 px-3 py-1.5 rounded-md transition-colors",
      text: "text-xl font-medium font-playfair",
      icon: "[&>svg]:size-7",
    },
  },
};

// Configuración para posición
export const positionStyles: Record<NavItemPosition, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

// Configuración para dispositivos
export const deviceVisibility: Record<NavItemDevice, string> = {
  desktop: "hidden md:flex",
  mobile: "flex md:hidden",
  all: "flex",
};

// Colores del header
export const headerColors = {
  background: "bg-transparent backdrop-blur-sm",
  text: "text-white",
  mobileMenuBackground: "bg-background/70 backdrop-blur-md",
  dropdown: {
    background: "bg-background/70 backdrop-blur-md",
    text: "text-white",
    activeText: "text-primary",
    hoverText: "hover:text-primary",
  },
};

// Función helper para obtener estilos
export const getNavItemStyles = (
  type: NavItemType = "link",
  isActive: boolean = false,
  position: NavItemPosition = "left",
  device: NavItemDevice = "all",
  isMobile: boolean = false
) => {
  const config = navItemStyleConfig[type];
  const positionStyle = positionStyles[position];
  const deviceStyle = deviceVisibility[device];

  const container = isMobile && config.mobile?.container ? config.mobile.container : config.container;
  const text = isMobile && config.mobile?.text ? config.mobile.text : config.text;
  const icon = isMobile && config.mobile?.icon ? config.mobile.icon : config.icon;

  return {
    container: `${container} ${positionStyle} ${deviceStyle} ${isActive ? config.active : config.inactive}`,
    text,
    icon,
    hover: config.hover,
  };
};
