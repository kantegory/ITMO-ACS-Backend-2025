import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { Skill } from "./Skill"
import { IsNumber, ValidateNested } from "class-validator"
import { Type } from "class-transformer"

export class SkillToCharacter {
    
    @IsNumber()
    @Type(() => Number)
    id: number

    @IsNumber()
    @Type(() => Number)
    level: number

    @ValidateNested()
    @Type(() => Skill)
    skill: Skill

    @IsNumber()
    @Type(() => Number)
    skillId: number

    @IsNumber()
    @Type(() => Number)
    characterId: number
}