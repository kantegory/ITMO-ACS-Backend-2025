import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';
import { Property } from './Property';
import { User } from './User';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn({ name: 'chat_id' })
  id: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'tenant_id' })
  tenant: User;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'landlord_id' })
  landlord: User;
}
