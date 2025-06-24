import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Living } from "./Living";

@Entity()
export class Room {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Living, living => living.room)
    living: Living;

    @Column()
    floor: number;

    @Column()
    located_in: string;

    @Column()
    type: string; // room or bed
}
