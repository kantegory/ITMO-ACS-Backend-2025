import {IsEmail, IsEnum, IsOptional, IsString} from "class-validator";
import {Role} from "@prisma/client";


export class CreateUsersDto {
    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}

export type TUpdateUsersDto = Partial<CreateUsersDto>;