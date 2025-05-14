'use server';

import { roomTypeOps } from '../action-setup';
import { BaseQueryRoomType } from './room';

export async function getAllRoomTypes(dto: BaseQueryRoomType) {
    return roomTypeOps.get('/landing/room-types', {
        params: dto,
    });
}
