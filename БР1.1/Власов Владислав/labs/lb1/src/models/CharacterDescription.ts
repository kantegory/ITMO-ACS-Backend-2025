import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"

@Entity()
export class CharacterDescription {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    background: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'varchar'})
    gender: string

    @Column({type: 'varchar'})
    age: string

    @Column({type: 'integer'})
    height: number

    @Column({type: 'text'})
    notes: string
}
