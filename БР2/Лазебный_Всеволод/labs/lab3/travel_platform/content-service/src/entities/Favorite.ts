import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { Route } from "./Route";
/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         route_id:
 *           type: integer
 *         created_at:
 *           type: string
 *           format: date-time
 */
@Entity()
export class Favorite {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    route_id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Route, route => route.favorites)
    route: Route;
}