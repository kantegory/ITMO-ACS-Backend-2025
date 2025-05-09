import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user';
import { Rental } from './rental';
import { Message } from './message';
import { Favorite } from './favorite';
import {PropertyType} from "./enums/propertyType";
import {RentalType} from "./enums/rentalType";

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.properties)
    owner!: User;

    @Column()
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'enum', enum: RentalType })
    rental_type!: RentalType;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column()
    location!: string;

    @Column({ type: 'enum', enum: PropertyType })
    property_type!: PropertyType;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @OneToMany(() => Rental, rental => rental.property)
    rentals!: Rental[];

    @OneToMany(() => Message, message => message.property)
    messages!: Message[];

    @OneToMany(() => Favorite, favorite => favorite.property)
    favorites!: Favorite[];
}