import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { EffectType } from "../models/Effect"

export class CreateEffectDto
{
    @IsString()
    @Type(() => String)
    name: string

    @IsString()
    @Type(() => String)
    description?: string
    
    @IsBoolean()
    @Type(() => Boolean)
    isTemp: boolean

    @IsNumber()
    @Type(() => Number)
    ActionTime: number

    @IsEnum(EffectType)
    @Type(() => String)
    type: EffectType
}
