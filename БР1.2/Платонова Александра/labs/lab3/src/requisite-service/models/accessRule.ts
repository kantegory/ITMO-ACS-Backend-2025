import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user';

@Entity()
export class AccessRule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    entity_type: string; // hostel, room

    @Column()
    entity_id: number; // ID hostel, room

    @ManyToOne(() => User, (user) => user.accessRules)
    user: User;
}