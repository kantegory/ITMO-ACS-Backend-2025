import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BlogPost } from "./BlogPost";

@Entity()
export class PostTag {
  @PrimaryGeneratedColumn()
  posttag_id!: number;

  @ManyToOne(() => BlogPost, (post) => post.tags)
  post!: BlogPost;

  @Column()
  name!: string;
}