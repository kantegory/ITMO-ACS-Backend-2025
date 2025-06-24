import {FlatEntity} from "../entities/flat.entity";
import {Flat} from "../models/models/flat.model";
import {FlatResponseDto} from "../models/responses/flat-response.dto";
import {CreateFlatRequestDto} from "../models/requests/flat/flat-create-request.dto";
import {CreateFlatModel} from "../models/requests/flat/flat-create-request.model";

export function entityToFlat(entity: FlatEntity): Flat {
    return {
        id: entity?.id,
        floor: entity?.floor,
        kitchenArea: entity?.kitchenArea,
        livingArea: +entity?.livingArea,
    }
}

export function toFlatResponseModel(flat: Flat): FlatResponseDto {
    return {
        floor: flat.floor,
        kitchenArea: flat.kitchenArea,
        livingArea: flat.livingArea,
    };
}

export function createFlatDtoToModel(dto: CreateFlatRequestDto): CreateFlatModel {
    return {
        floor: dto.floor,
        kitchenArea: dto.kitchenArea,
        livingArea: dto.livingArea,
    };
}