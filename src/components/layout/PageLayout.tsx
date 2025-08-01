// import {useTranslations} from 'next-intl';
// import {ReactNode} from 'react';
// import ExternalLink from '../i18n/navigation/ExternalLink';

// type Props = {
//   children?: ReactNode;
//   title: ReactNode;
// };

// export default function PageLayout({children, title}: Props) {
//   const t = useTranslations('PageLayout');

//   return (
//     <div className="relative flex grow flex-col bg-slate-850 py-36">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute left-0 top-1 size-[20500px] translate-x-[-47.5%] rounded-full bg-gradient-to-b from-slate-900 via-cyan-500" />
//       </div>
//       <div className="container relative flex grow flex-col px-4">
//         <h1 className="text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
//           {title}
//         </h1>
//         <div className="mt-6 text-gray-400 md:text-lg">{children}</div>
//         <div className="mt-auto grid grid-cols-1 gap-4 pt-20 md:grid-cols-2 lg:gap-12">
//           <ExternalLink
//             description={t('links.docs.description')}
//             href={t('links.docs.href')}
//             title={t('links.docs.title')}
//           />
//           <ExternalLink
//             description={t('links.source.description')}
//             href={t('links.source.href')}
//             title={t('links.source.title')}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

import React from 'react';

import { cn } from '@/lib/utils';

interface PageLayoutProps {
    children: React.ReactNode;
    classname?: string;
}

export const PageLayout = ({ children, classname }: PageLayoutProps) => {
    return (
        <main className="overflow-hidden animate-fade">
            <article
                className={cn(
                    'min-h-dvh space-y-16 sm:space-y-20 md:space-y-24 lg:space-y-28 pb-8',
                    classname
                )}
            >
                {children}
            </article>
        </main>
    );
};
