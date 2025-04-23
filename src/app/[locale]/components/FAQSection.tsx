import { useTranslations } from 'next-intl';

import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { SectionWrapper } from '@/components/layout/section/base-section';
import { SectionHeader } from '@/components/layout/section/section-header';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

type FAQItem = {
    question: string;
    answer: string;
};

export const FAQSection = () => {
    const t = useTranslations('IndexPage.FAQSection');
    const faqItems: FAQItem[] = [
        {
            question: t('questions.item1.question'),
            answer: t('questions.item1.answer', {
                checkinTime: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
                checkoutTime: new Date().toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                }),
            }),
        },
        {
            question: t('questions.item2.question'),
            answer: t('questions.item2.answer'),
        },
        {
            question: t('questions.item3.question'),
            answer: t('questions.item3.answer'),
        },
        {
            question: t('questions.item4.question'),
            answer: t('questions.item4.answer'),
        },
        {
            question: t('questions.item5.question'),
            answer: t('questions.item5.answer'),
        },
        {
            question: t('questions.item6.question'),
            answer: t('questions.item6.answer'),
        },
    ];
    return (
        <SectionWrapper
            className={cn('relative')}
            //className="relative"
        >
            <div className="absolute w-full inset-0 flex flex-col flex-grow h-full">
                <div className="basis-1/2 w-full"></div>
                <div className="basis-1/2 bg-primary/15 w-full"></div>
            </div>
            <div className={cn(sectionLayoutClassnames, 'relative z-10')}>
                <div className="p-2 lg:p-6 bg-primary-foreground">
                    <div className="space-y-4 lg:space-y-6 flex flex-col items-center justify-center py-14 lg:py-20 bg-secondary px-4 lg:px-20 xl:px-28 ">
                        <figure className="w-full flex justify-center">
                            <img
                                className="aspect-square w-14 md:w-16 lg:w-22"
                                src="/home/FAQVector.svg"
                                alt="FAQDecorator"
                            />
                        </figure>
                        <SectionHeader
                            headerTitle={{
                                text: t('title'),
                                classname: 'text-primary-foreground',
                            }}
                            onlyTitle={true}
                            className="lg:pb-3"
                        ></SectionHeader>
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full max-w-[1176px]"
                        >
                            {faqItems.map((item, index) => (
                                <AccordionItem
                                    key={index}
                                    value={`item-${index}`}
                                    className="w-full
                                    py-2 lg:py-6"
                                >
                                    <AccordionTrigger
                                        hasChevron={false}
                                        className="text-center text-primary font-serif font-normal !text-h7 md:!text-h6 lg:!text-h4 justify-center"
                                    >
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-primary-foreground text-sm md:text-base lg:text-lg text-center text-balance font-light">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
};
