import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../../user/src/user/user.entity';
import { Message } from '../message/message.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Message, (msg: Message) => msg.chat)
  messages: Message[];
}
