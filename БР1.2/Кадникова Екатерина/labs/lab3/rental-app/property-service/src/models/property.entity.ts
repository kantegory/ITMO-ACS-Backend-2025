import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { PropertyType } from './property-type.enum';
import { RentalType } from './rental-type.enum';

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    ownerId!: number;

    @Column()
    title!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'enum', enum: RentalType })
    rentalType!: RentalType;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price!: number;

    @Column()
    location!: string;

    @Column({ type: 'enum', enum: PropertyType })
    propertyType!: PropertyType;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;
}