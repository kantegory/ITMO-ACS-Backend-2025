import {RoomType} from "@rent/shared";

export interface CreateRoomModel {
    locatedIn: string;
    roomType: RoomType;
}
