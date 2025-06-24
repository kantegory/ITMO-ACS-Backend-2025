import {BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {LivingEntity} from "./living";
import {RoomType} from "./enums/roomType";

@Entity({name: "rooms"})
export class RoomEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => LivingEntity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: "living_id"})
    living: LivingEntity;

    @Column({type: "text", name: "located_in"})
    locatedIn: string;

    @Column({
        type: "enum",
        enum: RoomType,
        name: "room_type"
    })
    roomType: RoomType;
}