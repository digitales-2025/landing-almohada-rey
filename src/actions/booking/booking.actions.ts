'use server';

import { bookingOps } from '../action-setup';
import { CheckRoomAvailabilityDto } from './booking';

export async function createBookingSummary(data: any) {
    return bookingOps.create('/booking', data);
}

export async function getAvailableRooms(dto: CheckRoomAvailabilityDto) {
    return bookingOps.getAvailableRooms(dto);
}
