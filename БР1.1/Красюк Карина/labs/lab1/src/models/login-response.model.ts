import {IsString} from "class-validator";
import {Type} from "class-transformer";

export class LoginResponseModel {
    @IsString()
    @Type(() => String)
    accessToken: string;
}