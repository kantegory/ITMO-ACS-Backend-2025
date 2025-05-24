import {CreateLivingRequestDto} from "../models/requests/living/living-create-request.dto";
import {CreateLivingModel} from "../models/requests/living/living-create-request.model";
import {createComfortDtoToModel, entityToComfort, toComfortResponseModel} from "./comfort.mapper";
import {LivingResponseDto} from "../models/responses/living-response.dto";
import {Living} from "../models/models/living.model";
import {LivingEntity} from "../entities/living.entity";
import {createFlatDtoToModel, entityToFlat, toFlatResponseModel} from "./flat.mapper";
import {createRoomDtoToModel, entityToRoom, toRoomResponseModel} from "./room.mapper";
import {createCountryHouseDtoToModel, entityToCountryHouse, toCountryHouseResponseModel} from "./country-house.mapper";

export function createLivingDtoToModel(dto: CreateLivingRequestDto): CreateLivingModel {
    return {
        totalFloors: dto.totalFloors,
        totalRooms: dto.totalRooms,
        area: dto.area,
        meter: dto.meter,
        other: dto.other,
        livingType: dto.livingType,
        comfort: createComfortDtoToModel(dto.comfort),
        flat: createFlatDtoToModel(dto.flat),
        room: createRoomDtoToModel(dto.room),
        countryHouse: createCountryHouseDtoToModel(dto.countryHouse),
    };
}

export function entityToLiving(entity: LivingEntity): Living {
    return {
        id: entity.id,
        totalFloors: entity.totalFloors,
        totalRooms: entity.totalRooms,
        area: +entity.area,
        meter: +entity.meter,
        other: +entity.other,
        livingType: entity.livingType,
        comfort: entity.comfort.id ? entityToComfort(entity.comfort) : undefined,
        flat: entity.flat?.id ? entityToFlat(entity.flat) : undefined,
        room: entity.room?.id ?  entityToRoom(entity.room) : undefined,
        countryHouse: entity.countryHouse?.id ?  entityToCountryHouse(entity.countryHouse) : undefined
    };
}

export function toLivingResponseModel(model: Living): LivingResponseDto {
    return {
        totalFloors: model.totalFloors,
        totalRooms: model.totalRooms,
        area: model.area,
        meter: model.meter,
        other: model.other,
        livingType: model.livingType,
        comfort: model.comfort ? toComfortResponseModel(model.comfort) : undefined,
        flat: model.flat ? toFlatResponseModel(model.flat) : undefined,
        room: model.room ? toRoomResponseModel(model.room) : undefined,
        countryHouse: model.countryHouse ? toCountryHouseResponseModel(model.countryHouse) : undefined,
    };
}