import { components } from '@/types/api';

export type Room = components['schemas']['Room'];
export type RoomType = components['schemas']['RoomType'];
export type DetailedRoom = components['schemas']['DetailedRoom'];
export type RoomTypeWIthAllImg = components['schemas']['LandRoomTypeAllImg'];
export type RoomTypeWithMainImg = components['schemas']['BaseRoomTypeMainImg'];
export type DetailedRoomWithImages =
    components['schemas']['DetailedRoomWithImages'];
export type RoomTypeWithStatus = components['schemas']['LandImageRoomType'];
export type BaseQueryRoomType = components['schemas']['BaseQueryDto'];
export type ImageRoomType = components['schemas']['ImageRoomType'];
