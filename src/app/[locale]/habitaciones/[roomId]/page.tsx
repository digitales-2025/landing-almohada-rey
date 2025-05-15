// import React from 'react';

// import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
// import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
// import { PageLayout } from '@/components/layout/PageLayout';
// import { getTranslations } from 'next-intl/server';

// export default async function page({
//     params,
// }: {
//     params: Promise<{
//         roomId: string;
//     }>;
// }) {
//     const { roomId } = await params;
//     const t = getTranslations('')
//     const isDynamicRoute = (segment: string) => {
//         // Detectar segmentos que son IDs numéricos o UUIDs
//         const regexTest =
//             /^\d+$/.test(segment) ||
//             /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
//                 segment
//             );
//         return regexTest && roomId === segment;
//     };
//     const getDynamicLabel = () =>
//         // segment: string
//         // index: number,
//         // fullPath: string
//         {
//             // Ejemplo: Si es un ID en una ruta de reservación, mostrar "Reservación #ID"
//             // if (fullPath.includes('/reservacion/')) {
//             //     return `Reservación #${segment}`;
//             // }
//             // // Para un ID de producto
//             // if (fullPath.includes('/producto/')) {
//             //     return `Producto ${segment}`;
//             // }
//             return `Item ${segment}`;
//         };
//     return (
//         <PageLayout>
//             <BaseHeroWrapper
//                 className="min-h-[300px] sm:min-h-[400px] lg:min-h-[600px] xl:min-h-[700px] flex items-center justify-center"
//                 image={{
//                     src: '/booking/BookingPlaceholderRingbell.webp',
//                     alt: 'Experiencias Hero Image',
//                     quality: 100,
//                     placeholder: 'blur',
//                     blurDataURL: '/booking/BookingPlaceholderRingbell.webp',
//                     unoptimized: true,
//                     className: 'object-bottom',
//                 }}
//                 // gradientEffectClassname='from-black/10 to-black/30 object-cover'
//             >
//                 <div className="w-full animate-fade">
//                     <BreadcrumbNav className="mx-auto w-fit"></BreadcrumbNav>
//                 </div>
//             </BaseHeroWrapper>
//         </PageLayout>
//     );
// }
