import React from 'react';

import ExternalLink from '@/components/i18n/navigation/ExternalLink';

interface FacebookIconProps {
    className?: string;
    svgClassName?: string;
    href?: string;
}

const FacebookLink: React.FC<FacebookIconProps> = ({
    className = ' text-primary',
    href = 'https://www.facebook.com/almohadarey',
    svgClassName = 'size-5',
}) => {
    return (
        <ExternalLink href={href} aria-label="Facebook" className={className}>
            <svg
                className={svgClassName}
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
            >
                <path
                    fill="currentColor"
                    d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"
                ></path>
            </svg>
        </ExternalLink>
    );
};

export default FacebookLink;
