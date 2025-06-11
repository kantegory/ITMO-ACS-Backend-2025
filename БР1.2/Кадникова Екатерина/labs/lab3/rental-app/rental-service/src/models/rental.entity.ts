import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import {RentalStatus} from "./rental-status.enum";

@Entity('rentals')
export class Rental {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    propertyId!: number;

    @Column()
    tenantId!: number;

    @Column({ type: 'date' })
    startedAt!: Date;

    @Column({ type: 'date' })
    endedAt!: Date;

    @Column({ type: 'enum', enum: RentalStatus, default: RentalStatus.ACTIVE })
    status!: RentalStatus;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}