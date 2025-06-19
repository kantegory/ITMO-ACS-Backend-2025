import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    content: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ default: false })
    is_read: boolean;

    @ManyToOne(() => User, user => user.sent_messages)
    sender: User;

    @ManyToOne(() => User, user => user.received_messages)
    receiver: User;
}