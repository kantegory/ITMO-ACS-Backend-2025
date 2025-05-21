/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique message identifier
 *           example: 1
 *         sender:
 *           $ref: '#/components/schemas/User'
 *         receiver:
 *           $ref: '#/components/schemas/User'
 *         property:
 *           $ref: '#/components/schemas/Property'
 *         content:
 *           type: string
 *           description: Message content
 *           example: "Hello, is this property available?"
 *           minLength: 1
 *           maxLength: 1000
 *         sent_at:
 *           type: string
 *           format: date-time
 *           description: Date when message was sent
 *       required:
 *         - sender
 *         - receiver
 *         - property
 *         - content
 */
import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.sentMessages)
    sender: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    receiver: User;

    @ManyToOne(() => Property, property => property.messages)
    property: Property;

    @Column("text")
    content: string;

    @CreateDateColumn()
    sent_at: Date;
}