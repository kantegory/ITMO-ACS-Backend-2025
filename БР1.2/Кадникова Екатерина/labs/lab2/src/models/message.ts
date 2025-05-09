import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Property } from './property';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.sentMessages)
    sender!: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    receiver!: User;

    @ManyToOne(() => Property, property => property.messages)
    property!: Property;

    @Column({ type: 'text' })
    content!: string;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP'
    })
    sent_at!: Date;
}