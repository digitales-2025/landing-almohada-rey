import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export const MakeReservationSection = () => {
    const t = useTranslations('IndexPage.makeReservationSection');
    return (
        <SectionWrapper className={cn('relative bg-primary/20 overflow-clip')}>
            <img
                className="w-full inset-0 absolute object-top"
                src="/Background_Pattern.png"
                alt="bg-pattern"
            />
            <div
                className={cn(
                    sectionLayoutClassnames,
                    'relative z-10 flex flex-col items-center justify-center space-y-4 lg:space-y-6'
                )}
            >
                <SectionHeader
                    headerTitle={{
                        text: t('title'),
                    }}
                    onlyTitle={true}
                    alignment="center"
                ></SectionHeader>
                <p className="text-sm md:text-base lg:text-p lg:tracking-normal text-center text-secondary">
                    {t('description')}
                </p>
                <div className="w-full flex justify-center">
                    <Link
                        href={t('ctaButton.link')}
                        className={cn(
                            buttonVariants({
                                variant: 'default',
                                size: 'lg',
                            }),
                            'text-primary-foreground bg-secondary border-none rounded-none w-fit text-center text-base lg:text-p lg:tracking-normal h-fit p-3 lg:p-4'
                        )}
                    >
                        {t('ctaButton.label')}
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    );
};
