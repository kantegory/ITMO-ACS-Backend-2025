import {RoomType} from "../enums/room.type";

export interface RoomResponseDto {
    locatedIn: string;
    roomType: RoomType;
}