import {CreateComfortRequestDto} from "../models/requests/comfort/create-comfort-request.dto";
import {CreateComfortModel} from "../models/requests/comfort/create-comfort-request.model";
import {ComfortEntity} from "../entities/comfort.entity";
import {Comfort} from "../models/models/comfort.model";
import {ComfortResponseDto} from "../models/responses/comfort-response.dto";

export function createComfortDtoToModel(dto: CreateComfortRequestDto): CreateComfortModel {
    return {
        renovation: dto.renovation,
        devices: dto.devices,
        internet: dto.internet,
        tv: dto.tv,
        furniture: dto.furniture,
    };
}

export function entityToComfort(entity: ComfortEntity): Comfort {
    return {
        id: entity.id,
        renovation: entity.renovation,
        devices: entity.devices,
        internet: entity.internet,
        tv: entity.tv,
        furniture: entity.furniture,
        living: entity.living ? { id: entity.living.id } as any : undefined as any,
    };
}

export function toComfortResponseModel(model: Comfort): ComfortResponseDto {
    return { ...model };
}