import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {LivingEntity} from "./living.entity";

@Entity({name: "comforts"})
export class ComfortEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => LivingEntity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: "living_id"})
    living: LivingEntity

    @Column({type: "text"})
    renovation: string;

    @Column({type: "text"})
    devices: string;

    @Column({type: "bool"})
    internet: boolean;

    @Column({type: "bool"})
    tv: boolean;

    @Column({type: "text"})
    furniture: string;
}