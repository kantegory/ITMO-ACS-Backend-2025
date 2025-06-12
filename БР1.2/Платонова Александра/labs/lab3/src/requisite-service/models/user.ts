import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from './role';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, unique: true })
    email: string;

    @Column({ length: 100 })
    password: string;

    @ManyToOne(() => Role, (role) => role.users)
    role: Role;

    @Column({ default: true })
    isActive: boolean;
}