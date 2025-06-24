import {
    IsString,
    IsEmail,
    Length,
    IsOptional,
    IsPhoneNumber
} from 'class-validator'

export class CreateUserDto {
    @IsString()
    @Length(1, 100)
    name!: string

    @IsEmail()
    email!: string

    @IsOptional()
    @IsPhoneNumber()
    phone?: string

    @IsString()
    @Length(6, 50)
    password!: string
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    name?: string

    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsPhoneNumber()
    phone?: string

    @IsOptional()
    @IsString()
    @Length(6, 50)
    password?: string
}