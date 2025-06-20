import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { Rental } from './Rental';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn({ name: 'chat_id' })
  id: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToOne(() => Rental)
  @JoinColumn({ name: 'rental_id' })
  rental: Rental;
}
