import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Route } from "./Route";
/**
 * @swagger
 * components:
 *   schemas:
 *     RoutePoint:
 *       type: object
 *       required:
 *         - sequence
 *         - latitude
 *         - longitude
 *         - name
 *         - description
 *         - type
 *       properties:
 *         id:
 *           type: integer
 *         sequence:
 *           type: integer
 *         latitude:
 *           type: number
 *           format: double
 *         longitude:
 *           type: number
 *           format: double
 *         name:
 *           type: string
 *           maxLength: 100
 *         description:
 *           type: string
 *         type:
 *           type: string
 *           enum: [attraction, restaurant, hotel, viewpoint]
 */
@Entity()
export class RoutePoint {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    sequence: number;

    @Column('decimal', { precision: 9, scale: 6 })
    latitude: number;

    @Column('decimal', { precision: 9, scale: 6 })
    longitude: number;

    @Column({ length: 100 })
    name: string;

    @Column('text')
    description: string;

    @Column({ length: 50 })
    type: string;

    @ManyToOne(() => Route, route => route.points)
    route: Route;
}