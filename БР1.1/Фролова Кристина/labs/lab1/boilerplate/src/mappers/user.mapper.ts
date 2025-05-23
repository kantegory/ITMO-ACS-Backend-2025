import {UserEntity} from "../entities/user.entity";
import {User} from "../models/user.model";
import {RegisterResponseModel} from "../models/register-response.model";

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

export function toRegisterResponseModel(user: User): RegisterResponseModel {
    return {
        id: user.id,
        mail: user.mail,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export function toUserResponseModel(user: User): RegisterResponseModel {
    return {
        id: user.id,
        mail: user.mail,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}