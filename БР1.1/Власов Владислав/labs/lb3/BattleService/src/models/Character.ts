import { Type } from "class-transformer"
import { IsArray, IsBoolean, IsDate, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator"
import { Entity, PrimaryGeneratedColumn } from "typeorm"
import { SkillToCharacter } from "./SkillToCharacter"

export enum CharacterRank {
    NOVICE = 'novice',
    SEASONER = 'seasoner',
    VETERAN = 'veteran',
    HEROIC = 'heroic',
    LEGEND = "legend",
}

export class Character {

    @IsNumber()
    @Type(() => Number)
    id: number

    @IsNumber()
    @Type(() => Number)
    playerId: number

    @IsDate()
    @Type(() => Date)
    createDate: Date

    @IsString()
    @Type(() => String)
    name: string

    @IsNumber()
    @Type(() => Number)
    weight: number

    // Характеристики:
    
    // Ловкость
    @IsNumber()
    @Type(() => Number)
    agility: number

    // Смекалка
    @IsNumber()
    @Type(() => Number)
    smarts: number
    
    // Характер
    @IsNumber()
    @Type(() => Number)
    spirit: number

    // Сила
    @IsNumber()
    @Type(() => Number)
    strenght: number

    // Выносливость
    @IsNumber()
    @Type(() => Number)
    vigor: number

    // Саб статы:

    // Шаг
    @IsNumber()
    @Type(() => Number)
    pace: number

    // Кость бега
    @IsNumber()
    @Type(() => Number)
    run: number

    // Защита
    @IsNumber()
    @Type(() => Number)
    parry: number

    // Стойкость
    @IsNumber()
    @Type(() => Number)
    toughness: number

    // Броня
    @IsNumber()
    @Type(() => Number)
    armor: number

    // Хиты (обычно 3 или 1)
    @IsNumber()
    @Type(() => Number)
    hp: number

    // Раны
    @IsNumber()
    @Type(() => Number)
    wounds: number

    // Усталость
    @IsNumber()
    @Type(() => Number)
    fatigue: number

    // Усталость
    @IsNumber()
    @Type(() => Number)
    maxFatigue: number

    // Состояния:

    @IsNumber()
    @Type(() => Boolean)
    isShaken: boolean

    @IsNumber()
    @Type(() => Boolean)
    isDead: boolean

    // Прочее

    @IsNumber()
    @Type(() => Number)
    maxWeight: number

    @IsBoolean()
    @Type(() => Boolean)
    isWildCard: boolean

    @IsNumber()
    @Type(() => Number)
    wildDice: number

    @IsNumber()
    @Type(() => Number)
    advance: number

    @IsEnum(CharacterRank)
    @Type(() => String)
    rank: CharacterRank

    // Пользовательские настройки

    @IsBoolean()
    @Type(() => Boolean)
    isVisible: boolean

    // Арт пока не предусмотрен

    // Связи:
    
    @IsNumber()
    @Type(() => Number)
    descriptionId: number

    @IsNumber()
    @Type(() => Number)
    raceId: number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SkillToCharacter)
    skills: SkillToCharacter[]
}