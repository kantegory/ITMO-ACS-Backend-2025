import {CountryHouseEntity} from "../entities/country-house.entity";
import {CountryHouse} from "../models/models/country-house.model";
import {CountryHouseResponseDto} from "../models/responses/country-house-response.dto";
import {CreateCountryHouseRequestDto} from "../models/requests/country-house/country-house-create-request.dto";
import {CreateCountryHouseModel} from "../models/requests/country-house/country-house-create-request.model";

export function entityToCountryHouse(entity: CountryHouseEntity): CountryHouse {
    return {
        id: entity.id,
        landArea: +entity.landArea,
        communications: entity.communications,
        recreations: entity.recreations,
        living: { id: entity.living.id } as any,
    };
}

export function toCountryHouseResponseModel(house: CountryHouse): CountryHouseResponseDto {
    return {
        landArea: house.landArea,
        communications: house.communications,
        recreations: house.recreations,
    };
}

export function createCountryHouseDtoToModel(dto: CreateCountryHouseRequestDto): CreateCountryHouseModel {
    return {
        landArea: dto.landArea,
        communications: dto.communications,
        recreations: dto.recreations,
    };
}
