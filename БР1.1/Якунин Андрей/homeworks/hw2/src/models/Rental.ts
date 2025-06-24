import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Advertisement } from './Advertisement';
import { User } from './User';

@Entity()
export class Rental {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Advertisement, advertisement => advertisement.rentals)
    advertisement: Advertisement;

    @ManyToOne(() => User, user => user.rentals)
    renter: User;

    @Column("decimal")
    total_price: number;

    @Column({ type: "date" })
    start_date: Date;

    @Column({ type: "date" })
    end_date: Date;

    @Column({ type: "enum", enum: ["active", "completed", "cancelled"] })
    status: "active" | "completed" | "cancelled";
}
