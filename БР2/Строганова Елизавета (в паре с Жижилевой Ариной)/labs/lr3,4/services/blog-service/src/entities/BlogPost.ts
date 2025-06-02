import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";
import { PostComment } from "./PostComment";
import { PostLike } from "./PostLike";
import { PostTag } from "./PostTag";

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @ManyToOne(() => User, (user) => user.blogPosts)
  user!: User;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column()
  category!: string;

  @Column()
  date!: Date;

  @OneToMany(() => PostComment, (comment) => comment.post)
  comments!: PostComment[];

  @OneToMany(() => PostLike, (like) => like.post)
  likes!: PostLike[];

  @OneToMany(() => PostTag, (tag) => tag.post)
  tags!: PostTag[];
}