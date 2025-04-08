"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { ChevronDown, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useScrollDirection } from "@/lib/hooks/use-scroll-direction";
import { getNavItemStyles, headerColors } from "./config/nav-config";
import { navigationConfig } from "./constants/navigation";
import { NavItem } from "./types/nav-items";

export default function Header() {
  const scrollDir = useScrollDirection();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  // Verificar si un ítem está activo
  const isActive = (item: NavItem) => {
    return pathname === item.href || item.children?.some((child) => pathname === child.href);
  };

  // Manejar dropdowns
  const toggleDropdown = (itemId: string) => {
    setOpenDropdowns((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Función para renderizar un ítem de navegación
  function renderNavItem(item: NavItem, deviceType: "desktop" | "mobile") {
    const active = isActive(item);
    const styles = getNavItemStyles(item.type || "link", active, item.position || "left", item.device || "all");

    const isDropdownOpen = openDropdowns.includes(item.id);
    const Icon = item.icon;

    // Para dropdowns
    if (item.children && item.type === "dropdown") {
      return (
        <div key={item.id} className="relative">
          <button onClick={() => toggleDropdown(item.id)} className={`${styles.container} ${headerColors.text}`}>
            {Icon && <Icon className={`${styles.icon} ${headerColors.text}`} />}
            <span className={`${styles.text} ${headerColors.text}`}>{item.title}</span>
            <ChevronDown
              size={26}
              className={`${headerColors.text} ${isDropdownOpen ? "rotate-180 transition-transform" : "transition-transform"}`}
            />
          </button>

          {isDropdownOpen && (
            <div
              className={clsx(
                `absolute left-0 mt-1 w-48 ${headerColors.dropdown.background} shadow-lg rounded-md z-10`,
                {
                  "static w-full": deviceType === "mobile",
                }
              )}
            >
              <div className="py-1">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    className={clsx(
                      "block px-4 py-3 text-2xl font-cursive",
                      pathname === child.href
                        ? headerColors.dropdown.activeText
                        : `${headerColors.dropdown.text} ${headerColors.dropdown.hoverText}`
                    )}
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    }

    // Para enlaces y botones normales
    return (
      <Link key={item.id} href={item.href}>
        <Button
          variant={item.type === "button" ? "default" : "ghost"}
          className={`${styles.container} ${item.type !== "button" ? `${headerColors.text} ${styles.hover}` : ""}`}
        >
          {Icon && <Icon className={`${styles.icon} ${item.type !== "button" ? headerColors.text : ""}`} />}
          <span className={`${styles.text} ${item.type !== "button" ? headerColors.text : ""}`}>{item.title}</span>
        </Button>
      </Link>
    );
  }

  // Función para renderizar el logo según el tipo
  function renderLogo(deviceType: "desktop" | "mobile" = "desktop") {
    const { logo } = navigationConfig;

    if (logo.type === "component") {
      const LogoComponent = deviceType === "mobile" && logo.mobile ? logo.mobile : logo.desktop;

      if (LogoComponent) {
        return <LogoComponent width={logo.width} height={logo.height} />;
      }
    }

    if (logo.type === "image" || logo.type === "both") {
      return (
        <>
          {logo.imageUrl && (
            <Image src={logo.imageUrl} alt={logo.alt || "Logo"} width={logo.width || 40} height={logo.height || 40} />
          )}
          {logo.type === "both" && <span className={`text-xl font-semibold ${headerColors.text}`}>{logo.text}</span>}
        </>
      );
    }

    if (logo.type === "text") {
      return <span className={`text-xl font-semibold ${headerColors.text}`}>{logo.text}</span>;
    }

    return null;
  }

  return (
    <header
      className={clsx(
        `fixed top-0 left-0 w-full z-50 ${headerColors.background} py-8 px-10 transition-all duration-300`,
        {
          "transform -translate-y-full": scrollDir === "down" && !mobileMenuOpen && navigationConfig.hideOnScroll,
          "transform translate-y-0": scrollDir === "up" || mobileMenuOpen || !navigationConfig.hideOnScroll,
        }
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        {!navigationConfig.centerLogo && (
          /* Logo estándar (si no está centrado) */
          <Link href="/" className="flex items-center gap-2">
            {renderLogo()}
          </Link>
        )}

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between flex-1">
          {/* Left Items */}
          <nav className="flex items-center space-x-7 mx-7 flex-1 justify-end">
            {navigationConfig.items
              .filter(
                (item) =>
                  (item.position === "left" || !item.position) && (item.device === "desktop" || item.device === "all")
              )
              .map((item) => renderNavItem(item, "desktop"))}
          </nav>

          {/* Center Logo (if enabled) */}
          {navigationConfig.centerLogo && (
            <Link href="/" className="flex items-center justify-center mx-12 transform scale-140">
              {renderLogo("desktop")}
            </Link>
          )}

          {/* Right Items */}
          <nav className="flex items-center space-x-7 mx-7 flex-1 justify-start">
            {navigationConfig.items
              .filter((item) => item.position === "right" && (item.device === "desktop" || item.device === "all"))
              .map((item) => renderNavItem(item, "desktop"))}
          </nav>
        </div>

        {/* Mobile Logo (if center enabled) */}
        {navigationConfig.centerLogo && mobileMenuOpen === false && (
          <Link href="/" className="md:hidden flex items-center justify-center scale-125">
            {renderLogo("mobile")}
          </Link>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-16 w-16"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={`${headerColors.text} h-12 w-12`} />
          ) : (
            <Menu className={`${headerColors.text} h-12 w-12`} />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className={`md:hidden flex flex-col py-5 px-5 space-y-3 ${headerColors.mobileMenuBackground}`}>
          {navigationConfig.items
            .filter((item) => item.device === "mobile" || item.device === "all")
            .map((item) => renderNavItem(item, "mobile"))}
        </nav>
      )}
    </header>
  );
}
