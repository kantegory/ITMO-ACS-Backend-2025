import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    CreateDateColumn
  } from "typeorm"
  import { BlogPost } from "./BlogPost"
  import { User } from "./User"
  
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
  
    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: "user_id" })
    user: User
  
    @Column("text")
    comment_text: string
  
    @CreateDateColumn()
    created_at: Date
  }
  