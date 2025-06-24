import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {LivingEntity} from "./living";

@Entity({name: "country_houses"})
export class CountryHouseEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => LivingEntity)
    @JoinColumn({name: "living_id"})
    living: LivingEntity;

    @Column({type: "decimal", name: "land_area"})
    landArea: number;

    @Column({type: "text"})
    communications: string;

    @Column({type: "text"})
    recreations: string;
}