import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";
import Trip from "./Trip";

@Entity()
export default class Booking {
    @PrimaryGeneratedColumn()
    booking_id: number;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToOne(() => Trip, trip => trip.bookings)
    trip: Trip;

    @Column({ type: 'date' })
    booking_date: Date;

    @Column()
    participants_count: number;

    @Column()
    status: string;
}