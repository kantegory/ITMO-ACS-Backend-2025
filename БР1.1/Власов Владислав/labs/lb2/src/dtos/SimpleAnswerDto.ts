import { Type } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class SimpleAnswerDto {
    @IsString()
    @Type(() => String)
    message: string;
}