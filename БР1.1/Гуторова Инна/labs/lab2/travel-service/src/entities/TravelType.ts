import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Route from "./Route";

@Entity()
export default class TravelType {
    @PrimaryGeneratedColumn()
    travel_type_id: number;

    @Column()
    name: string;

    @OneToMany(() => Route, route => route.travel_type)
    routes: Route[];
}