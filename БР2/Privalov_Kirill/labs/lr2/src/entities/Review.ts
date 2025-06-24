import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Property } from './Property';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @ManyToOne(() => Property)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
