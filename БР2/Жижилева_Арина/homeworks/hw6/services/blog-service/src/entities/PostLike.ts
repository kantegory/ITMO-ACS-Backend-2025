import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { BlogPost } from "./BlogPost";

@Entity()
export class PostLike {
  @PrimaryGeneratedColumn()
  like_id!: number;

  @Column()
  date!: Date;
}