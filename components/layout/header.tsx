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
    const isMobile = deviceType === "mobile";
    const styles = getNavItemStyles(
      item.type || "link",
      active,
      item.position || "left",
      item.device || "all",
      isMobile
    );

    const isDropdownOpen = openDropdowns.includes(item.id);
    const Icon = item.icon;

    // Para dropdowns
    if (item.children && item.type === "dropdown") {
      return (
        <div key={item.id} className="relative">
          <button onClick={() => toggleDropdown(item.id)} className={`${styles.container} ${headerColors.text}`}>
            {Icon && <Icon className={styles.icon} />}
            <span className={`${styles.text} ${headerColors.text}`}>{item.title}</span>
            <ChevronDown
              size={isMobile ? 20 : 26}
              className={`${headerColors.text} ${isDropdownOpen ? "rotate-180 transition-transform" : "transition-transform"}`}
            />
          </button>

          {isDropdownOpen && (
            <div
              className={clsx(
                `absolute left-0 mt-1 w-48 ${headerColors.dropdown.background} shadow-lg rounded-md z-10`,
                {
                  "static w-full": isMobile,
                }
              )}
            >
              <div className="py-1">
                {item.children.map((child) => (
                  <Link
                    key={child.id}
                    href={child.href}
                    className={clsx(
                      `block px-4 py-3 font-medium ${isMobile ? "text-xl" : "text-2xl"}`,
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
          className={`${styles.container} ${
            item.type === "button"
              ? `btn-reserva ${styles.hover} transition-all duration-500`
              : `nav-link ${headerColors.text} ${styles.hover} transition-all duration-500`
          }`}
        >
          {Icon && <Icon className={`${styles.icon} transition-all duration-500`} />}
          <span
            className={`${styles.text} ${item.type !== "button" ? headerColors.text : ""} transition-all duration-500`}
          >
            {item.title}
          </span>
        </Button>
      </Link>
    );
  }

  // Función para renderizar el logo según el tipo
  function renderLogo(deviceType: "desktop" | "mobile" = "desktop") {
    const { logo } = navigationConfig;
    const isMobile = deviceType === "mobile";

    if (logo.type === "component") {
      const LogoComponent = isMobile && logo.mobile ? logo.mobile : logo.desktop;

      if (LogoComponent) {
        const width = isMobile ? logo.mobileWidth || logo.width || 140 : logo.width || 180;
        const height = isMobile ? logo.mobileHeight || logo.height || 45 : logo.height || 60;
        return <LogoComponent width={width} height={height} color="white" style={{ color: "white" }} />;
      }
    }

    if (logo.type === "image" || logo.type === "both") {
      return (
        <>
          {logo.imageUrl && (
            <Image
              src={logo.imageUrl}
              alt={logo.alt || "Logo"}
              width={isMobile ? logo.mobileWidth || logo.width || 40 : logo.width || 40}
              height={isMobile ? logo.mobileHeight || logo.height || 40 : logo.height || 40}
              className="w-auto h-auto"
            />
          )}
          {logo.type === "both" && <span className="text-white font-semibold">{logo.text}</span>}
        </>
      );
    }

    if (logo.type === "text") {
      return <span className="text-white font-semibold">{logo.text}</span>;
    }

    return null;
  }

  return (
    <header
      className={clsx(`fixed top-0 left-0 w-full z-50 ${headerColors.background} transition-all duration-300`, {
        "transform -translate-y-full": scrollDir === "down" && !mobileMenuOpen && navigationConfig.hideOnScroll,
        "transform translate-y-0": scrollDir === "up" || mobileMenuOpen || !navigationConfig.hideOnScroll,
        "py-6 px-8 md:pt-14 md:pb-10": true,
        "sm:py-3 sm:px-1": true,
      })}
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
          <nav className="flex items-center space-x-8 mx-8 flex-1 justify-end">
            {navigationConfig.items
              .filter(
                (item) =>
                  (item.position === "left" || !item.position) && (item.device === "desktop" || item.device === "all")
              )
              .map((item) => renderNavItem(item, "desktop"))}
          </nav>

          {/* Center Logo (if enabled) */}
          {navigationConfig.centerLogo && (
            <Link
              href="/"
              className="flex items-center justify-center mx-14 my-2 transform scale-140 lg:scale-140 md:scale-125 sm:scale-100 btn-reserva rounded-md overflow-hidden logo-container"
            >
              {renderLogo("desktop")}
            </Link>
          )}

          {/* Right Items */}
          <nav className="flex items-center space-x-8 mx-8 flex-1 justify-start">
            {navigationConfig.items
              .filter((item) => item.position === "right" && (item.device === "desktop" || item.device === "all"))
              .map((item) => renderNavItem(item, "desktop"))}
          </nav>
        </div>

        {/* Mobile Logo (if center enabled) */}
        {navigationConfig.centerLogo && mobileMenuOpen === false && (
          <div className="flex-1 md:hidden">
            <Link
              href="/"
              className="flex items-center justify-start ml-0 my-1 btn-reserva rounded-md overflow-hidden logo-container"
            >
              {renderLogo("mobile")}
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden h-8 w-8 p-0"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className={`${headerColors.text} h-5 w-5`} />
          ) : (
            <Menu className={`${headerColors.text} h-5 w-5`} />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className={`md:hidden flex flex-col py-3 px-0.5 space-y-2 ${headerColors.mobileMenuBackground}`}>
          {navigationConfig.items
            .filter((item) => item.device === "mobile" || item.device === "all")
            .map((item) => (
              <div key={item.id} className="flex items-center justify-start pl-0.5">
                {renderNavItem(item, "mobile")}
                {item.type === "logo" && <div className="flex items-center justify-start">{renderLogo("mobile")}</div>}
              </div>
            ))}
        </nav>
      )}
    </header>
  );
}
