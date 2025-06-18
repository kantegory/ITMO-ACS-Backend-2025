import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Route } from "./Route";

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('date')
    start_date: Date;

    @Column('date')
    end_date: Date;

    @Column({ default: 'pending' })
    status: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, user => user.bookings)
    user: User;

    @ManyToOne(() => Route, route => route.bookings)
    route: Route;
}