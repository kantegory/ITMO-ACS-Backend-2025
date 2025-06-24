import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from "typeorm"
import { Condition } from "./Condition"
import { Item } from "./Item"
import { Edge } from "./Edge"
import { EffectToCharacter } from "./EffectToCharacter"

export enum EffectType {
    Attact = "attack",
    Defence = "defence",
    Universal = "universal"
}

@Entity()
export class Effect {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'text', default: ""})
    description: string

    @Column({
        type: 'enum',
        enum: EffectType,
        default: EffectType.Universal
    })
    type: EffectType

    @Column({type: 'boolean'})
    isTemp: boolean

    @Column({
        default: 0,
        type: 'integer'
    })
    ActionTime: number

    @OneToMany(() => Condition, condition => condition.effect)
    conditions: Condition[]

    @OneToMany(() => EffectToCharacter, character => character.effect)
    characters: EffectToCharacter[]
}