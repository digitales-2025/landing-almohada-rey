// import React from 'react';
// import { getLocale, getTranslations } from 'next-intl/server';

// import { getRoom } from '@/actions/rooms/room.actions';
// import { FetchingError } from '@/components/common/Errors/FetchingErrors';
// import { LoadingCardSkeleton } from '@/components/common/loading/LoadingCardSkeleton';
// import { BreadcrumbNav } from '@/components/layout/breadcrumb/BreadcrumbNav';
// import { BaseHeroWrapper } from '@/components/layout/hero/base-hero';
// import { PageLayout } from '@/components/layout/PageLayout';
// import { SectionWrapper } from '@/components/layout/section/base-section';
// import { SectionHeader } from '@/components/layout/section/section-header';

// export default async function page({
//     params,
// }: {
//     params: Promise<{
//         roomId: string;
//     }>;
// }) {
//     const { roomId } = await params;
//     const locale = await getLocale();
//     try {
//         const response = await getAllRoomTypes({
//             locale,
//         });
//         if ('error' in response) {
//             throw new Error(response.error);
//         }
//         roomTypes = response; // ajusta según tu API
//     } catch (error) {
//         // Renderiza el error aquí si no usas ErrorBoundary
//         return (
//             <PageLayout>
//                 <SectionWrapper className={cn(sectionLayoutClassnames)}>
//                     <SectionHeader
//                         headerTitle={{ text: t('title').toUpperCase() }}
//                         description={{ text: t('description') }}
//                     />
//                     <FetchingError
//                         title="Error"
//                         message={
//                             t('fetchingError.message') +
//                             ' ' +
//                             (error instanceof Error ? error.message : '')
//                         }
//                         // onRefetch={() => {
//                         //     /* No hay refetch en server, solo recarga la página */ window.location.reload();
//                         // }}
//                         // refetchButtonLabel={t('fetchingError.actionButton.label')}
//                     />
//                 </SectionWrapper>
//             </PageLayout>
//         );
//     }

//     if (!roomTypes) {
//         return (
//             <SectionWrapper className={cn(sectionLayoutClassnames)}>
//                 <SectionHeader
//                     headerTitle={{
//                         text: t('title').toUpperCase(),
//                     }}
//                     description={{
//                         text: t('description'),
//                     }}
//                 ></SectionHeader>
//                 <LoadingCardSkeleton />
//             </SectionWrapper>
//         );
//     }

//     const room = await getRoom(roomId, locale);
//     const t = getTranslations('IndexPageRoom');
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
