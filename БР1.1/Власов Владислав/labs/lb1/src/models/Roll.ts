import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { User } from "./User";
import { Character } from "./Character";
import { Effect } from "./Effect";


@Entity()
export class Roll {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'integer'})
    diceResult: number

    @Column({type: 'integer'})
    WildDiceResult: number

    @Column({type: 'varchar'})
    ability: string

    @ManyToOne(() => User, user => user.messages)
    author: User

    @ManyToOne(() => Character, character => character.rolls)
    character: Character

    @ManyToMany(() => Effect)
    @JoinTable()
    effects: Effect[]
}