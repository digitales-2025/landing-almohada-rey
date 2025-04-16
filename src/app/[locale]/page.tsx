/* import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server'; */

import { PageLayout } from '@/components/layout/PageLayout';
import { HomeHeroSection } from './components/HomeHero';

/* type Props = {
    params: Promise<{ locale: Locale }>;
}; */

// export async function generateMetadata({params}:  Props) {
//   const {locale} = await params;
//   const t = await getTranslations({locale, namespace: 'Metadata'});

//   return {
//     title: t('title')
//   };
// }

export default function Home() {
    return (
        <PageLayout>
            <HomeHeroSection />
        </PageLayout>
    );
}
