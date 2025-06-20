import {IsEmail, IsOptional, IsString} from "class-validator";

export class RegistrationDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;

    @IsString()
    password: string;
}

export class LoginDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    avatarUrl?: string;
}