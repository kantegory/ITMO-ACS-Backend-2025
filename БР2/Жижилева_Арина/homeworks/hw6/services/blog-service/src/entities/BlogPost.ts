import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("blog_post")
export class BlogPost {
  @PrimaryGeneratedColumn()
  post_id!: number;

  @Column()
  title!: string;

  @Column("text")
  content!: string;

  @Column()
  author_id!: number;

  @CreateDateColumn()
  created_at!: Date;
}