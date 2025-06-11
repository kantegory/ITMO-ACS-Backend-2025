import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {PropertyEntity} from "./property";
import {LivingType} from "./enums/living.type";
import {ComfortEntity} from "./comfort";

@Entity({name: "livings"})
export class LivingEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => PropertyEntity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: "property_id"})
    property: PropertyEntity;

    @Column({type: "int", name: "total_floors"})
    totalFloors: number;

    @Column({type: "int", name: "total_rooms"})
    totalRooms: number;

    @Column({type: "decimal", name: "area"})
    area: number;

    @Column({type: "decimal", name: "meter"})
    meter: number;

    @Column({type: "decimal", name: "other"})
    other: number;

    @OneToOne(() => ComfortEntity, comfort => comfort.living)
    comfort: ComfortEntity;

    @Column({
        type: "enum",
        enum: LivingType,
        name: "type"
    })
    rentType: LivingType;
}