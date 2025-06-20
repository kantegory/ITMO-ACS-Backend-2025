import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToOne, OneToMany, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User";
import { CharacterDescription } from './CharacterDescription';
import { SkillToCharacter } from './SkillToCharacter';
import { Roll } from "./Roll";
import { Race } from "./Race";
import { Edge } from "./Edge";
import { ItemToCharacter } from "./ItemToCharacter";
import { EffectToCharacter } from "./EffectToCharacter";

enum CharacterRank {
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

    @ManyToOne(() => User, user => user.characters)
    player: User

    @CreateDateColumn()
    createDate: Date

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'integer'})
    weight: number

    // Характеристики:
    
    // Ловкость
    @Column({type: 'integer'})
    agility: number

    // Смекалка
    @Column({type: 'integer'})
    smarts: number
    
    // Характер
    @Column({type: 'integer'})
    spirit: number

    // Сила
    @Column({type: 'integer'})
    strenght: number

    // Выносливость
    @Column({type: 'integer'})
    vigor: number

    // Саб статы:

    // Шаг
    @Column({type: 'integer'})
    pace: number

    // Кость бега
    @Column({type: 'integer'})
    run: number

    // Защита
    @Column({type: 'integer'})
    parry: number

    // Стойкость
    @Column({type: 'integer'})
    toughness: number

    // Броня
    @Column({type: 'integer'})
    armor: number

    // Хиты (обычно 3 или 1)
    @Column({type: 'integer'})
    hp: number

    // Раны
    @Column({type: 'integer'})
    wounds: number

    // Усталость
    @Column({type: 'integer'})
    fatigue: number

    // Состояния:

    @Column({type: 'boolean'})
    isShaken: boolean

    @Column({type: 'boolean'})
    isDead: boolean

    // Прочее

    @Column({type: 'integer'})
    maxWeight: number

    @Column({type: 'boolean'})
    isWildCard: boolean

    @Column({type: 'integer'})
    wildDice: number

    @Column({type: 'integer'})
    advance: number

    @Column({
        type: "enum",
        enum: CharacterRank,
        default: CharacterRank.NOVICE,
    })
    rank: CharacterRank

    // Пользовательские настройки

    @Column({type: 'boolean'})
    isVisible: boolean

    // Арт пока не предусмотрен

    // Связи:

    @OneToOne(() => CharacterDescription)
    @JoinColumn()
    description: CharacterDescription

    @ManyToOne(() => Race)
    race: Race

    @OneToMany(() => Roll, roll => roll.character)
    rolls: Roll[]
    
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