import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {LivingEntity} from "./living.entity";

@Entity({name: "flats"})
export class FlatEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => LivingEntity)
    @JoinColumn({name: "living_id"})
    living: LivingEntity;

    @Column({type: "int"})
    floor: number;

    @Column({type: "decimal", name: "kitchen_area"})
    kitchenArea: number;

    @Column({type: "decimal", name: "living_area"})
    livingArea: number;
}