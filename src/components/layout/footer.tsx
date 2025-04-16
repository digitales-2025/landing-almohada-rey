import Link from "next/link";
import { ChevronsUpDown } from "lucide-react";

import { Logo } from "@/components/layout/logo";

// Enlaces personalizados para Almohada Rey
const links = [
  {
    group: "Legal",
    items: [
      {
        title: "Política de privacidad",
        href: "/politica-de-privacidad",
      },
      {
        title: "Términos y condiciones",
        href: "/terminos-y-condiciones",
      },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-[#1e2122] text-white pt-20 pb-8 font-poppins">
      <div className="mx-auto max-w-5xl px-6">
        {/* Top section with logo and social icons */}
        <div className="mb-8 border-b border-[#323637] md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pb-8">
            {/* Logo con las versiones responsivas */}
            <Link href="/" aria-label="go home" className="mb-4 md:mb-0">
              <Logo className="[&_svg]:text-white [&_svg_path]:fill-white" />
            </Link>

            {/* Social icons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="bg-[#323637] hover:bg-[#c9a55c]/30 transition-colors rounded-full p-2 flex items-center justify-center w-10 h-10"
              >
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                  ></path>
                </svg>
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="bg-[#323637] hover:bg-[#c9a55c]/30 transition-colors rounded-full p-2 flex items-center justify-center w-10 h-10"
              >
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
                  ></path>
                </svg>
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="bg-[#323637] hover:bg-[#c9a55c]/30 transition-colors rounded-full p-2 flex items-center justify-center w-10 h-10"
              >
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
                  ></path>
                </svg>
              </Link>
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="bg-[#323637] hover:bg-[#c9a55c]/30 transition-colors rounded-full p-2 flex items-center justify-center w-10 h-10"
              >
                <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07c0 1.22.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle section with address and phone */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-8">
          <div>
            <h3 className="text-[#c9a55c] text-sm font-medium mb-2">Dirección</h3>
            <p className="text-xl md:text-2xl font-medium">Calle Mollendo N° 37 - Urb. Municipal</p>
          </div>
          <div className="md:text-right">
            <h3 className="text-[#c9a55c] text-sm font-medium mb-2">Teléfono</h3>
            <p className="text-xl md:text-2xl font-medium">+51 958 959 958</p>
          </div>
        </div>

        {/* Links section */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-8">
          {links.map((link, index) => (
            <div key={index} className="space-y-4 text-sm">
              <span className="block font-medium text-[#c9a55c]">{link.group}</span>
              {link.items.map((item, index) => (
                <Link key={index} href={item.href} className="text-gray-300 hover:text-[#c9a55c] block duration-150">
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-[#323637] my-6"></div>

        {/* Bottom section with copyright and language selector */}
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <small className="order-last block text-center text-sm text-gray-400 md:order-first">
            © {new Date().getFullYear()} Almohada del Rey. Todos los derechos reservados.
          </small>
          <form action="">
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
          </form>
        </div>
      </div>
    </footer>
  );
}
