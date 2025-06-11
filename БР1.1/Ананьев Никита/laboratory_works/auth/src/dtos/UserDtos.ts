import { IsEmail, IsString, IsOptional, IsDateString, IsNumber } from 'class-validator';

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