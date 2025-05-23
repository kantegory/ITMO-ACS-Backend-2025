import {PhotoEntity} from "../entities/photo.entity";
import {Photo} from "../models/models/photo.model";
import {PhotoResponseDto} from "../models/responses/photo-response.dto";
import {CreatePhotoRequestDto} from "../models/requests/photo/photo-create-request.dto";
import {CreatePhotoModel} from "../models/requests/photo/photo-create-request.model";
import {UpdatePhotoRequestDto} from "../models/requests/photo/photo-update-request.dto";
import {UpdatePhotoRequestModel} from "../models/requests/photo/photo-update-request.model";

export function entityToPhoto(entity: PhotoEntity): Photo {
    return {
        id: entity.id,
        path: entity.path,
    };
}

export function toPhotoResponseModel(photo: Photo): PhotoResponseDto {
    return {
        id: photo.id,
        path: photo.path,
    };
}

export function createPhotoRequestDtoToModel(dto: CreatePhotoRequestDto): CreatePhotoModel {
    return {
        path: dto.path,
    };
}

export function updatePhotoRequestDtoToModel(dto: UpdatePhotoRequestDto): UpdatePhotoRequestModel {
    return {
        path: dto.path,
    };
}
