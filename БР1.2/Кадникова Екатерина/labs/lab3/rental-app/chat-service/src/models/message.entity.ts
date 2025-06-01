import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('messages')
export class Message {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    senderId!: number;

    @Column()
    receiverId!: number;

    @Column()
    propertyId!: number;

    @Column({ type: 'text' })
    content!: string;

    @CreateDateColumn({ type: 'timestamp with time zone' })
    sentAt!: Date;
}