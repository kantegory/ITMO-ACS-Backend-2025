import { Type } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;
}