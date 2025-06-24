import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  Column,
} from "typeorm";
import { User } from "./user.entity";

@Entity("subscriptions")
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  follower_id: number;

  @Column()
  following_id: number;

  @ManyToOne(() => User, (user) => user.following, { onDelete: "CASCADE" })
  @JoinColumn({ name: "follower_id" })
  follower: User;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: "CASCADE" })
  @JoinColumn({ name: "followed_id" })
  followed: User;

  @CreateDateColumn()
  created_at: Date;
}
