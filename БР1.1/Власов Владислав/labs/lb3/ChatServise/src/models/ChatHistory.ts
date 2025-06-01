import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"

export enum ChatEventType
{
    MESSAGE = 'message',
    ROLL = 'roll',
}

@Entity()
export class ChatHistory {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createDate: Date

    @Column({
        type: "enum",
        enum: ChatEventType,
    })
    eventType: ChatEventType

    @Column({type: 'integer'})
    eventId: number
}