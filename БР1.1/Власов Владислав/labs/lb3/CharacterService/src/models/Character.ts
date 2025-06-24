import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { CharacterDescription } from './CharacterDescription';
import { SkillToCharacter } from './SkillToCharacter';
import { Race } from "./Race";
import { Edge } from "./Edge";
import { ItemToCharacter } from "./ItemToCharacter";
import { EffectToCharacter } from "./EffectToCharacter";

export enum CharacterRank {
    NOVICE = 'novice',
    SEASONER = 'seasoner',
    VETERAN = 'veteran',
    HEROIC = 'heroic',
    LEGEND = "legend",
}

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'integer'})
    playerId: number

    @CreateDateColumn()
    createDate: Date

    @Column({type: 'varchar', default: ""})
    name: string

    @Column({type: 'integer', default: 0})
    weight: number

    // Характеристики:
    
    // Ловкость
    @Column({type: 'integer', default: 4})
    agility: number

    // Смекалка
    @Column({type: 'integer', default: 4})
    smarts: number
    
    // Характер
    @Column({type: 'integer', default: 4})
    spirit: number

    // Сила
    @Column({type: 'integer', default: 4})
    strenght: number

    // Выносливость
    @Column({type: 'integer', default: 4})
    vigor: number

    // Саб статы:

    // Шаг
    @Column({type: 'integer', default: 6})
    pace: number

    // Кость бега
    @Column({type: 'integer', default: 6})
    run: number

    // Защита
    @Column({type: 'integer', default: 2})
    parry: number

    // Стойкость
    @Column({type: 'integer', default: 4})
    toughness: number

    // Броня
    @Column({type: 'integer', default: 0})
    armor: number

    // Хиты (обычно 3 или 1)
    @Column({type: 'integer'})
    hp: number

    // Раны
    @Column({type: 'integer', default: 0})
    wounds: number

    // Усталость
    @Column({type: 'integer', default: 0})
    fatigue: number

    // Усталость
    @Column({type: 'integer', default: 2})
    maxFatigue: number

    // Состояния:

    @Column({type: 'boolean', default: false})
    isShaken: boolean

    @Column({type: 'boolean', default: false})
    isDead: boolean

    // Прочее

    @Column({type: 'integer', default: 10})
    maxWeight: number

    @Column({type: 'boolean'})
    isWildCard: boolean

    @Column({type: 'integer', default: 6})
    wildDice: number

    @Column({type: 'integer', default: 0})
    advance: number

    @Column({
        type: "enum",
        enum: CharacterRank,
        default: CharacterRank.NOVICE,
    })
    rank: CharacterRank

    // Пользовательские настройки

    @Column({type: 'boolean', default: false})
    isVisible: boolean

    // Арт пока не предусмотрен

    // Связи:
    
    @OneToOne(() => CharacterDescription, { cascade: true })
    @JoinColumn()
    description: CharacterDescription

    @ManyToOne(() => Race)
    race: Race
    
    @ManyToMany(() => Edge)
    @JoinTable()
    edges: Edge[]

    @OneToMany(() => SkillToCharacter, skill => skill.character)
    skills: SkillToCharacter[]

    @OneToMany(() => ItemToCharacter, item => item.character)
    items: ItemToCharacter[]

    @OneToMany(() => EffectToCharacter, effect => effect.character)
    effects: EffectToCharacter[]
}