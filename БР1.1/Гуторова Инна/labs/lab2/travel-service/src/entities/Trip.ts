import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Route from "./Route";
import Booking from "./Booking";

@Entity()
export default class Trip {
    @PrimaryGeneratedColumn()
    trip_id: number;

    @ManyToOne(() => Route, route => route.trips)
    route: Route;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column()
    available_slots: number;

    @Column()
    status: string;

    @OneToMany(() => Booking, booking => booking.trip)
    bookings: Booking[];
}