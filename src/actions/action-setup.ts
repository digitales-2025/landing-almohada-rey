import { envs } from '@/config/envs';
import { BookingOps } from './booking/booking.di';
import { RoomOps, RoomTypeOps } from './rooms/room.di';

export const baseUri = envs.BACKEND_URL;

export const bookingOps = new BookingOps();
export const roomTypeOps = new RoomTypeOps();
export const roomOps = new RoomOps();
