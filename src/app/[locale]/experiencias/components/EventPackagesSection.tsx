import { useTranslations } from 'next-intl';

import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { formatPrice } from '@/lib/i18n-formatPrice';
import { cn } from '@/lib/utils';

export const EventPackagesSection = () => {
    const t = useTranslations('IndexPageExperiences');

    const features = [
        {
            title: t('eventPackagesSection.packages.item1.title'),
            price: formatPrice(
                t('eventPackagesSection.packages.item1.pricing.price'),
                t('eventPackagesSection.packages.item1.pricing.currency')
            ),
        },
        {
            title: t('eventPackagesSection.packages.item2.title'),
            price: formatPrice(
                t('eventPackagesSection.packages.item2.pricing.price'),
                t('eventPackagesSection.packages.item2.pricing.currency')
            ),
        },
        {
            title: t('eventPackagesSection.packages.item3.title'),
            price: formatPrice(
                t('eventPackagesSection.packages.item3.pricing.price'),
                t('eventPackagesSection.packages.item3.pricing.currency')
            ),
        },
        {
            title: t('eventPackagesSection.packages.item4.title'),
            price: formatPrice(
                t('eventPackagesSection.packages.item4.pricing.price'),
                t('eventPackagesSection.packages.item4.pricing.currency')
            ),
        },
        {
            title: t('eventPackagesSection.packages.item5.title'),
            price: formatPrice(
                t('eventPackagesSection.packages.item5.pricing.price'),
                t('eventPackagesSection.packages.item5.pricing.currency')
            ),
        },
        {
            title: t('eventPackagesSection.packages.item6.title'),
            price: formatPrice(
                t('eventPackagesSection.packages.item6.pricing.price'),
                t('eventPackagesSection.packages.item6.pricing.currency')
            ),
        },
    ];
    return (
        <SectionWrapper>
            <SectionHeader
                alignment="center"
                headerTitle={{
                    text: t('eventPackagesSection.title').toUpperCase(),
                }}
                description={{
                    text: t('eventPackagesSection.description'),
                }}
            ></SectionHeader>
            <div>
                <Table>
                    <TableBody>
                        {features.map((feature, index) => {
                            const isImportantItem =
                                feature.title ===
                                t('eventPackagesSection.packages.item2.title');
                            const importantItemClassname = isImportantItem
                                ? 'text-secondary dark:text-secondary-foreground'
                                : 'text-secondary/50 dark:text-secondary-foreground/50 ';
                            return (
                                <TableRow
                                    key={index}
                                    className={cn(
                                        'text-base sm:text-h7 lg:text-h6 xl:text-h4 font-h4 leading-14 md:leading-16 xl:leading-25 border-b-[1px] border-b-secondary/40 dark:border-b-secondary-foreground/40 hover:text-secondary dark:hover:text-secondary-foreground hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200',
                                        importantItemClassname
                                    )}
                                >
                                    <TableCell>{feature.title}</TableCell>
                                    <TableCell className="dark:text-secondary-foreground text-end">
                                        {feature.price}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </SectionWrapper>
    );
};
