import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { User } from "./User";
import { Route } from "./Route";

@Entity()
export class Favorite {
    @PrimaryColumn()
    user_id: number;

    @PrimaryColumn()
    route_id: number;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, user => user.favorites)
    user: User;

    @ManyToOne(() => Route, route => route.favorites)
    route: Route;
}