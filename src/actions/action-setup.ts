import { envs } from '@/config/envs';
import { BookingOps } from './booking/booking.di';
import container from './inversify-setup';
import { RoomOps, RoomTypeOps } from './rooms/room.di';

export const baseUri = envs.BACKEND_URL;

export const bookingOps = container.get(BookingOps);
export const roomTypeOps = container.get(RoomTypeOps);
export const roomOps = container.get(RoomOps);
