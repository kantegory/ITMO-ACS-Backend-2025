import { Type } from "class-transformer"
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class UpdateCharacterDescrioptionDto
{
    @IsString()
    @Type(() => String)
    background: string

    @IsString()
    @Type(() => String)
    description: string

    @IsString()
    @Type(() => String)
    gender: string

    @IsString()
    @Type(() => String)
    age: string

    @IsNumber()
    @Type(() => Number)
    height: number

    @IsString()
    @Type(() => String)
    notes: string
}