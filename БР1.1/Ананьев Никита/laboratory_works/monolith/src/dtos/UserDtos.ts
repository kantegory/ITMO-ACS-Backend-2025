import { ResponsePropertyDto } from "./PropertyDtos"
import { ResponseRentDto } from "./RentDtos"
import { MessageDto } from "./MessageDtos"
import { IsEmail, IsString, IsOptional, IsDateString, IsNumber, IsArray } from 'class-validator';

export class CreateUserDto {
    @IsEmail()
    readonly email!: string

    @IsString()
    readonly password!:string

    @IsString()
    readonly firstName!: string

    @IsOptional()
    @IsString()
    readonly lastName: string | undefined

    @IsDateString()
    readonly birthDate!: Date
}

export class ResponseUserDto {
    @IsNumber()
    id?: number

    @IsString()
    email!: string

    @IsString()
    firstName!: string

    @IsOptional()
    @IsString()
    lastName: string | undefined

    @IsDateString()
    birthDate!: Date

    @IsArray()
    properties: ResponsePropertyDto[] = []

    @IsArray()
    rents: ResponseRentDto[] = []

    @IsArray()
    sentMessages: MessageDto[] = []

    @IsArray()
    receivedMessages: MessageDto[] = []

    constructor(init?: Partial<ResponseUserDto>) {
        Object.assign(this, init);
    }
}

export class LoginDto {
    @IsString()
    readonly email!: string

    @IsString()
    readonly password!: string
}