import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { ItemType } from "../models/Item"

export class CreateItemDto
{
    @IsString()
    @Type(() => String)
    name: string

    @IsString()
    @Type(() => String)
    description?: string

    @IsEnum(ItemType)
    @Type(() => String)
    type: ItemType

    @IsNumber()
    @Type(() => Number)
    cost: number

    @IsNumber()
    @Type(() => Number)
    weight: number
}
