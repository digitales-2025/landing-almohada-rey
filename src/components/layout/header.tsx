'use client';

import React from 'react';
import { MapPin, Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button, buttonVariants } from '@/components/ui/button';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { Link } from '@/i18n/navigation';
import { DefaultRoutes, defaultRoutes } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import LocaleSwitcher from '../i18n/locale-switch/locale-switcher';
import ExternalLink from '../i18n/navigation/ExternalLink';
import { Logo } from './logo';

type NavItem = {
    name: string;
    href: string;
    key: DefaultRoutes;
};

// Nuevas opciones de menú divididas en dos grupos
const homeMenuItems: NavItem = {
    name: 'Inicio',
    href: defaultRoutes.home,
    key: 'home',
};

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
const allMenuItems = [homeMenuItems, ...leftMenuItems, ...rightMenuItems];

export const NavMenu = () => {
    const [menuState, setMenuState] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);
    const scrollDir = useScrollDirection();
    const t = useTranslations('Navigation');

    const layoutClassnames = cn(
        'mx-auto max-w-[1473px] lg:px-3 xl:px-0 text-primary-foreground transition-all duration-300'
    );

    const scrolledClassname = cn(
        isScrolled &&
            'mx-auto transition-all duration-300 bg-background/50 rounded-lg border backdrop-blur-lg lg:rounded-none lg:border-none'
    );

    const textCommonClassnames = cn(
        'text-primary-foreground hover:font-base duration-150 transition-all',
        isScrolled && 'text-secondary hover:text-accent-foreground'
    );

    const borderScrolledClassname = cn(
        isScrolled && 'border-b-[1px] border-b-secondary'
    );

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className={cn(
                    'fixed z-20 w-full transition-transform duration-300',
                    {
                        'transform -translate-y-full':
                            scrollDir === 'down' && !menuState && isScrolled,
                        'transform translate-y-0':
                            scrollDir === 'up' || menuState || !isScrolled,
                    }
                )}
            >
                <div>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 pb-3 lg:pb-4">
                        {/* Móvil: Logo a la izquierda y botón menú a la derecha */}
                        <div className="px-2 w-full mt-2 lg:mt-0">
                            <div
                                className={cn(
                                    layoutClassnames,
                                    'flex w-full justify-between lg:w-auto lg:hidden px-4 lg:px-12',
                                    scrolledClassname,
                                    'py-1'
                                )}
                            >
                                <Link
                                    href="/"
                                    aria-label="home"
                                    className={cn(
                                        'flex items-center space-x-2',
                                        textCommonClassnames
                                    )}
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
                                    <Menu
                                        className={cn(
                                            'in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200',
                                            isScrolled && 'text-secondary'
                                        )}
                                    />
                                    <X
                                        className={cn(
                                            'in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200',
                                            isScrolled && 'text-secondary'
                                        )}
                                    />
                                </button>
                            </div>
                        </div>

                        {/* Desktop: Estructura de tres columnas */}
                        <div
                            className={cn(
                                'hidden w-full items-center lg:flex lg:flex-col lg:gap-2',
                                scrolledClassname
                            )}
                        >
                            <div
                                className={cn(
                                    'border-b-primary-foreground border-b-[1px] w-full',
                                    borderScrolledClassname
                                )}
                            >
                                <div
                                    className={cn(
                                        'relative flex w-full items-center justify-between py-7',
                                        layoutClassnames
                                    )}
                                >
                                    <ExternalLink
                                        className={cn(
                                            textCommonClassnames,
                                            'flex items-center space-x-2 text-primary relative z-10 font-light'
                                        )}
                                        href="https://maps.app.goo.gl/tTyMegMm8GqSAyBk9"
                                    >
                                        <MapPin
                                            className={cn(
                                                textCommonClassnames,
                                                'size-5 stroke-1'
                                            )}
                                        ></MapPin>
                                        <span
                                            className={cn(
                                                textCommonClassnames,
                                                'text-sm hover:underline'
                                            )}
                                        >
                                            {t('headquarters.address')}
                                        </span>
                                    </ExternalLink>
                                    <div className="flex items-center space-x-2 absolute inset-0 w-full">
                                        <Link
                                            href="/"
                                            aria-label="home"
                                            className={cn(
                                                'block mx-auto',
                                                textCommonClassnames,
                                                'hover:text-primary'
                                            )}
                                        >
                                            <Logo />
                                        </Link>
                                    </div>
                                    <Button
                                        asChild
                                        size="sm"
                                        className="relative z-10"
                                    >
                                        <Link
                                            href={t('reservationButton.link')}
                                        >
                                            <span>
                                                {t('reservationButton.label')}
                                            </span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>

                            <div
                                className={cn(
                                    'border-b-[1px] border-b-primary-foreground w-full',
                                    isScrolled && 'border-none'
                                )}
                            >
                                <div
                                    className={cn(
                                        'flex items-center justify-center space-x-2 pb-2 pt-1',
                                        layoutClassnames
                                    )}
                                >
                                    <ul className="flex gap-8 text-base text-foreground">
                                        {allMenuItems.map(item => (
                                            <li key={item.key}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        buttonVariants({
                                                            variant: 'link',
                                                            size: 'sm',
                                                        }),
                                                        textCommonClassnames,
                                                        '!font-light'
                                                    )}
                                                >
                                                    <span>{t(item.key)}</span>
                                                </Link>
                                            </li>
                                        ))}
                                        {/* <ModeToggle /> */}
                                        <LocaleSwitcher
                                            className={cn(
                                                textCommonClassnames,
                                                'font-light'
                                            )}
                                        ></LocaleSwitcher>
                                    </ul>
                                </div>
                            </div>

                            {/* <div className="flex items-center gap-3">
                                <ModeToggle />
                            </div> */}
                        </div>

                        {/* Menú móvil desplegable */}
                        <div className="px-2 w-full">
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
                                    {/*   <ModeToggle /> */}
                                    <LocaleSwitcher></LocaleSwitcher>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
