import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Chat } from './Chat';

@Entity()
export class Message {
  @PrimaryGeneratedColumn({ name: 'message_id' })
  id: number;

  @ManyToOne(() => Chat, (chat) => chat.messages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @Column({ type: 'int', name: 'sender_id' })
  senderId: number;

  @Column({ type: 'int', name: 'receiver_id' })
  receiverId: number;

  @Column({ type: 'text', name: 'message' })
  content: string;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;
}
