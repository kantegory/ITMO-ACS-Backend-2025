import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, JoinColumn } from "typeorm"
import { Character } from "./Character"
import { Effect } from "./Effect"

@Entity()
export class EffectToCharacter {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Effect)
    @JoinColumn({ name: 'effectId' })
    effect: Effect

    @Column({type: 'integer'})
    effectId: number

    @ManyToOne(() => Character, (character) => character.effects)
    @JoinColumn({ name: 'characterId' })
    character: Character

    @Column({type: 'integer'})
    characterId: number
}