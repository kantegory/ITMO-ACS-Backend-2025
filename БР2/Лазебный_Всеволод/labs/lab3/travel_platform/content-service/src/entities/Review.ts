import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Route } from "./Route";
/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - comment
 *       properties:
 *         id:
 *           type: integer
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         comment:
 *           type: string
 *         created_at:
 *           type: string
 *           format: date-time
 */
@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    rating: number;

    @Column('text')
    comment: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Route, route => route.reviews)
    route: Route;

}