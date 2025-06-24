import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from './User';
import { Property } from './Property';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  id: number;

  @ManyToOne(() => User)
  author: User;

  @ManyToOne(() => Property)
  property: Property;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
