import { CreateUserDto, ResponseUserDto } from "../dtos/UserDtos";

import { User } from "../models/UserModel";
import { Property } from "../models/PropertyModel";
import { PropertyMapper } from "./PropertyMapper";
import { Message } from "../models/MessageModel";
import { MessageMapper } from "./MessageMapper";
import { Rent } from "../models/RentModel";
import { RentMapper } from "./RentMapper";

export class UserMapper {

    static toModel(dto: CreateUserDto): User {
        const { ...info } = dto
        const user: User = new User(info)
        return user
    }

    static toDto(model: User): ResponseUserDto {
        const { rents, properties, sentMessages, receivedMessages, password, ...rest } = model;
        const dto = new ResponseUserDto(rest);

        dto.properties = properties?.map((prop: Property) => PropertyMapper.toDto(prop)) ?? []
        dto.rents = rents?.map((rent: Rent) => RentMapper.toDto(rent)) ?? []

        dto.sentMessages = model.sentMessages?.map((msg: Message) => MessageMapper.toDto(msg)) ?? []
        dto.receivedMessages = model.receivedMessages?.map((msg: Message) => MessageMapper.toDto(msg)) ?? []
        return dto;
    }
}