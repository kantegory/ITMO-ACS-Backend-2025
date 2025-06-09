/**
 * @swagger
 * components:
 *   schemas:
 *     RentalStatus:
 *       type: string
 *       enum: [active, completed, canceled]
 *       description: Status of the rental agreement
 *       example: "active"
 *
 *     Rental:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the rental
 *           example: 1
 *         property:
 *           $ref: '#/components/schemas/Property'
 *         tenant:
 *           $ref: '#/components/schemas/User'
 *         started_at:
 *           type: string
 *           format: date-time
 *           description: Rental start date
 *           example: "2023-01-01T00:00:00Z"
 *         ended_at:
 *           type: string
 *           format: date-time
 *           description: Rental end date
 *           example: "2023-12-31T00:00:00Z"
 *         status:
 *           $ref: '#/components/schemas/RentalStatus'
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date when rental was created
 *       required:
 *         - property
 *         - tenant
 *         - started_at
 *         - ended_at
 */
import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, CreateDateColumn
} from "typeorm";
import { Property } from "./Property";
import { User } from "./User";
import { RentalStatus } from "./enums/RentalStatus";

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Property, property => property.rentals)
    property: Property;

    @ManyToOne(() => User, user => user.rentals)
    tenant: User;

    @Column()
    started_at: Date;

    @Column()
    ended_at: Date;

    @Column({ type: "enum", enum: RentalStatus, default: RentalStatus.Active })
    status: RentalStatus;

    @CreateDateColumn()
    created_at: Date;
}