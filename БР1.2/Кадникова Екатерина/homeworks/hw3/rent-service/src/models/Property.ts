/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier of the property
 *           example: 1
 *         owner:
 *           $ref: '#/components/schemas/User'
 *         title:
 *           type: string
 *           description: Title of the property
 *           example: "Spacious 3-bedroom apartment"
 *           minLength: 5
 *           maxLength: 100
 *         description:
 *           type: string
 *           description: Detailed description of the property
 *           example: "Beautiful apartment with sea view"
 *           nullable: true
 *         rental_type:
 *           type: string
 *           enum: [daily, monthly]
 *           description: Type of rental (daily/monthly)
 *           example: "monthly"
 *         price:
 *           type: number
 *           format: float
 *           description: Rental price
 *           example: 1500.50
 *           minimum: 0
 *         location:
 *           type: string
 *           description: Property location
 *           example: "New York, 5th Avenue"
 *           minLength: 5
 *         property_type:
 *           type: string
 *           enum: [apartment, house, room, studio, storage, office]
 *           description: Type of property
 *           example: "apartment"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date when property was created
 *         rentals:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Rental'
 *         messages:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Message'
 *         favorites:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Favorite'
 *       required:
 *         - title
 *         - rental_type
 *         - price
 *         - location
 *         - property_type
 */
import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne,
    OneToMany, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Rental } from "./Rental";
import { Message } from "./Message";
import { Favorite } from "./Favorite";
import { RentalType } from "./enums/RentalType";
import { PropertyType } from "./enums/PropertyType";

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.properties)
    owner: User;

    @Column()
    title: string;

    @Column("text", { nullable: true })
    description: string;

    @Column({ type: "enum", enum: RentalType })
    rental_type: RentalType;

    @Column("decimal")
    price: number;

    @Column()
    location: string;

    @Column({ type: "enum", enum: PropertyType })
    property_type: PropertyType;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => Rental, rental => rental.property)
    rentals: Rental[];

    @OneToMany(() => Message, message => message.property)
    messages: Message[];

    @OneToMany(() => Favorite, favorite => favorite.property)
    favorites: Favorite[];
}