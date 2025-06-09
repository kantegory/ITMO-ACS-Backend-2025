import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Route from "./Route";

@Entity()
export default class Trip {
    @PrimaryGeneratedColumn()
    trip_id: number;

    @Column({ type: 'date' })
    start_date: Date;

    @Column({ type: 'date' })
    end_date: Date;

    @Column()
    available_slots: number;

    @Column({ enum: ['active', 'canceled', 'completed'] })
    status: string;

    @ManyToOne(() => Route, route => route.trips)
    route: Route;
}