import {IsEmail, IsString} from "class-validator";
import {Type} from "class-transformer";

export class LoginRequestModel {
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;
}