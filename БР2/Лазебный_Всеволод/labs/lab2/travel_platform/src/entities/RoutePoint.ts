import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Route } from "./Route";

@Entity()
export class RoutePoint {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    sequence: number;

    @Column('decimal', { precision: 9, scale: 6 })
    latitude: number;

    @Column('decimal', { precision: 9, scale: 6 })
    longitude: number;

    @Column({ length: 100 })
    name: string;

    @Column('text')
    description: string;

    @Column({ length: 50 })
    type: string;

    @ManyToOne(() => Route, route => route.points)
    route: Route;
}