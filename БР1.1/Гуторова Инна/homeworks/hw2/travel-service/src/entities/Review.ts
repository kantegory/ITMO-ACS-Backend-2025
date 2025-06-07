import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";
import Route from "./Route";

@Entity()
export default class Review {
    @PrimaryGeneratedColumn()
    review_id: number;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @ManyToOne(() => Route, route => route.reviews)
    route: Route;

    @Column()
    rating: number;

    @Column('text')
    comment: string;

    @Column({ type: 'date' })
    date: Date;
}