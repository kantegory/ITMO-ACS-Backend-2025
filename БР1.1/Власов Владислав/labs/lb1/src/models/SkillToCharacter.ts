import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Character } from "./Character"
import { Skill } from "./Skill"

@Entity()
export class SkillToCharacter {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'integer'})
    value: number

    @ManyToOne(() => Skill)
    skill: Skill

    @ManyToOne(() => Character, (character) => character.skills)
    character: Character
}