import { injectable } from 'inversify';

import { BaseActionOps } from '@/lib/actions/BaseActionOps';
import { components } from '@/types/api';

export type Room = components['schemas']['Room'];
export type RoomType = components['schemas']['RoomType'];
export type DetailedRoom = components['schemas']['DetailedRoom'];
export type RoomStatus = components['schemas']['LandRoomTypeAllImg'];
export type RoomStatusType = components['schemas']['LandRoomTypeMainImg'];
export type RoomTypeWithStatus = components['schemas']['LandImageRoomType'];

@injectable()
export class RoomTypeOps extends BaseActionOps<RoomType> {}

@injectable()
export class RoomOps extends BaseActionOps<RoomType> {}
