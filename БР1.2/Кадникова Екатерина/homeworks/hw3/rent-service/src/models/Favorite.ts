/**
 * @swagger
 * components:
 *   schemas:
 *     Favorite:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the favorite record
 *           example: 1
 *         user:
 *           $ref: '#/components/schemas/User'
 *         property:
 *           $ref: '#/components/schemas/Property'
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date when property was added to favorites
 *       required:
 *         - user
 *         - property
 */
import {
    Entity, PrimaryGeneratedColumn, ManyToOne,
    CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class Favorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @ManyToOne(() => Property, property => property.favorites)
    property: Property;

    @CreateDateColumn()
    created_at: Date;
}