"use client";

import Link from "next/link";
import { Facebook, Instagram, MessageCircle } from "lucide-react";

import { LogoAlmohadaRey } from "@/assets/icons/LogoAlmohadaRey";

export default function Footer() {
  return (
    <footer className="bg-[#1e2122] text-white pt-10 pb-8 font-poppins">
      <div className="container mx-auto px-4">
        {/* Top section with logo and social icons */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <LogoAlmohadaRey width={220} height={75} className="text-white [&_path]:fill-white" />
          </div>

          {/* Social icons */}
          <div className="flex space-x-5">
            <Link
              href="#"
              className="bg-[#323637] hover:bg-primary/30 transition-colors rounded-full p-3 flex items-center justify-center w-11 h-11"
            >
              <Facebook className="text-white w-5 h-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="bg-[#323637] hover:bg-primary/30 transition-colors rounded-full p-3 flex items-center justify-center w-11 h-11"
            >
              <Instagram className="text-white w-5 h-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="#"
              className="bg-[#323637] hover:bg-primary/30 transition-colors rounded-full p-3 flex items-center justify-center w-11 h-11"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M9 12.2L11.2 14.4L14.4 9.8" />
                <path d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10z" />
                <path d="M16.8 7.6v.1" />
                <path d="M20.8 10.3v.1" />
                <path d="M19.2 4.8v.1" />
                <path d="M15.6 20.8v.1" />
                <path d="M8.4 19.2v.1" />
                <path d="M4.8 13.2v.1" />
                <path d="M7.6 7.6v.1" />
              </svg>
              <span className="sr-only">TikTok</span>
            </Link>
            <Link
              href="#"
              className="bg-[#323637] hover:bg-primary/30 transition-colors rounded-full p-3 flex items-center justify-center w-11 h-11"
            >
              <MessageCircle className="text-white w-5 h-5" />
              <span className="sr-only">WhatsApp</span>
            </Link>
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

        {/* Divider */}
        <div className="border-t border-[#323637] my-6"></div>

        {/* Bottom section with copyright and links */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>Copyright © {new Date().getFullYear()} Almohada del Rey. Todos los derechos reservados.</p>
          <div className="mt-4 md:mt-0 flex gap-4">
            <Link href="/politica-de-privacidad" className="hover:text-primary transition-colors">
              Política de privacidad
            </Link>
            <Link href="/terminos-y-condiciones" className="hover:text-primary transition-colors">
              Términos y condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
