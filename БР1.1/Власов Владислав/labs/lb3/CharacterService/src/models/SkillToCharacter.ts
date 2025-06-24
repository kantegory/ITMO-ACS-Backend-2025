import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { Character } from "./Character"
import { Skill } from "./Skill"

@Entity()
export class SkillToCharacter {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'integer', default: 4})
    level: number

    @ManyToOne(() => Skill)
    @JoinColumn({ name: 'skillId' })
    skill: Skill

    @Column({type: 'integer'})
    skillId: number

    @ManyToOne(() => Character, (character) => character.skills)
    @JoinColumn({ name: 'characterId' })
    character: Character

    @Column({type: 'integer'})
    characterId: number
}