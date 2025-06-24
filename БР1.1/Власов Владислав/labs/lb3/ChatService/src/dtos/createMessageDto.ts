import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"

export class CreateMessageDto
{
    @IsString()
    @Type(() => String)
    text: string
}