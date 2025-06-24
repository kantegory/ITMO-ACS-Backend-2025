import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {PropertyEntity} from "./property.entity";
import {LivingType} from "./enums/living.type";
import {ComfortEntity} from "./comfort.entity";
import {FlatEntity} from "./flat.entity";
import {CountryHouseEntity} from "./country-house.entity";
import {RoomEntity} from "./room.entity";

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