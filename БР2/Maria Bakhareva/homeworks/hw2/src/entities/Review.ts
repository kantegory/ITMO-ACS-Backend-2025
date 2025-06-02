import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  review_id: number;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Property)
  property: Property;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn()
  created_at: Date;
}
