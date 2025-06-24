import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Property } from './Property';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn({ name: 'favorite_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Property, (property) => property.favorites)
  @JoinColumn({ name: 'property_id' })
  property: Property;
}
