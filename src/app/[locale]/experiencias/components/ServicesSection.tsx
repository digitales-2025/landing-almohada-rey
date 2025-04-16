import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';

export const ServicesSection = () => {
    const t = useTranslations('IndexPageExperiences.servicesSection');
    const services = [
        { id: 'item1', name: t('services.item1') },
        { id: 'item3', name: t('services.item3') },
        { id: 'item5', name: t('services.item5') },
        { id: 'item6', name: t('services.item6') },
        { id: 'item7', name: t('services.item7') },
        { id: 'item8', name: t('services.item8') },
        { id: 'item9', name: t('services.item9') },
        { id: 'item10', name: t('services.item10') },
        { id: 'item12', name: t('services.item12') },
        { id: 'item13', name: t('services.item13') },
        { id: 'item14', name: t('services.item14') },
        { id: 'item15', name: t('services.item15') },
        { id: 'item16', name: t('services.item16') },
        { id: 'item17', name: t('services.item17') },
        { id: 'item18', name: t('services.item18') },
        { id: 'item11', name: t('services.item11') },
        { id: 'item2', name: t('services.item2') },
        { id: 'item19', name: t('services.item19') },
        { id: 'item4', name: t('services.item4') },
    ];

    return (
        <SectionWrapper>
            <SectionHeader
                headerTitle={{
                    text: t('title').toUpperCase(),
                }}
                description={{
                    text: t('description'),
                }}
            ></SectionHeader>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-14 list-disc ml-5 pt-4">
                {services.map(service => (
                    <li key={service.id}>
                        <span className="break-words text-pretty truncate text-secondary dark:text-secondary-foreground">
                            {service.name}
                        </span>
                    </li>
                ))}
            </ul>
        </SectionWrapper>
    );
};
