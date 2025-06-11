import { CreateUserDto, ResponseUserDto } from "../dtos/UserDtos";

import { User } from "../models/UserModel";

export class UserMapper {
    static toModel(dto: CreateUserDto): User {
        const { ...info } = dto
        const user: User = new User(info)
        return user
    }

    static toDto(model: User): ResponseUserDto {
        const { password, ...rest } = model;
        const dto = new ResponseUserDto(rest);
        return dto;
    }
}
