import { getLocale, getTranslations } from 'next-intl/server';

import { DetailedRoomWithImages } from '@/actions/rooms/room';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { Button } from '@/components/ui/button';
import { defaultLocale } from '@/i18n/routing';

type Props = {
    detailedRoom: DetailedRoomWithImages;
};

export async function RoomDescriptionSection({ detailedRoom }: Props) {
    const t = await getTranslations('IndexPageRoom.roomSummarySection');
    const locale = await getLocale();
    const buttonClassnames =
        'text-sm md:text-base lg:text-xl text-secondary hover:text-secondary';

    const imgClassNames = '!w-20 lg:!w-44';
    const features = [
        {
            icon: (
                <img
                    className={imgClassNames}
                    src="/room/BreakfastIcon.svg"
                    alt="Breakfast/Deayuno"
                />
            ),
            label: t('services.item1'),
        },
        {
            icon: (
                <img
                    className={imgClassNames}
                    src="/room/BedIcon.svg"
                    alt="Cama/Bed"
                />
            ),
            label:
                locale === defaultLocale
                    ? detailedRoom.RoomTypes.bed
                    : detailedRoom.RoomTypes.bedEn,
        },
        {
            icon: (
                <img
                    className={imgClassNames}
                    src="/room/GroupIcon.svg"
                    alt="Hosts/Huespedes"
                />
            ),
            label: t('services.item2', {
                count: detailedRoom.RoomTypes.guests,
            }),
        },
        {
            icon: (
                <img
                    className={imgClassNames}
                    src="/room/WifiIcon.svg"
                    alt="Wifi"
                />
            ),
            label: t('services.item4'),
        },
    ];
    return (
        <SectionWrapper>
            <div className="space-y-5 lg:space-y-8">
                <figure className="w-full flex justify-center">
                    <img
                        className="h-fit w-36 md:w-44 lg:w-50"
                        src="/room/Crown.svg"
                        alt="Almohada del rey Crown"
                    />
                </figure>
                <SectionHeader
                    onlyTitle={true}
                    headerTitle={{
                        text: t('title'),
                        classname:
                            'lg:!leading-15 xl:!leading-17 2xl:!leading-19',
                    }}
                ></SectionHeader>
            </div>
            <div className="space-y-6 lg:space-y-10">
                <div className="text-center flex justify-center">
                    <p className="text-sm md:text-base lg:text-xl text-secondary font-light max-w-[830px] text-pretty">
                        {locale === defaultLocale
                            ? detailedRoom.RoomTypes.description
                            : detailedRoom.RoomTypes.descriptionEn}
                    </p>
                </div>
                <div className="w-full flex justify-center gap-x-8 lg:gap-x-12 flex-wrap flex-grow">
                    <Button
                        variant={'link'}
                        size={'lg'}
                        className={buttonClassnames}
                    >
                        {t('termsAndConditionsButton.label')}
                    </Button>
                    <Button
                        variant={'link'}
                        size={'lg'}
                        className={buttonClassnames}
                    >
                        {t('refundAndCancelPolicyButton.label')}
                    </Button>
                </div>
                <div className="flex justify-center gap-4 lg:gap-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-2 max-w-[100px] sm:max-w-[120px] md:max-w-[160px] lg:max-w-[200px] xl:max-w-[240px]"
                        >
                            <div className="w-10 h-10 lg:w-12 lg:h-12">
                                {feature.icon}
                            </div>
                            <p className="text-sm md:text-base lg:text-lg text-secondary font-light text-center">
                                {feature.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
