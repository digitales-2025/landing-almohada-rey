import HeroSection from "@/app/gallery/components/hero-section";
import { IntlayerServerProvider, useIntlayer,  } from "next-intlayer/server";
import { FC } from "react";
import { LocalPromiseParams, NextPageIntlayer} from "next-intlayer";
import {
  getTranslation,
  getMultilingualUrls,
  type LanguageContent
} from "intlayer";

import { Metadata } from "next";

export const generateMetadata = async ({  
  params,
}: LocalPromiseParams): Promise<Metadata> => {
  const { locale } = await params;

  const multilingualUrls = getMultilingualUrls("/");
  const t: <T>(content: LanguageContent<T>)=> T = (content)=>(getTranslation(content, locale));
  return {
    title: t<string>({
      en: "Intlayer - Next.js",
      es: "Intlayer - Next.js",
    }),
    description: t<string>({
      en: "Intlayer Next.js Example",
      es: "Ejemplo de Intlayer Next.js",
    }),
    alternates: {
      canonical: `/`,
      languages: {
        ...multilingualUrls, "x-default": "/"
      },
    },
    openGraph: {
      title: "Intlayer - Next.js",
      description: "Intlayer Next.js Example",
      url: multilingualUrls[locale],
      siteName: "Intlayer",
      images: [
        {
          url: "https://intlayer.dev/images/intlayer.png",
          width: 800,
          height: 600,
        },
      ],
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Intlayer - Next.js",
      description: "Intlayer Next.js Example",
      images: ["https://intlayer.dev/images/intlayer.png"],
    },
  };
}

const PageContent: FC = () => {
  const content = useIntlayer("page");

  return (
    <>
      <p>{content.getStarted.main}</p>
      <code>{content.getStarted.pageLink}</code>
      <HeroSection />
    </>
  );
};

const Home:NextPageIntlayer = async ({
  params
})=>{
  return (
    <IntlayerServerProvider>
      <PageContent />
    </IntlayerServerProvider>
  );
}

export default Home;
