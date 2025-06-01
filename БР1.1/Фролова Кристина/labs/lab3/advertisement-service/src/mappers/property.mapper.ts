import {createLivingDtoToModel, entityToLiving, toLivingResponseModel} from "./living.mapper";
import {PropertyEntity} from "../entities/property.entity";
import {Property} from "../models/models/property.model";
import {PropertyResponseDto} from "@rent/shared";
import {CreatePropertyModel} from "../models/requests/property/property-create-request.model";
import {CreatePropertyRequestDto} from "../models/requests/property/property-create-request.dto";

export function createPropertyDtoToModel(dto: CreatePropertyRequestDto): CreatePropertyModel {
    return {
        totalArea: dto.totalArea,
        location: dto.location,
        living: createLivingDtoToModel(dto.living),
    };
}

export function entityToProperty(entity: PropertyEntity): Property {
    return {
        id: entity.id,
        totalArea: +entity.totalArea,
        location: entity.location,
        living: entity.living.id ? entityToLiving(entity.living) : undefined
    };
}

export function toPropertyResponseModel(model: Property): PropertyResponseDto {
    return {
        totalArea: model.totalArea,
        location: model.location,
        living: model.living ? toLivingResponseModel(model.living) : undefined,
    };
}