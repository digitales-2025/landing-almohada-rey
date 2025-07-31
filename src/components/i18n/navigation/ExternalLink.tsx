import { cn } from '@/lib/utils';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

export default function ExternalLink({
    href,
    children,
    className,
    ...rest
}: Props) {
    return (
        <a
            {...rest}
            className={cn(
                'inline-block text-secondary cursor-pointer',
                className ?? ''
            )}
            href={href}
            rel="noreferrer"
            target="_blank"
        >
            {children}
        </a>
    );
}
