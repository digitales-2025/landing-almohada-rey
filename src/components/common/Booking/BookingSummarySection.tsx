import { sectionLayoutClassnames } from '@/components/layout/reset-page-classnames';
import { sectionVerticalSpacing } from '@/components/layout/section/base-section';
import {
    DescriptionProps,
    SectionHeader,
    TitleProps,
} from '@/components/layout/section/section-header';
import { cn } from '@/lib/utils';
import { BookingSummaryForm } from './BookingSummaryForm';

type BookingSummaryDescriptionProps = {
    text: string;
    className?: string;
};

export type BookingSumamryProps = {
    className?: string;
    title: TitleProps;
    caption: DescriptionProps;
    description: BookingSummaryDescriptionProps;
};

export const BookingSummarySection = ({
    caption,
    description,
    title,
    className,
}: BookingSumamryProps) => {
    return (
        <div
            className={cn(
                sectionLayoutClassnames,
                sectionVerticalSpacing,
                'bg-primary-foreground',
                className
            )}
        >
            <SectionHeader
                headerTitle={title}
                description={caption}
            ></SectionHeader>
            <p
                className={cn(
                    'text-secondary text-center text-balance text-sm md:text-base lg:text-p lg:tracking-normal max-w-prose mx-auto',
                    description.className
                )}
            >
                {description.text}
            </p>
            <BookingSummaryForm></BookingSummaryForm>
        </div>
    );
};
