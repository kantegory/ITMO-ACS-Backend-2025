import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Property } from './Property';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn({ name: 'favorite_id' })
  id: number;

  @Column({ type: 'int', name: 'user_id' })
  userId: number;

  @ManyToOne(() => Property, (property) => property.favorites, { eager: true })
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
