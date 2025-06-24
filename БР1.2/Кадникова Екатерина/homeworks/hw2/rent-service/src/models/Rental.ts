import {
    Entity, PrimaryGeneratedColumn, Column,
    ManyToOne, CreateDateColumn
} from "typeorm";
import { Property } from "./Property";
import { User } from "./User";
import { RentalStatus } from "./enums/RentalStatus";

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Property, property => property.rentals)
    property: Property;

    @ManyToOne(() => User, user => user.rentals)
    tenant: User;

    @Column()
    started_at: Date;

    @Column()
    ended_at: Date;

    @Column({ type: "enum", enum: RentalStatus, default: RentalStatus.Active })
    status: RentalStatus;

    @CreateDateColumn()
    created_at: Date;
}