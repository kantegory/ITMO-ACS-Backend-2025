import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";


@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'text'})
    text: string

    @ManyToOne(() => User, user => user.messages)
    author: User
}