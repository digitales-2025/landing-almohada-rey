import React from 'react';

import ExternalLink from '@/components/i18n/navigation/ExternalLink';
import { cn } from '@/lib/utils';

interface TiktokProps {
    className?: string;
    svgClassName?: string;
    href?: string;
}

const TiktokLink: React.FC<TiktokProps> = ({
    className = 'text-primary',
    svgClassName = '',
    href = 'https://www.tiktok.com/@almohada_rey',
}) => {
    return (
        <ExternalLink
            href={href}
            aria-label="TikTok"
            className={cn(
                'text-gray-600 hover:text-gray-900 transition-colors',
                className
            )}
        >
            <svg
                className={cn('size-5', svgClassName)}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M16.6 5.82s.51.5 0 0A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6c0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64c0 3.33 2.76 5.7 5.69 5.7c3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48"
                ></path>
            </svg>
        </ExternalLink>
    );
};

export default TiktokLink;
