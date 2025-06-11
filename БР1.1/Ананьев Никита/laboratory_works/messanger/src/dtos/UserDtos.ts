import { IsString, IsNumber, IsEmail, IsPhoneNumber } from 'class-validator';

export class UserDto {
    @IsNumber()
    id?: number

    @IsString()
    name?: string

    @IsEmail()
    email?: string

    @IsPhoneNumber()
    phone?: string
}