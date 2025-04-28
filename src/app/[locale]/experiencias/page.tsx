import { PageLayout } from '@/components/layout/PageLayout';
import { KeepInTouchCTA } from '../../../components/common/KeepInTouchCTA/KeepInTouchCTA';
import { BentoSection } from './components/BentoSection';
import { BusinessPackageHero } from './components/BusinessPackageHero';
import { ConferenceHallSection } from './components/ConferenceHallSection';
import { EventPackagesSection } from './components/EventPackagesSection';
import { ExperiencesHeroSection } from './components/ExperiencesHero';
import { ServicesSection } from './components/ServicesSection';

export default function page() {
    return (
        <PageLayout>
            <ExperiencesHeroSection />
            <BentoSection></BentoSection>
            <BusinessPackageHero></BusinessPackageHero>
            <EventPackagesSection></EventPackagesSection>
            <ConferenceHallSection></ConferenceHallSection>
            <ServicesSection></ServicesSection>
            <KeepInTouchCTA></KeepInTouchCTA>
        </PageLayout>
    );
}
