import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column("text")
  text: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  published_at: Date;
}
