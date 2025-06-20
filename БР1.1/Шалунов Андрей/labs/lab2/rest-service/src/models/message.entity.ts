import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Booking } from './booking.entity';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    message_id!: number;

    @ManyToOne(() => User, u => u.sentMessages)
    sender!: User;

    @ManyToOne(() => User, u => u.receivedMessages)
    recipient!: User;

    @ManyToOne(() => Booking, b => b.messages)
    booking!: Booking;

    @Column('text')
    text!: string;
  
    @CreateDateColumn()
    sent_at!: Date;
}