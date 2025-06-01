import { BaseActionOps } from '@/lib/actions/BaseActionOps';
import { Room, RoomTypeWithMainImg } from './room';

export class RoomTypeOps extends BaseActionOps<RoomTypeWithMainImg> {}

export class RoomOps extends BaseActionOps<Room> {}
