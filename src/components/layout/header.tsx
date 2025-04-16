'use client';

import React from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { DefaultRoutes, defaultRoutes } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import LocaleSwitcher from '../i18n/locale-switch/locale-switcher';
import { ModeToggle } from '../mode-toggle';
import { Logo } from './logo';

// "home": "Inicio",
// "experiences": "Experiencias",
// "gallery": "Galería",
// "rooms": "Habitaciones",
// "travelers": "Viajeros"

type NavItem = {
    name: string;
    href: string;
    key: DefaultRoutes;
};

// Nuevas opciones de menú divididas en dos grupos
const leftMenuItems: NavItem[] = [
    { name: 'Habitaciones', href: defaultRoutes.rooms, key: 'rooms' },
    { name: 'Galería', href: defaultRoutes.gallery, key: 'gallery' },
];

const rightMenuItems: NavItem[] = [
    {
        name: 'Experiencias',
        href: defaultRoutes.experiences,
        key: 'experiences',
    },
    { name: 'Viajes', href: defaultRoutes.travelers, key: 'travelers' },
];

// Para el menú móvil, combinamos ambos arrays
const allMenuItems = [...leftMenuItems, ...rightMenuItems];

export const NavMenu = () => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const t = useTranslations('Navigation');

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className="fixed z-20 w-full px-2"
            >
                <div
                    className={cn(
                        'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                        isScrolled &&
                            'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5'
                    )}
                >
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        {/* Móvil: Logo a la izquierda y botón menú a la derecha */}
                        <div className="flex w-full justify-between lg:w-auto lg:hidden">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2"
                            >
                                <Logo />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={
                                    menuState == true
                                        ? 'Close Menu'
                                        : 'Open Menu'
                                }
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        {/* Desktop: Estructura de tres columnas */}
                        <div className="hidden w-full items-center justify-between lg:flex">
                            {/* Columna izquierda - Menú izquierdo */}
                            <div className="flex items-center">
                                <ul className="flex gap-8 text-sm">
                                    {leftMenuItems.map(item => (
                                        <li key={item.key}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                            >
                                                <span>{t(item.key)}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Columna central - Logo más grande */}
                            <div className="flex justify-center px-4">
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className="flex items-center space-x-2 scale-150 transform"
                                >
                                    <Logo />
                                </Link>
                            </div>

                            {/* Columna derecha - Menú derecho + botón */}
                            <div className="flex items-center gap-8">
                                <ul className="flex gap-8 text-sm">
                                    {rightMenuItems.map(item => (
                                        <li key={item.key}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                            >
                                                <span>{t(item.key)}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex items-center gap-3">
                                    <Button asChild size="sm">
                                        <Link href="#">
                                            <span>Reservar</span>
                                        </Link>
                                    </Button>
                                    <ModeToggle />
                                </div>
                            </div>
                        </div>

                        {/* Menú móvil desplegable */}
                        <div className="bg-background in-data-[state=active]:block in-data-[state=active]:animate-fade lg:hidden mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 dark:shadow-none in-data-[state=inactive]:animate-out ">
                            <div>
                                <ul className="space-y-6 text-base">
                                    {allMenuItems.map(item => (
                                        <li key={item.key}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150"
                                            >
                                                <span>{t(item.key)}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button asChild size="sm">
                                    <Link href="#">
                                        <span>Reservar</span>
                                    </Link>
                                </Button>
                                <ModeToggle />
                                <LocaleSwitcher></LocaleSwitcher>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
