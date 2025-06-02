import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { BlogPost } from "./BlogPost";

@Entity()
export class PostLike {
  @PrimaryGeneratedColumn()
  like_id!: number;

  @ManyToOne(() => User, (user) => user.likes)
  user!: User;

  @ManyToOne(() => BlogPost, (post) => post.likes)
  post!: BlogPost;

  @Column()
  date!: Date;
}