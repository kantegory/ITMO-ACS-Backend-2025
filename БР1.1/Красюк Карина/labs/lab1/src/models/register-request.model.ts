import {IsEmail, IsString} from "class-validator";
import {Type} from "class-transformer";

export class RegisterRequestModel {
    @IsString()
    @Type(() => String)
    name: string;
    
    @IsEmail()
    @Type(() => String)
    email: string;

    @IsString()
    @Type(() => String)
    password: string;
}