import {Living} from "./living.model";
import {RoomType} from "@rent/shared";

export interface Room {
    id: number;
    living?: Living;
    locatedIn: string;
    roomType: RoomType;
}