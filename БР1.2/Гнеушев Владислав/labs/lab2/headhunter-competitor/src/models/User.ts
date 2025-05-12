import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { IsEmail, MinLength } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { EmployeeCabinet } from './EmployeeCabinet';
import { EmployerCabinet } from './EmployerCabinet';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, length: 255 })
    @IsEmail()
    email!: string;

    @Column({ length: 255 })
    @MinLength(8)
    password!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
    
    @OneToOne(() => EmployeeCabinet, employeeCabinet => employeeCabinet.user)
    employeeCabinet: EmployeeCabinet

    @OneToOne(() => EmployerCabinet, employerCabinet => employerCabinet.user)
    employerCabinet: EmployerCabinet

    async comparePassword(attempt: string): Promise<boolean> {
        return bcrypt.compare(attempt, this.password);
    }
} 