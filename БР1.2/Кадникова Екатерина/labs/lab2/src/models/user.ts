import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Role } from './enums/role';
import { Property } from './property';
import { Rental } from './rental';
import { Message } from './message';
import { Favorite } from './favorite';

@Entity('users')
export class User {
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
        enum: Role,
        default: Role.USER,
    })
    role!: Role;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @OneToMany(() => Property, property => property.owner)
    properties!: Property[];

    @OneToMany(() => Rental, rental => rental.tenant)
    rentals!: Rental[];

    @OneToMany(() => Message, message => message.sender)
    sentMessages!: Message[];

    @OneToMany(() => Message, message => message.receiver)
    receivedMessages!: Message[];

    @OneToMany(() => Favorite, favorite => favorite.user)
    favorites!: Favorite[];
}