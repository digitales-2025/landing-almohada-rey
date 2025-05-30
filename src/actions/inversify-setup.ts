import 'reflect-metadata'; // Solo aquí se importa

import { Container } from 'inversify';

import { BookingOps } from './booking/booking.di';
import { RoomOps, RoomTypeOps } from './rooms/room.di';

const container = new Container();
container.bind(BookingOps).toSelf().inSingletonScope();
container.bind(RoomTypeOps).toSelf().inSingletonScope();
container.bind(RoomOps).toSelf().inSingletonScope();

export default container;
