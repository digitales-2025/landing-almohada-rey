import { getTranslations } from 'next-intl/server';

// import { DetailedRoomWithImages } from '@/actions/rooms/room';
import { SectionWrapper } from '@/components/layout/section/base-section';

// type Props = {
//     detailedRoom: DetailedRoomWithImages;
// };
export async function MoreDetailsSection() {
    const t = await getTranslations('IndexPageRoom.moreDetailsSection');
    const titlesClassnames = 'mb-4 lg:mb-8 font-serif text-h7 lg:text-h5';
    return (
        <SectionWrapper className="border-t-1 border-t-secondary border-b-1 border-b-secondary">
            <div className="flex flex-col lg:flex-row w-full text-secondary ">
                <div className="flex-grow lg:basis-1/2 border-b-1 border-b-secondary lg:border-b-0 lg:border-r-1 border-r-secondary py-8 lg:py-16 xl:py-20 pr-4 sm:pr-6 lg:pr-8 xl:pr-50 2xl:pr-54">
                    <h3 className={titlesClassnames}>{t('services.title')}</h3>
                    <ul className="list-disc list-inside font-light">
                        <li>{t('services.item1')}</li>
                        <li>{t('services.item2')}</li>
                        <li>{t('services.item3')}</li>
                        <li>{t('services.item4')}</li>
                    </ul>
                </div>
                <div className="flex-grow lg:basis-1/2 py-8 lg:py-16 xl:py-20 pl-4 sm:pl-6 lg:pl-8 xl:pl-50 2xl:pl-54">
                    <h3 className={titlesClassnames}>{t('equipment.title')}</h3>
                    <ul className="list-disc list-inside font-light">
                        <li>{t('equipment.item1')}</li>
                        <li>{t('equipment.item2')}</li>
                        <li>{t('equipment.item3')}</li>
                        <li>{t('equipment.item4')}</li>
                        <li>{t('equipment.item5')}</li>
                        <li>{t('equipment.item6')}</li>
                        <li>{t('equipment.item7')}</li>
                        <li>{t('equipment.item8')}</li>
                        <li>{t('equipment.item9')}</li>
                        <li>{t('equipment.item10')}</li>
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
}
