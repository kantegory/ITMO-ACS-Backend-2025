import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Route } from "./Route";
import { User } from "./User";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    rating: number;

    @Column('text')
    comment: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => Route, route => route.reviews)
    route: Route;

    @ManyToOne(() => User, user => user.reviews)
    user: User;
}