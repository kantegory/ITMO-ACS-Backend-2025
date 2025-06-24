import {Living} from "./living.model";
import {RoomType} from "../enums/room.type";

export interface Room {
    id: number;
    living?: Living;
    locatedIn: string;
    roomType: RoomType;
}