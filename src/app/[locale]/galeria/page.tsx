import { PageLayout } from '@/components/layout/PageLayout';
import { KeepInTouchCTA } from '../../../components/common/KeepInTouchCTA/KeepInTouchCTA';
import { GalleryHero } from './components/GalleryHero';
import { GallerySection1 } from './components/GallerySection1';
import { GallerySection2 } from './components/GallerySection2';
import { GallerySection3 } from './components/GallerySection3';
import { GallerySection4 } from './components/GallerySection4';
import { GallerySection5 } from './components/GallerySection5';
import { GallerySection6 } from './components/GallerySection6';
import { GallerySection7 } from './components/GallerySection7';

export default function page() {
    return (
        <PageLayout>
            <GalleryHero />
            <GallerySection1 />
            <GallerySection2 />
            <GallerySection3 />
            <GallerySection4 />
            <GallerySection5 />
            <GallerySection6 />
            <GallerySection7 />
            <KeepInTouchCTA />
        </PageLayout>
    );
}
