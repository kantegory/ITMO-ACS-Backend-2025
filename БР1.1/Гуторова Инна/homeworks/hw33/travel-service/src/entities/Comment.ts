import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";
import Route from "./Route";

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn()
    comment_id: number;

    @ManyToOne(() => User, user => user.comments)
    user: User;

    @ManyToOne(() => Route, route => route.comments)
    route: Route;

    @Column('text')
    comment_text: string;

    @Column({ type: 'date' })
    date: Date;
}