import { Entity, PrimaryGeneratedColumn, Column, } from "typeorm"

enum CharacterRank {
    AGILITY = "agility",
    SMARTS = "smarts",
    SPIRIT = "spirit",
    STRENGHT = "strenght",
    VIGOR = "vigor",
}

@Entity()
export class Skill {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    name: string

    @Column({
        type: 'enum',
        enum: CharacterRank,
    })
    atribute: CharacterRank
}