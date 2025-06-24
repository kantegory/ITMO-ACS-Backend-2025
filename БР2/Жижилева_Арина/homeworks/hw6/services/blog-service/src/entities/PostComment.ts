import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BlogPost } from "./BlogPost";

@Entity()
export class PostComment {
  @PrimaryGeneratedColumn()
  comment_id!: number;

  @Column("text")
  content!: string;

  @Column({ nullable: true })
  video_url?: string;

  @Column()
  date!: Date;
}