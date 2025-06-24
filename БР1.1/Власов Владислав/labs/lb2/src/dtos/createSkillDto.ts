import { Type } from "class-transformer"
import { IsBoolean, IsEnum, IsNumber, IsString } from "class-validator"
import { CharacterAttribut } from "../models/Skill"

export class CreateSkillDto
{
    @IsString()
    @Type(() => String)
    name: string

    @IsEnum(CharacterAttribut)
    @Type(() => String)
    attribute: CharacterAttribut
}