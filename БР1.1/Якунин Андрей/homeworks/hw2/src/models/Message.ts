import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';
import { Advertisement } from './Advertisement';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.sentMessages)
    user_sender: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    user_receiver: User;

    @ManyToOne(() => Advertisement, advertisement => advertisement.messages)
    advertisement: Advertisement;

    @Column()
    text: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    datetime: Date;
}
