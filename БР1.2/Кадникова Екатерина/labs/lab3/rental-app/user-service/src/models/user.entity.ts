import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import {RoleEnum} from "./role.enum";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.USER,
    })
    role!: RoleEnum;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
}