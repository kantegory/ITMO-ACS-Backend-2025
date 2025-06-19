import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RoutePoint } from "./RoutePoint";
import { Review } from "./Review";
import { Favorite } from "./Favorite";
import { Booking } from "./Booking";

/**
 * @swagger
 * components:
 *   schemas:
 *     Route:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - budget_min
 *         - budget_max
 *         - duration_days
 *         - travel_type
 *       properties:
 *         id:
 *           type: integer
 *           description: Уникальный идентификатор маршрута
 *         title:
 *           type: string
 *           maxLength: 100
 *         description:
 *           type: string
 *         budget_min:
 *           type: integer
 *           minimum: 0
 *         budget_max:
 *           type: integer
 *           minimum: 0
 *         duration_days:
 *           type: integer
 *           minimum: 1
 *         travel_type:
 *           type: string
 *           maxLength: 50
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *           default: draft
 *         created_at:
 *           type: string
 *           format: date-time
 *         user:
 *           $ref: '#/components/schemas/User'
 *       example:
 *         id: 1
 *         title: Горное приключение
 *         description: Невероятный поход по горным тропам
 *         budget_min: 5000
 *         budget_max: 15000
 *         duration_days: 7
 *         travel_type: hiking
 *         status: published
 *         created_at: 2023-01-01T12:00:00Z
 */
@Entity()
export class Route {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    title: string;

    @Column('text')
    description: string;

    @Column('int')
    budget_min: number;

    @Column('int')
    budget_max: number;

    @Column('int')
    duration_days: number;

    @Column({ length: 50 })
    travel_type: string;

    @Column({ default: 'draft' })
    status: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column('int', { nullable: true }) // Разрешено null
    user_id: number | null;

    @OneToMany(() => RoutePoint, point => point.route)
    points: RoutePoint[];

    @OneToMany(() => Review, review => review.route)
    reviews: Review[];

    @OneToMany(() => Favorite, favorite => favorite.route)
    favorites: Favorite[];

    @OneToMany(() => Booking, booking => booking.route)
    bookings: Booking[];

    // Убрана связь с Media
}