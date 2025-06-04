import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { TargetEntity } from "./target.entity";
import { WeaponTypeEntity } from "./weapon-type.entity";

@Entity("exercises")
export class ExerciseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "smallint", unsigned: true })
    shots_in_series: number;

    @ManyToOne(() => TargetEntity, target => target.exercises)
    @JoinColumn({ name: "target_id" })
    target: TargetEntity;

    @Column({ type: "int", nullable: true })
    target_id: number;

    @ManyToOne(() => WeaponTypeEntity, weaponType => weaponType.exercises)
    @JoinColumn({ name: "weapon_type_id" })
    weaponType: WeaponTypeEntity;

    @Column({ type: "int", nullable: true })
    weapon_type_id: number;
} 