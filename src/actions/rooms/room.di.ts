import { injectable } from 'inversify';

import { BaseActionOps } from '@/lib/actions/BaseActionOps';
import { Room, RoomTypeWithMainImg } from './room';

@injectable()
export class RoomTypeOps extends BaseActionOps<RoomTypeWithMainImg> {}

@injectable()
export class RoomOps extends BaseActionOps<Room> {}
