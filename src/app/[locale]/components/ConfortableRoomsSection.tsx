import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { defaultRoutes } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { HomeCarousel } from './roomSection/homeCarousel';

export const ConfortableRoomsSection = () => {
    const t = useTranslations('IndexPage');

    return (
        <SectionWrapper className={cn(sectionLayoutClassnames, 'bg-secondary')}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 place-items-center-safe">
                <SectionHeader
                    headerTitle={{
                        text: t('confortableRoomsSection.title').toUpperCase(),
                    }}
                    description={{
                        text: t('confortableRoomsSection.caption'),
                        className: 'text-primary-foreground',
                    }}
                    alignment="left"
                    blockClassName="mx-0"
                ></SectionHeader>
                <div className="space-y-2 pt-4 sm:pt-0 w-full">
                    <p className="text-balance text-primary-foreground font-light max-w-[500px]">
                        {t('confortableRoomsSection.description')}
                    </p>
                    <Link
                        href={defaultRoutes.rooms}
                        className={cn(
                            buttonVariants({
                                variant: 'link',
                                size: 'lg',
                            }),
                            'text-primary-foreground px-0 mx-0'
                        )}
                    >
                        {t('confortableRoomsSection.ctaButton.label')}
                    </Link>
                </div>
            </div>

            <HomeCarousel></HomeCarousel>
        </SectionWrapper>
    );
};
