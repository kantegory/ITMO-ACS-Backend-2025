import {RoomType} from "@rent/shared";

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
