import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Property } from './Property';
import { Message } from './Message';
import { Chat } from './Chat';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn({ name: 'rental_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: 'tenant_id' })
  tenant: User;

  @ManyToOne(() => Property, (property) => property.rentals)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ name: 'start_date' })
  startDate: Date;

  @Column({ name: 'end_date' })
  endDate: Date;

  @Column()
  status: string;

  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Message, (msg) => msg.rental)
  messages: Message[];

  @OneToMany(() => Chat, (chat) => chat.rental)
  chats: Chat[];
}
