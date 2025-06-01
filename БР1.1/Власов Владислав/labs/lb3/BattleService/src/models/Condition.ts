import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { Effect } from "./Effect"
import { Type } from "class-transformer"
import { IsEnum, IsNumber, IsString } from "class-validator"

export enum ConditionType {
    Triggering = "triggering",
    Effect = "effect",
    Ending = "ending"
}

export enum TargetType {
    Target = "target",
    Self = "self",
}

export class Condition {

    @IsNumber()
    @Type(() => Number)
    id: number

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
    effectId: number
}

function IsEmun(): (target: Condition, propertyKey: "type") => void {
    throw new Error("Function not implemented.")
}
