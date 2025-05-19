// import React from 'react';
// import { getTranslations } from 'next-intl/server';

// import { DetailedRoomWithImages } from '@/actions/rooms/room';
// import { SectionWrapper } from '@/components/layout/section/base-section';

// type Props = {
//     detailedRoom: DetailedRoomWithImages;
// };
// export async function MoreDetailsSection({ detailedRoom }: Props) {
//     const t = await getTranslations('IndexPageRoom.moreDetailsSection');
//     return (
//         <SectionWrapper className="border-t-2 border-t-secondary border-b-2 border-b-secondary">
//             <div className="flex gap-8">
//                 <div>
//                     <h3 className="font-semibold mb-2">
//                         {t('services.title')}
//                     </h3>
//                     <ul className="list-disc list-inside">
//                         {Object.keys(t.raw('services'))
//                             .filter((key) => key.startsWith('item'))
//                             .map((key) => (
//                                 <li key={key}>{t.raw(`services.${key}`)}</li>
//                             ))}
//                     </ul>
//                 </div>
//                 <div>
//                     <h3 className="font-semibold mb-2">
//                         {t('equipment.title')}
//                     </h3>
//                     <ul className="list-disc list-inside">
//                         {Object.values(t.raw('equipment')).map(
//                             (equipment: string, idx: number) => (
//                                 <li key={idx}>{equipment}</li>
//                             )
//                         )}
//                     </ul>
//                 </div>
//             </div>
//         </SectionWrapper>
//     );
// }
