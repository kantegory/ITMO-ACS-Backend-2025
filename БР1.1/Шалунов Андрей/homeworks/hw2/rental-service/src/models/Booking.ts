import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Property } from './Property';
import { User } from './User';

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    booking_id!: number;

    @ManyToOne(() => Property, p => p.bookings)
    property!: Property;

    @ManyToOne(() => User, u => u.bookings)
    renter!: User;

    @Column()
    start_at!: Date;
  
    @Column()
    end_at!: Date;

    @Column('decimal')
    total_price!: number;

    @Column()
    deal_status!: string;

    @CreateDateColumn()
    created_at!: Date;
}