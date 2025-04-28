import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @ManyToOne(() => User, (user) => user.blogPosts)
  user!: User;

  @Column()
  title!: string;

  @Column()
  content!: string;

  @Column()
  category!: string;

  @Column()
  date!: Date;
}
