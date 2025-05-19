import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Property } from './Property';
import { Favorite } from './Favorite';
import { BookingRequest } from './BookingRequest';
import { Complaint } from './Complaint';
import { Message } from './Message';
import { Chat } from './Chat';

export enum UserRole {
  TENANT = 'tenant',
  LANDLORD = 'landlord',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ nullable: false, name: 'first_name' })
  firstName: string;

  @Column({ nullable: false, name: 'last_name' })
  lastName: string;

  @Column({ nullable: false, name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false, default: UserRole.TENANT })
  role: UserRole;

  @Column({ nullable: false, select: false })
  password: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @OneToMany(() => Property, (property) => property.owner)
  properties: Property[];

  @OneToMany(() => Favorite, (fav) => fav.user)
  favorites: Favorite[];

  @OneToMany(() => BookingRequest, (br) => br.tenant)
  bookingRequests: BookingRequest[];

  @OneToMany(() => Complaint, (comp) => comp.user)
  complaints: Complaint[];

  @OneToMany(() => Message, (msg) => msg.sender)
  sentMessages: Message[];

  @OneToMany(() => Message, (msg) => msg.receiver)
  receivedMessages: Message[];

  @OneToMany(() => Chat, (chat) => chat.tenant)
  chats: Chat[];

  @OneToMany(() => Chat, (chat) => chat.landlord)
  landlordChats: Chat[];
}
