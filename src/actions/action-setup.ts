import { BookingOps } from './booking/booking.di';
import container from './inversify-setup';
import { RoomOps, RoomTypeOps } from './rooms/room.di';

export const bookingOps = container.get(BookingOps);
export const roomTypeOps = container.get(RoomTypeOps);
export const roomOps = container.get(RoomOps);
