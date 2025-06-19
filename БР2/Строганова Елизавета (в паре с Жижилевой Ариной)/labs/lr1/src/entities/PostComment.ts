import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { BlogPost } from "./BlogPost";

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn()
  comment_id!: number;

  @ManyToOne(() => User, (user) => user.comments)
  user!: User;

  @ManyToOne(() => BlogPost, (post) => post.comments)
  post!: BlogPost;

  @Column("text")
  content!: string;

  @Column({ nullable: true })
  video_url?: string;

  @Column()
  date!: Date;
}