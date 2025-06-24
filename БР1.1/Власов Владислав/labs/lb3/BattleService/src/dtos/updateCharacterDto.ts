import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { CharacterRank } from "../models/Character"

@Entity()
export class UpdateCharacterDto {

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

    @IsBoolean()
    @Type(() => Boolean)
    isShaken: boolean

    @IsNumber()
    @Type(() => Number)
    isDead: boolean

    // Прочее

    @IsNumber()
    @Type(() => Number)
    maxWeight: number

    @IsNumber()
    @Type(() => Number)
    wildDice: number

    @IsNumber()
    @Type(() => Number)
    advance: number

    @IsString()
    @Type(() => String)
    rank: CharacterRank

    // Пользовательские настройки

    @IsNumber()
    @Type(() => Number)
    isVisible: boolean
}