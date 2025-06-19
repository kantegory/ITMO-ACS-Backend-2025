import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Route } from "./Route";
import { Review } from "./Review";
import { Favorite } from "./Favorite";
import { Booking } from "./Booking";
import { Message } from "./Message";
import { Follow } from "./Follow";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password_hash
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор пользователя
 *         username:
 *           type: string
 *           unique: true
 *           minLength: 3
 *           maxLength: 50
 *         email:
 *           type: string
 *           unique: true
 *           format: email
 *           maxLength: 100
 *         password_hash:
 *           type: string
 *           description: Хеш пароля
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           default: user
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Дата создания
 *       example:
 *         id: 1
 *         username: traveler
 *         email: user@example.com
 *         role: user
 *         created_at: 2023-01-01T12:00:00Z
 */
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