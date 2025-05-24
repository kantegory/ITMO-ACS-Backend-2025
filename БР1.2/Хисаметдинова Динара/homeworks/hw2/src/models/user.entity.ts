import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

import { Psychologist } from './psychologist.entity';
import { Chat } from './chat.entity';
import { Appointment } from './appointment.entity';
import { Review } from './review.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column()
  full_name: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => Psychologist, (p) => p.user, { cascade: true })
  psychologist: Psychologist;

  @OneToMany(() => Chat, (chat) => chat.sender)
  chats_sent: Chat[];

  @OneToMany(() => Chat, (chat) => chat.receiver)
  chats_received: Chat[];

  @OneToMany(() => Appointment, (a) => a.client)
  appointments: Appointment[];

  @OneToMany(() => Review, (r) => r.client)
  reviews: Review[];
}
