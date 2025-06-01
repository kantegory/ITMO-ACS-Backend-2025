import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, IsEnum } from 'class-validator';
import { Role } from '../models/enums/role';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 100)
    username?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}