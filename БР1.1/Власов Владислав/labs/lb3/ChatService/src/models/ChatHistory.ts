import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Message } from './Message';
import { Roll } from './Roll';

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
        type: 'enum',
        enum: ChatEventType
    })
    eventType: string

    @Column({ nullable: true })
    rollId?: number;

    @ManyToOne(() => Roll, { nullable: true })
    @JoinColumn({ name: 'rollId' })
    roll?: Roll

    @Column({ nullable: true })
    messageId?: number;

    @ManyToOne(() => Message, { nullable: true })
    @JoinColumn({ name: 'messageId' })
    message?: Message
}
