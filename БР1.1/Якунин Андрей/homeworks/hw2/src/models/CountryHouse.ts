import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Living } from "./Living";

@Entity()
export class CountryHouse {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Living, living => living.countryHouse)
    living: Living;

    @Column()
    land_area: number;

    @Column()
    communications: string;

    @Column()
    recreations: string;
}
