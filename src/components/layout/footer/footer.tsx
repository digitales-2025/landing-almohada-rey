import { useTranslations } from 'next-intl';

import { FooterLogo } from '@/components/layout/logo';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../../ui/button';
import { Separator } from '../../ui/separator';
import { basePageHorizontalPadding } from '../section/base-section';
import FacebookLink from './social-media/facebook';
import InstagramLink from './social-media/instagram';
import TiktokLink from './social-media/tiktok';
import WhatsAppLinK from './social-media/whatsapp';

export default function FooterSection() {
    const t = useTranslations('Footer');
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    const whatsappBaseUrl =
        process.env.NEXT_PUBLIC_BASE_WHATSAPP_URL ||
        'https://api.whatsapp.com/send';
    const whatsappMessage = encodeURIComponent(
        'Hola, quiero más información sobre La Almohada del Rey.'
    );

    // Enlaces personalizados para Almohada Rey
    const links = [
        {
            group: 'Legal',
            items: [
                {
                    title: t('legalSection.privacyPolicy'),
                    href: '/politica-de-privacidad',
                },
                {
                    title: t('legalSection.termsAndConditions'),
                    href: '/terminos-y-condiciones',
                },
            ],
        },
    ];

    const socialMediaLinks = {
        facebook: 'https://www.facebook.com/share/16eG91bWNJ/',
        instagram:
            'https://www.instagram.com/hlaalmohadadelrey?igsh=MTVlMzE3cDQ4YmVrcA==',
        tiktok: 'https://www.tiktok.com/@hotellaalmohadadelrey?_t=ZS-8yXmu0tEuDE&_r=1',
        whatsapp: `${whatsappBaseUrl}?phone=${whatsappNumber}&text=${whatsappMessage}`,
    };

    const socialMediaClassnames =
        'bg-primary-foreground/20 hover:bg-primary-foreground text-primary-foreground hover:text-secondary transition-colors duration-100 rounded-full p-2 flex items-center justify-center size-10 lg:size-16';
    return (
        <footer className="bg-secondary text-primary-foreground pt-20 pb-8 font-serif">
            <div className={cn('w-full', basePageHorizontalPadding)}>
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
                                href={socialMediaLinks.facebook}
                            ></FacebookLink>
                            <InstagramLink
                                svgClassName={cn(socialMediaClassnames)}
                                href={socialMediaLinks.instagram}
                            ></InstagramLink>
                            <TiktokLink
                                svgClassName={cn(socialMediaClassnames)}
                                href={socialMediaLinks.tiktok}
                            ></TiktokLink>
                            <WhatsAppLinK
                                svgClassName={cn(socialMediaClassnames)}
                                href={socialMediaLinks.whatsapp}
                            ></WhatsAppLinK>
                        </div>
                    </div>
                </div>

                {/* Middle section with address and phone */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
                    <div>
                        <h3 className="text-primary text-sm lg:text-h8 font-medium mb-2 font-sans">
                            {t('addressSection.title')}
                        </h3>
                        <p className="text-h7 lg:text-h5 xl:text-h4">
                            {t('addressSection.address')}
                        </p>
                    </div>
                    <div className="md:text-left">
                        <h3 className="text-primary text-sm lg:text-h8 font-medium mb-2 font-sans">
                            {t('phoneSection.title')}
                        </h3>
                        <p className="text-h7 lg:text-h5 xl:text-h4">
                            {t('phoneSection.phone')}
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
                                    {t('copyrightSection.description', {
                                        year: new Date()
                                            .getFullYear()
                                            .toString(),
                                    })}
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
