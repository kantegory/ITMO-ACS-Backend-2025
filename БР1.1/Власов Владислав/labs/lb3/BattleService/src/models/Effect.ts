import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm"

export enum EffectType {
    Attact = "attack",
    Defence = "defence",
    Universal = "universal"
}

export class Effect {

    @IsNumber()
    @Type(() => Number)
    id: number

    @IsString()
    @Type(() => String)
    name: string

    @IsString()
    @Type(() => String)
    description: string

    @IsEnum(EffectType)
    @Type(() => String)
    type: EffectType

    @IsNumber()
    @Type(() => Boolean)
    isTemp: boolean

    @IsNumber()
    @Type(() => Number)
    ActionTime: number
}