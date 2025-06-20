import {LivingType} from "../../enums/living.type";
import {CreateComfortModel} from "../comfort/create-comfort-request.model";
import {CreateFlatModel} from "../flat/flat-create-request.model";
import {CreateRoomModel} from "../room/room-create-request.model";
import {CreateCountryHouseModel} from "../country-house/country-house-create-request.model";

export interface CreateLivingModel {
    totalFloors: number;
    totalRooms: number;
    area: number;
    meter: number;
    other: number;
    livingType: LivingType;
    comfort: CreateComfortModel;
    flat?: CreateFlatModel;
    room?: CreateRoomModel;
    countryHouse?: CreateCountryHouseModel;
}