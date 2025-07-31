/* import { Locale } from 'next-intl';
import { getTranslations } from 'next-intl/server'; */

import { PageLayout } from '@/components/layout/PageLayout';
import { resetPageClassnames } from '@/components/layout/reset-page-classnames';
import { ConfortableRoomsSection } from './components/ConfortableRoomsSection';
import { FAQSection } from './components/FAQSection';
import { GallerySection } from './components/GallerySection';
import { GoodQualitySection } from './components/GoodQualitySection';
import { HomeHeroSection } from './components/HomeHero';
import { IsoCertificationSection } from './components/IsoCertificationSection';
import { MakeReservationSection } from './components/MakeReservationSection';
import { SafeHostSection } from './components/SafeHostSection';
import { TravelersSection } from './components/TravelersSection';

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
        <PageLayout classname={resetPageClassnames}>
            <HomeHeroSection />
            <SafeHostSection></SafeHostSection>
            <ConfortableRoomsSection></ConfortableRoomsSection>
            <GoodQualitySection></GoodQualitySection>
            <IsoCertificationSection></IsoCertificationSection>
            <GallerySection></GallerySection>
            <MakeReservationSection></MakeReservationSection>
            <TravelersSection></TravelersSection>
            <FAQSection></FAQSection>
        </PageLayout>
    );
}
