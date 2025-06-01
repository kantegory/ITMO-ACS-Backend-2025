import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from "typeorm"
import { Character } from "./Character"
import { Effect } from "./Effect"

@Entity()
export class EffectToCharacter {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'integer'})
    value: number

    @CreateDateColumn()
    getDate: Date

    @DeleteDateColumn()
    deleteDate: Date

    @ManyToOne(() => Effect)
    effect: Effect

    @ManyToOne(() => Character, (character) => character.effects)
    character: Character
}