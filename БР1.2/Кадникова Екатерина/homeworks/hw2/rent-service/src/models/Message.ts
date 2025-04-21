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