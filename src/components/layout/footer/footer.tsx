import { FooterLogo } from '@/components/layout/logo';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../../ui/button';
import { Separator } from '../../ui/separator';
import FacebookLink from './social-media/facebook';
import InstagramLink from './social-media/instagram';
import TiktokLink from './social-media/tiktok';
import WhatsAppLinK from './social-media/whatsapp';

// Enlaces personalizados para Almohada Rey
const links = [
    {
        group: 'Legal',
        items: [
            {
                title: 'Política de privacidad',
                href: '/politica-de-privacidad',
            },
            {
                title: 'Términos y condiciones',
                href: '/terminos-y-condiciones',
            },
        ],
    },
];

export default function FooterSection() {
    const socialMediaClassnames =
        'bg-primary-foreground/20 hover:bg-primary-foreground text-primary-foreground hover:text-secondary transition-colors duration-100 rounded-full p-2 flex items-center justify-center size-10 lg:size-16';
    return (
        <footer className="bg-secondary text-primary-foreground pt-20 pb-8 font-serif">
            <div className="mx-auto max-w-[1473px] px-6 lg:px-3 xl:px-0">
                {/* Top section with logo and social icons */}
                <div className="mb-8 border-b border-secondary md:mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
                        {/* Logo con las versiones responsivas */}
                        <Link
                            href="/"
                            aria-label="go home"
                            className="mb-4 md:mb-0"
                        >
                            <FooterLogo className="text-primary-foreground" />
                        </Link>

                        {/* Social icons */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <FacebookLink
                                svgClassName={cn(socialMediaClassnames)}
                            ></FacebookLink>
                            <InstagramLink
                                svgClassName={cn(socialMediaClassnames)}
                            ></InstagramLink>
                            <TiktokLink
                                svgClassName={cn(socialMediaClassnames)}
                            ></TiktokLink>
                            <WhatsAppLinK
                                svgClassName={cn(socialMediaClassnames)}
                            ></WhatsAppLinK>
                            {/* <Link
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                                className="bg-[#323637] hover:bg-[#c9a55c]/30 transition-colors rounded-full p-2 flex items-center justify-center w-10 h-10"
                            >
                                <svg
                                    className="size-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="currentColor"
                                        d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                                    ></path>
                                </svg>
                            </Link> */}
                        </div>
                    </div>
                </div>

                {/* Middle section with address and phone */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
                    <div>
                        <h3 className="text-primary text-sm lg:text-h8 font-medium mb-2 font-sans">
                            Dirección
                        </h3>
                        <p className="text-h7 lg:text-h5 xl:text-h4">
                            Calle Mollendo N° 37 - Urb. Municipal
                        </p>
                    </div>
                    <div className="md:text-left">
                        <h3 className="text-primary text-sm lg:text-h8 font-medium mb-2 font-sans">
                            Teléfono
                        </h3>
                        <p className="text-h7 lg:text-h5 xl:text-h4">
                            +51 958 959 958
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <Separator></Separator>
                    <div className="flex flex-col gap-2 justify-between lg:flex-row">
                        <div className="flex flex-col items-start gap-2 w-full font-sans">
                            {/* Bottom section with copyright and language selector */}
                            <div className="flex flex-wrap items-end justify-between gap-6">
                                <small className="order-last block text-center text-sm md:order-first text-primary-foreground/60">
                                    © {new Date().getFullYear()} Almohada del
                                    Rey. Todos los derechos reservados.
                                </small>
                                {/* <form action="">
                                    <div className="relative">
                                        <ChevronsUpDown
                                            className="pointer-events-none absolute inset-y-0 right-2 my-auto opacity-75"
                                            size="0.75rem"
                                        />
                                        <select
                                            className="border-[#323637] bg-[#1e2122] text-white h-9 w-full min-w-32 appearance-none rounded-md border px-3 py-1 text-base outline-none"
                                            name="language"
                                        >
                                            <option value="1">Español</option>
                                            <option value="2">English</option>
                                        </select>
                                    </div>
                                </form> */}
                            </div>
                        </div>
                        {/* Links section */}
                        <div className="flex flex-col gap-2 lg:flex-row lg:justify-end lg:items-center">
                            {links[0].items.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.href}
                                    className={cn(
                                        buttonVariants({ variant: 'link' }),
                                        'text-primary-foreground/60 hover:text-primary inline-block duration-150 p-0 font-sans max-h-fit text-center sm:text-start'
                                    )}
                                >
                                    <span className="w-full">{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
