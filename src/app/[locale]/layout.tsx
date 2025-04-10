import type { NextLayoutIntlayer } from "next-intlayer";
import { getHTMLTextDir } from "intlayer";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
export { generateStaticParams } from "next-intlayer";
import FooterSection from "@/components/layout/footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const LocaleLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;
  return (
    <html lang={locale} dir={getHTMLTextDir(locale)} suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <FooterSection></FooterSection>
    </html>
  );
};

export default LocaleLayout;
