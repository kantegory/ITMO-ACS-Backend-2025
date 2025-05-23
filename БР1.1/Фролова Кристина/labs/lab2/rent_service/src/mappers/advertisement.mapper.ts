import {AdvertisementEntity} from "../entities/advertisement.entity";
import {Advertisement} from "../models/models/advertisement.model";
import {CreateAdvertisementRequestDto} from "../models/requests/advertisement/advertisement-create-request.dto";
import {UpdateAdvertisementRequestDto} from "../models/requests/advertisement/advertisement-update-request.dto";
import {toUser, toUserResponseModel} from "./user.mapper";
import {entityToCategory, toCategoryResponseModel} from "./category.mapper";
import {createPhotoRequestDtoToModel, entityToPhoto, toPhotoResponseModel} from "./photo.mapper";
import {AdvertisementResponseDto} from "../models/responses/advertisement-response.dto";
import {createRulesDtoToModel, entityToRules, toRulesResponseModel} from "./rules.mapper";
import {createPropertyDtoToModel, entityToProperty, toPropertyResponseModel} from "./property.mapper";
import {CreateAdvertisementModel} from "../models/requests/advertisement/advertisement-create-request.model";
import {UpdateAdvertisementModel} from "../models/requests/advertisement/advertisement-update-request.model";

export function entityToAdvertisement(entity: AdvertisementEntity): Advertisement {
    return {
        id: entity.id,
        title: entity.title,
        description: entity.description,
        status: entity.status,
        rentType: entity.rentType,
        createdAt: entity.createdAt,
        pricePerPeriod: +entity.pricePerPeriod,
        commission: +entity.commission,
        deposit: +entity.deposit,
        owner: toUser(entity.owner),
        category: entityToCategory(entity.category),
        rules: entity.rules?.id ? entityToRules(entity.rules) : undefined,
        photos: entity.photos?.map(entityToPhoto) ?? [],
        property: entity.property?.id ? entityToProperty(entity.property) : undefined,
    };
}

export function toAdvertisementResponseModel(advertisement: Advertisement): AdvertisementResponseDto {
    return {
        id: advertisement.id,
        title: advertisement.title,
        description: advertisement.description,
        status: advertisement.status,
        rentType: advertisement.rentType,
        createdAt: advertisement.createdAt,
        pricePerPeriod: advertisement.pricePerPeriod,
        commission: advertisement.commission,
        deposit: advertisement.deposit,
        owner: toUserResponseModel(advertisement.owner),
        category: toCategoryResponseModel(advertisement.category),
        property: advertisement.property?.id ? toPropertyResponseModel(advertisement.property) : undefined,
        rules: advertisement.rules?.id ? toRulesResponseModel(advertisement.rules) : undefined,
        photos: advertisement.photos?.map(toPhotoResponseModel),
    };
}

export function createAdvertisementRequestToModel(request: CreateAdvertisementRequestDto): CreateAdvertisementModel {
    return {
        title: request.title,
        description: request.description,
        categoryId: request.categoryId,
        rentType: request.rentType,
        pricePerPeriod: request.pricePerPeriod,
        commission: request.commission,
        deposit: request.deposit,
        ownerId: request.ownerId,
        property: createPropertyDtoToModel(request.property),
        rules: createRulesDtoToModel(request.rules),
        photos: request.photos.map(createPhotoRequestDtoToModel),
    };
}

export function updateAdvertisementRequestToModel(request: UpdateAdvertisementRequestDto): UpdateAdvertisementModel {
    return {
        title: request.title,
        description: request.description,
        rentType: request.rentType,
        status: request.status,
        pricePerPeriod: request.pricePerPeriod,
        commission: request.commission,
        deposit: request.deposit,
    };
}
