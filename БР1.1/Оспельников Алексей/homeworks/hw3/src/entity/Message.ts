import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

import { User } from './User';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  theme: string;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  recipient: User;

  @ManyToOne(() => User, (user) => user.sentMessages)
  sender: User;

  @CreateDateColumn()
  created_at: Date;
}