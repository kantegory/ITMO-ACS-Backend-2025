import {UserEntity} from "../entities/user.entity";
import {RegisterResponseDto} from "../models/responses/register-response.dto";
import {UpdateUserRequestModel} from "../models/requests/user/user-update-request.model";
import {UpdateUserRequestDto} from "../models/requests/user/user-update-request.dto";
import {User} from "../models/models/user.model";

export function toUser(entity: UserEntity): User {
    return {
        id: entity.id,
        mail: entity.mail,
        password: entity.password,
        firstName: entity.firstName,
        lastName: entity.lastName,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
    };
}

export function toUserResponseModel(user: User): RegisterResponseDto {
    return {
        id: user.id,
        mail: user.mail,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export function updateUserDtoToUpdateModel(userDto: UpdateUserRequestDto): UpdateUserRequestModel {
    return {
        mail: userDto.mail,
        firstName: userDto.firstName,
        lastName: userDto.lastName,
    }
}