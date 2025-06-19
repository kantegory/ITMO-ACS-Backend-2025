import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Route } from "./Route";
import { Review } from "./Review";
import { Favorite } from "./Favorite";
import { Booking } from "./Booking";
import { Message } from "./Message";
import { Follow } from "./Follow";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  username: string;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  password_hash: string;

  @Column({ default: 'user' })
  role: string;

  @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @OneToMany(() => Route, route => route.user)
  routes: Route[];

  @OneToMany(() => Review, review => review.user)
  reviews: Review[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Booking, booking => booking.user)
  bookings: Booking[];

  @OneToMany(() => Message, message => message.sender)
  sent_messages: Message[];

  @OneToMany(() => Message, message => message.receiver)
  received_messages: Message[];

  @OneToMany(() => Follow, follow => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, follow => follow.following)
  followers: Follow[];
}