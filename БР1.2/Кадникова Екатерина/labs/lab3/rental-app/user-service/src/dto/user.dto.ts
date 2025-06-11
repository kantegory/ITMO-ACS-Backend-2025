import { IsEmail, Length, IsEnum, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from '../models/role.enum';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(RoleEnum)
    role?: RoleEnum;
}