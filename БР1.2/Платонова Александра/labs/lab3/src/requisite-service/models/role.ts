import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true })
    name: string; // 'admin', 'manager', 'resident'

    @OneToMany(() => User, (user) => user.role)
    users: User[];
}