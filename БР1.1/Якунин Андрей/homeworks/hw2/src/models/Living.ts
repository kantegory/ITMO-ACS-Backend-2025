import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Property } from "./Property";
import { Flat } from "./Flat";
import { Room } from "./Room";
import { CountryHouse } from "./CountryHouse";
import { LivingRules } from "./LivingRules";
import { LivingComfort } from "./LivingComfort";

@Entity()
export class Living {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Property, property => property.living)
    property: Property;

    @OneToOne(() => Flat, flat => flat.living)
    flat: Flat;

    @OneToOne(() => Room, room => room.living)
    room: Room;

    @OneToOne(() => CountryHouse, countryHouse => countryHouse.living)
    countryHouse: CountryHouse;

    @Column()
    total_floors: number;

    @Column()
    total_rooms: number;

    @Column()
    area: number;

    @Column()
    meter: number;

    @Column()
    other: string;

    @Column()
    type: string;

    @Column()
    renovation: string;

    @Column()
    devices: string;

    @Column()
    internet: boolean;

    @Column()
    tv: boolean;

    @Column()
    furniture: boolean;

    @OneToMany(() => LivingRules, livingRules => livingRules.living)
    livingRules: LivingRules[];

    @OneToMany(() => LivingComfort, livingComfort => livingComfort.living)
    livingComforts: LivingComfort[];
}
