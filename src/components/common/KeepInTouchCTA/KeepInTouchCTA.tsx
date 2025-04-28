import { SectionWrapper } from '@/components/layout/section/base-section';
import { KeepInTouchCTAForm } from './KeepInTouchCTAForm';

interface KeepInTouchCTAProps {
    className?: string;
    children?: React.ReactNode;
}

export const KeepInTouchCTA = ({
    className,
    children,
}: KeepInTouchCTAProps) => {
    return (
        <SectionWrapper className={className}>
            {children}
            <KeepInTouchCTAForm></KeepInTouchCTAForm>
        </SectionWrapper>
    );
};
