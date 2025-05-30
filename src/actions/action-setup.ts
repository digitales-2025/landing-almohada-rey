import 'reflect-metadata';

import { Container } from 'inversify';

import { envs } from '@/config/envs';
import { BookingOps } from './booking/booking.di';
import { RoomOps, RoomTypeOps } from './rooms/room.di';

const container: Container = new Container();
container.bind(BookingOps).toSelf().inSingletonScope();
container.bind(RoomTypeOps).toSelf().inSingletonScope();
container.bind(RoomOps).toSelf().inSingletonScope();

export const baseUri = envs.BACKEND_URL;
export const bookingOps = container.get(BookingOps);
export const roomTypeOps = container.get(RoomTypeOps);
export const roomOps = container.get(RoomOps);
