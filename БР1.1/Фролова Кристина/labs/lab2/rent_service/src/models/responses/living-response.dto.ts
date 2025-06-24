import {ComfortResponseDto} from "./comfort-response.dto";
import {RoomResponseDto} from "./room-response.dto";
import {FlatResponseDto} from "./flat-response.dto";
import {CountryHouseResponseDto} from "./country-house-response.dto";
import {LivingType} from "../enums/living.type";

export interface LivingResponseDto {
    totalFloors: number;
    totalRooms: number;
    area: number;
    meter: number;
    other: number;
    livingType: LivingType;
    comfort: ComfortResponseDto;
    flat?: FlatResponseDto;
    room?: RoomResponseDto;
    countryHouse?: CountryHouseResponseDto;
}
