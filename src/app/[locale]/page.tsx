import FooterSection from "@/components/layout/footer";
import HeroSection from "@/app/gallery/components/hero-section";

import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
 
type Props = {
  params: Promise<{locale: Locale}>;
};

// export async function generateMetadata({params}:  Props) {
//   const {locale} = await params;
//   const t = await getTranslations({locale, namespace: 'Metadata'});
 
//   return {
//     title: t('title')
//   };
// }

export default function Home() {
  return (

    <>
      <HeroSection />
      <FooterSection />
    </>
  );
}
