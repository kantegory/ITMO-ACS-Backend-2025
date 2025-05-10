import {RoomType} from "../../enums/room.type";

export interface CreateRoomRequestDto {

    /**
     * @isString
     */
    locatedIn: string;

    /**
     * @isEnum RoomType
     */
    roomType: RoomType;
}
