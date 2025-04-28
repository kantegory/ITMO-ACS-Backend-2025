import { ResponsePropertyDto } from "./PropertyDtos"
import { ResponseRentDto } from "./RentDtos"
import { MessageDto } from "./MessageDtos"

export class CreateUserDto {
    readonly email!: string
    readonly password!:string
    readonly firstName!: string
    readonly lastName: string | undefined
    readonly birthDate!: Date
}

export class ResponseUserDto {
    id?: number
    email!: string
    password!:string
    firstName!: string
    lastName: string | undefined
    birthDate!: Date
    properties: ResponsePropertyDto[] = []
    rents: ResponseRentDto[] = []
    sentMessages: MessageDto[] = []
    receivedMessages: MessageDto[] = []

    constructor(init?: Partial<ResponseUserDto>) {
        Object.assign(this, init);
    }
}

export class LoginDto {
    readonly email!: string
    readonly password!: string
}