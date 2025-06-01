import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm"


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

    @Column({type: 'integer'})
    authorId: number

    @Column({type: 'integer'})
    characterId: number
}