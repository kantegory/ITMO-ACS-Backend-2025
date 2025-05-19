import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Living } from "./Living";

@Entity()
export class Flat {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Living, living => living.flat)
    living: Living;

    @Column()
    floor: number;

    @Column()
    kitchen_area: number;

    @Column()
    living_area: number;
}