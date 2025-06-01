import { Type } from "class-transformer"
import { IsEnum, IsNumber, IsString } from "class-validator"
import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm"

export enum CharacterAttribut {
    AGILITY = "agility",
    SMARTS = "smarts",
    SPIRIT = "spirit",
    STRENGHT = "strenght",
    VIGOR = "vigor",
}

export class Skill {

    @IsNumber()
    @Type(() => Number)
    id: number

    @IsString()
    @Type(() => String)
    name: string

    @IsEnum(CharacterAttribut)
    @Type(() => String)
    attribute: CharacterAttribut
}