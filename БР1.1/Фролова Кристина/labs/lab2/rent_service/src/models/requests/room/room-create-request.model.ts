import {RoomType} from "../../enums/room.type";

export interface CreateRoomModel {
    locatedIn: string;
    roomType: RoomType;
}
