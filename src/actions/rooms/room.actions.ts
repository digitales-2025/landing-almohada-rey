'use server';

import { SupportedLocales } from '@/i18n/routing';
import { wrapUriWithParams } from '@/lib/actions/BaseActionOps';
import { roomOps, roomTypeOps } from '../action-setup';
import { BaseQueryRoomType, DetailedRoomWithImages } from './room';

export async function getAllRoomTypes(dto: BaseQueryRoomType) {
    return roomTypeOps.get('/landing/room-types', {
        params: dto,
    });
}

export async function getRoom(id: string, locale: SupportedLocales) {
    return roomOps.getOne<DetailedRoomWithImages>(
        wrapUriWithParams({
            uri: `/landing/room-types/room-detail/${id}`,
            params: {
                locale,
            },
        })
    );
}
