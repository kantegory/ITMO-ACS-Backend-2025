import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Route } from "./Route";
/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       required:
 *         - url
 *         - media_type
 *       properties:
 *         id:
 *           type: integer
 *         url:
 *           type: string
 *           maxLength: 255
 *         media_type:
 *           type: string
 *           enum: [image, video]
 *         caption:
 *           type: string
 *           maxLength: 200
 *         created_at:
 *           type: string
 *           format: date-time
 */
@Entity()
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    url: string;

    @Column({ length: 20 })
    media_type: string;

    @Column({ length: 200, nullable: true })
    caption: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Route, route => route.media)
    route: Route;
}