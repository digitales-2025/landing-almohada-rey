import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LogoAlmohadaReyMobile } from "@/assets/icons/LogoAlmohadaReyMobile";
import { navigationConfig } from "@/components/layout/constants/navigation";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { items } = navigationConfig;

  // Organiza los elementos de navegación por posición
  const leftItems = items.filter((item) => item.position === "left" || !item.position);
  const rightItems = items.filter((item) => item.position === "right");

  // Excluye el botón de reserva para mostrarlo separado al final
  const reservaButton = rightItems.find((item) => item.id === "reservations");
  const rightItemsWithoutReserva = rightItems.filter((item) => item.id !== "reservations");

  return (
    <SidebarProvider>
      <Sidebar className="sidebar" {...props}>
        <SidebarContent>
          {/* Logo */}
          <div className="flex items-center justify-center py-6">
            <Link href="/">
              <LogoAlmohadaReyMobile width={160} height={55} color="white" />
            </Link>
          </div>

          {/* Navegación Principal - Elementos de la izquierda */}
          <SidebarGroup>
            <SidebarGroupLabel className="sidebar-group-label">Navegar</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {leftItems.map(
                  (item) =>
                    item.type !== "logo" && (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton className="sidebar-menu-button" asChild isActive={pathname === item.href}>
                          <Link href={item.href} className="font-cursive text-xl flex items-center gap-2">
                            {item.icon && <item.icon size={20} />}
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                        {item.children?.length ? (
                          <SidebarMenuSub>
                            {item.children.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.id}>
                                <SidebarMenuSubButton
                                  className="sidebar-menu-button"
                                  asChild
                                  isActive={pathname === subItem.href}
                                >
                                  <Link href={subItem.href} className="font-cursive">
                                    {subItem.title}
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        ) : null}
                      </SidebarMenuItem>
                    )
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Navegación Secundaria - Elementos de la derecha */}
          <SidebarGroup>
            <SidebarGroupLabel className="sidebar-group-label">Explorar</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {rightItemsWithoutReserva.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton className="sidebar-menu-button" asChild isActive={pathname === item.href}>
                      <Link href={item.href} className="font-cursive text-xl flex items-center gap-2">
                        {item.icon && <item.icon size={20} />}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                    {item.children?.length ? (
                      <SidebarMenuSub>
                        {item.children.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.id}>
                            <SidebarMenuSubButton
                              className="sidebar-menu-button"
                              asChild
                              isActive={pathname === subItem.href}
                            >
                              <Link href={subItem.href} className="font-cursive">
                                {subItem.title}
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    ) : null}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Botón de Reserva */}
          {reservaButton && (
            <div className="mt-8 px-6">
              <Button asChild variant="default" className="w-full btn-reserva py-5 flex items-center justify-center">
                <Link href={reservaButton.href} className="font-cursive text-xl flex items-center gap-2">
                  {reservaButton.icon && <reservaButton.icon size={22} />}
                  {reservaButton.title}
                </Link>
              </Button>
            </div>
          )}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
