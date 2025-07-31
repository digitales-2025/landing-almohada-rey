import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

export const ConferenceHallSection = () => {
    const t = useTranslations('IndexPageExperiences');
    return (
        <SectionWrapper className="w-full">
            <div className="relative w-full flex flex-col lg:flex-row items-center justify-center">
                <div className="relative lg:absolute z-10 lg:right-10 top-0 lg:top-40 xl:top-60 p-10 sm:p-14 lg:p-20 w-full lg:max-w-3/5 bg-white space-y-6">
                    <SectionHeader
                        alignment="left"
                        headerTitle={{
                            text: t('eventHallSection.title').toUpperCase(),
                        }}
                        description={{
                            text: t('eventHallSection.caption'),
                        }}
                        blockClassName="max-w-none"
                    ></SectionHeader>
                    <p className="text-pretty text-base lg:text-lg font-light text-start w-full text-secondary dark:text-secondary-foreground">
                        {t('eventHallSection.description')}
                    </p>
                    <p className="text-pretty text-base lg:text-lg font-medium text-start w-full text-secondary dark:text-secondary-foreground">
                        {t('eventHallSection.slogan')}
                    </p>
                    <Button
                        variant={'link'}
                        size={'lg'}
                        className="pl-0 text-base"
                    >
                        <Link href={t('eventHallSection.ctaButton.link')}>
                            {t('eventHallSection.ctaButton.label')}
                        </Link>
                    </Button>
                </div>
                <figure className="xl:h-[60rem] lg:h-[50rem] h-[30rem] w-full overflow-hidden relative">
                    <Image
                        src={'/experiences/ConferenceHall.webp'}
                        alt="ConferenceHall"
                        quality={100}
                        fill
                        className="object-cover w-full lg:!w-3/4 xl:!w-1/2 object-center"
                        priority
                        loading="eager"
                        placeholder="blur"
                        blurDataURL="/experiences/ConferenceHall.webp"
                        unoptimized
                    ></Image>
                </figure>
            </div>
        </SectionWrapper>
    );
};
