import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { Subscription } from "./subscription.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({select: false})
  password: string;

  @CreateDateColumn({select: false})
  created_at: Date;

  @UpdateDateColumn({select: false})
  updated_at: Date;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @OneToMany(() => Subscription, (subscription) => subscription.follower)
  following: Subscription[];

  @OneToMany(() => Subscription, (subscription) => subscription.followed)
  followers: Subscription[];
}
