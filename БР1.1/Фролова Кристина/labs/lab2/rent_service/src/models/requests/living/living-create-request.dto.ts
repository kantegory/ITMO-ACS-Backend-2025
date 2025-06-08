import {LivingType} from "../../enums/living.type";
import {CreateComfortRequestDto} from "../comfort/create-comfort-request.dto";
import {CreateFlatRequestDto} from "../flat/flat-create-request.dto";
import {CreateRoomRequestDto} from "../room/room-create-request.dto";
import {CreateCountryHouseRequestDto} from "../country-house/country-house-create-request.dto";

export interface CreateLivingRequestDto {

    /**
     * @isInt
     * @minimum 1
     */
    totalFloors: number;

    /**
     * @isInt
     * @minimum 1
     */
    totalRooms: number;

    /**
     * @isNumber
     * @minimum 0
     */
    area: number;

    /**
     * @isNumber
     * @minimum 0
     */
    meter: number;

    /**
     * @isNumber
     * @minimum 0
     */
    other: number;

    /**
     * @isEnum LivingType
     */
    livingType: LivingType;

    comfort: CreateComfortRequestDto;
    flat?: CreateFlatRequestDto;
    room?: CreateRoomRequestDto;
    countryHouse?: CreateCountryHouseRequestDto;
}