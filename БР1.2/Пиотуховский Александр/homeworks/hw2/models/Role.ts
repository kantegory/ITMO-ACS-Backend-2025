import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    name: string;

    @Column({ type: 'int' })
    rank: number;

    @Column({ type: 'boolean', name: 'is_default', default: false })
    isDefault: boolean;

    @OneToMany(() => User, user => user.role)
    users: User[];
}