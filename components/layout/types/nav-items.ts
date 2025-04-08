import { ComponentType } from "react";
import { LucideIcon } from "lucide-react";

// Tipos básicos
export type NavItemType = "link" | "dropdown" | "button" | "logo";
export type NavItemPosition = "left" | "center" | "right";
export type NavItemDevice = "desktop" | "mobile" | "all";

// Tipo para el logo
export type LogoConfig = {
  type: "text" | "image" | "both" | "component";
  text?: string;
  imageUrl?: string;
  desktop?: ComponentType<any>;
  mobile?: ComponentType<any>;
  width?: number;
  height?: number;
  alt?: string;
};

// Tipo para un ítem de navegación individual
export type NavItem = {
  id: string;
  title: string;
  href: string;
  type?: NavItemType;
  icon?: LucideIcon;
  position?: NavItemPosition;
  device?: NavItemDevice;
  isActive?: boolean;
  isHighlighted?: boolean;
  children?: NavItem[];
};

// Tipo para la configuración completa de navegación
export type NavigationConfig = {
  logo: LogoConfig;
  items: NavItem[];
  mobileBreakpoint: string;
  showOnScroll?: boolean;
  hideOnScroll?: boolean;
  sticky?: boolean;
  centerLogo?: boolean;
};
