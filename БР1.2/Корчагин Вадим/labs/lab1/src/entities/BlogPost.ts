import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
    CreateDateColumn, UpdateDateColumn, OneToMany
  } from "typeorm"
  import { User } from "./User"
  import { BlogComment } from "./BlogComment"
  
  @Entity("blog_posts")
  export class BlogPost {
    @PrimaryGeneratedColumn()
    id: number
  
    @Column("int")
    author_id: number
  
    @ManyToOne(() => User, (user) => user.blogPosts)
    @JoinColumn({ name: "author_id" })
    author: User
  
    @Column("varchar", { length: 255 })
    title: string
  
    @Column("text")
    content: string
  
    @CreateDateColumn()
    created_at: Date
  
    @UpdateDateColumn()
    updated_at: Date
  
    @OneToMany(() => BlogComment, (comment) => comment.post)
    comments: BlogComment[]
  }
  