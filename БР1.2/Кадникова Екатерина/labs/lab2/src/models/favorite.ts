import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user';
import { Property } from './property';

@Entity('favorites')
export class Favorite {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.favorites)
    user!: User;

    @ManyToOne(() => Property, property => property.favorites)
    property!: Property;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
}