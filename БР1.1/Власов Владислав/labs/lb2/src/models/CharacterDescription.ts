import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"

@Entity()
export class CharacterDescription {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text', default: ""})
    background: string

    @Column({type: 'text', default: ""})
    description: string

    @Column({type: 'varchar', default: ""})
    gender: string

    @Column({type: 'varchar', default: ""})
    age: string

    @Column({type: 'integer', default: 0})
    height: number

    @Column({type: 'text', default: ""})
    notes: string
}
