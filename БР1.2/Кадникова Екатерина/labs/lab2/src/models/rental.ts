import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Property } from './property';
import { User } from './user';
import {RentalStatus} from "./enums/rentalStatus";

@Entity('rentals')
export class Rental {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Property, property => property.rentals)
    property!: Property;

    @ManyToOne(() => User, user => user.rentals)
    tenant!: User;

    @Column({ type: 'date' })
    started_at!: Date;

    @Column({ type: 'date' })
    ended_at!: Date;

    @Column({ type: 'enum', enum: RentalStatus, default: RentalStatus.ACTIVE })
    status!: RentalStatus;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;
}