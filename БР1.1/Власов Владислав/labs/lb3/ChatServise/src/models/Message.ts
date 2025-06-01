import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"


@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    text: string

    @Column({type: 'integer'})
    authorId: number
}