import 'reflect-metadata';

import { Container } from 'inversify';

import { BookingOps } from './booking/booking.di';
import { RoomOps, RoomTypeOps } from './rooms/room.di';

// Verifica si está en Node.js (evita Edge Runtime)
const isNode = typeof process !== 'undefined' && process.versions?.node;

if (!isNode) {
    throw new Error(
        'InversifyJS solo puede usarse en Node.js (API Routes/Server Actions)'
    );
}

const container = new Container();

if (isNode) {
    // Configura bindings SOLO en Node.js (Server Actions/API Routes)
    container.bind(BookingOps).toSelf().inSingletonScope();
    container.bind(RoomTypeOps).toSelf().inSingletonScope();
    container.bind(RoomOps).toSelf().inSingletonScope();
}

export default container;
