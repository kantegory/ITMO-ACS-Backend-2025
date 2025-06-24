import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { Message } from './Message';
import { Roll } from './Roll';

@Entity()
export class ChatHistory {

    @PrimaryGeneratedColumn()
    id: number

    @CreateDateColumn()
    createDate: Date

    @Column({
        type: 'enum',
        enum: ['roll', 'message']
    })
    eventType: string

    @ManyToOne(() => Roll, { nullable: true })
    roll?: Roll

    @ManyToOne(() => Message, { nullable: true })
    message?: Message
}
