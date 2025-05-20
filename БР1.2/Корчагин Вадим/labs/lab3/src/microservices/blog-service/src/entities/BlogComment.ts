import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
  CreateDateColumn
} from "typeorm"
import { BlogPost } from "./BlogPost"

@Entity("blog_comments")
export class BlogComment {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int")
  post_id: number    

  @ManyToOne(() => BlogPost, (post) => post.comments)
  @JoinColumn({ name: "post_id" })
  post: BlogPost

  @Column("int")
  user_id: number

  @Column("text")
  comment_text: string

  @CreateDateColumn({ name: "created_at" })
  created_at: Date
}