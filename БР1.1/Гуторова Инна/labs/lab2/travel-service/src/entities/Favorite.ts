import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";
import Route from "./Route";

@Entity()
export default class Favorite {
    @PrimaryGeneratedColumn()
    favorite_id: number;

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @ManyToOne(() => Route, route => route.favorites)
    route: Route;

    @Column({ type: 'date' })
    added_date: Date;
}