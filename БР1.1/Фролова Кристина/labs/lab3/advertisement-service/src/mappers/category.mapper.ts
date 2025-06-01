import {CategoryEntity} from "../entities/category.entity";
import {Category} from "../models/models/category.model";
import {CategoryResponseDto} from "@rent/shared";
import {CreateCategoryRequestDto} from "../models/requests/category/category-create-request.dto";
import {CreateCategoryRequestModel} from "../models/requests/category/category-create-request.model";
import {UpdateCategoryRequestDto} from "../models/requests/category/category-update-request.dto";

export function entityToCategory(entity: CategoryEntity): Category {
    return {
        id: entity.id,
        name: entity.name,
    };
}

export function toCategoryResponseModel(category: Category): CategoryResponseDto {
    return {
        id: category.id,
        name: category.name,
    };
}

export function createRequestToCreateData(createRequest: CreateCategoryRequestDto): CreateCategoryRequestModel {
    return {
        name: createRequest.name
    }
}


export function updateRequestToCategory(updateRequest: UpdateCategoryRequestDto): Category {
    return {
        name: updateRequest.name
    }
}

export function categoryToEntity(category: Category): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    categoryEntity.id = category.id;
    categoryEntity.name = category.name;
    return categoryEntity;
}