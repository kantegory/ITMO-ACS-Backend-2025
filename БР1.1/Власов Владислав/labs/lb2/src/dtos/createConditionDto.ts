import { Type } from "class-transformer"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { ConditionType, TargetType } from "../models/Condition"

export class CreateConditionDto
{
    @IsEnum(ConditionType)
    @Type(() => String)
    type: ConditionType

    @IsEnum(TargetType)
    @Type(() => String)
    targetType: TargetType

    @IsString()
    @Type(() => String)
    parameter: string

    @IsString()
    @Type(() => String)
    operand: string

    @IsString()
    @Type(() => String)
    value: string

    @IsNumber()
    @Type(() => Number)
    effect: number
}
