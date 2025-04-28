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