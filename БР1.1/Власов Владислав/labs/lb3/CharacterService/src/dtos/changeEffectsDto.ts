import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { ItemType } from "../models/Item"

export class ChangeEffectsDto
{
    @IsNumber()
    @Type(() => Number)
    entityId: number

    @IsArray()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    effectsId: number[]
}
