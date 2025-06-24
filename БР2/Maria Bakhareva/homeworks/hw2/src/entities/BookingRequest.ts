import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class BookingRequest {
  @PrimaryGeneratedColumn()
  request_id: number;

  @ManyToOne(() => User, user => user.bookingRequests)
  tenant: User;

  @ManyToOne(() => Property, property => property.bookingRequests)
  property: Property;

  @Column("date")
  requested_start_date: Date;

  @Column("date")
  requested_end_date: Date;

  @Column("varchar")
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
