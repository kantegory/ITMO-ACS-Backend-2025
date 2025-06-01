import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './Message';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn({ name: 'chat_id' })
  id: number;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @Column({ type: 'int', name: 'property_id' })
  propertyId: number;

  @Column({ type: 'int', name: 'tenant_id' })
  tenantId: number;

  @Column({ type: 'int', name: 'landlord_id' })
  landlordId: number;
}
