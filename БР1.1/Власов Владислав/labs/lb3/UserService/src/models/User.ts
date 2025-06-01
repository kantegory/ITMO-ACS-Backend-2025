import { IsEmail } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        unique: true,
        type: 'varchar'
    })
    @IsEmail()
    email: string

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'varchar'})
    password: string

    @CreateDateColumn()
    registrationDate: Date

    @UpdateDateColumn()
    changeDate: Date
}
