import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {PropertyEntity} from "./property.entity";
import {ComfortEntity} from "./comfort.entity";
import {FlatEntity} from "./flat.entity";
import {RoomEntity} from "./room.entity";
import {CountryHouseEntity} from "./country-house.entity";
import {LivingType} from "@rent/shared";

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

    @OneToOne(() => FlatEntity, flat => flat.living)
    flat: FlatEntity;

    @OneToOne(() => RoomEntity, room => room.living)
    room: RoomEntity;

    @OneToOne(() => CountryHouseEntity, countryHouse => countryHouse.living)
    countryHouse: CountryHouseEntity;

    @Column({
        type: "enum",
        enum: LivingType,
        name: "type"
    })
    livingType: LivingType;
}