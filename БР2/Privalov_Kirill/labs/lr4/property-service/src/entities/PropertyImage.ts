import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Property } from './Property';

@Entity()
export class PropertyImage {
  @PrimaryGeneratedColumn({ name: 'image_id' })
  id: number;

  @ManyToOne(() => Property, (property) => property.images)
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @Column({ type: 'text', name: 'title' })
  url: string;

  @Column({ type: 'int' })
  order: number;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;
}
