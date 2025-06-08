import {RegisterRequestDto} from "../models/requests/auth/register-request.dto";
import {RegisterRequestModel} from "../models/requests/auth/register-request.model";
import {LoginRequestDto} from "../models/requests/auth/login-request.dto";
import {LoginRequestModel} from "../models/requests/auth/login-request.model";
import {User} from "../models/models/user.model";
import {RegisterResponseDto} from "../models/responses/register-response.dto";

export function toRegisterRequestModel(dto: RegisterRequestDto): RegisterRequestModel {
    return {
        mail: dto.mail,
        password: dto.password,
        firstName: dto.firstName,
        lastName: dto.lastName,
    };
}

export function toLoginRequestModel(dto: LoginRequestDto): LoginRequestModel {
    return {
        mail: dto.mail,
        password: dto.password,
    };
}

export function toLoginResponseDto(token: string) {
    return {
        accessToken: token
    }
}

export function toRegisterResponseModel(user: User): RegisterResponseDto {
    return {
        id: user.id,
        mail: user.mail,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
