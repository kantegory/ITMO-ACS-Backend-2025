import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Route } from "./Route";
/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - start_date
 *         - end_date
 *       properties:
 *         id:
 *           type: integer
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         status:
 *           type: string
 *           enum: [pending, confirmed, cancelled, completed]
 *           default: pending
 *         created_at:
 *           type: string
 *           format: date-time
 */
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