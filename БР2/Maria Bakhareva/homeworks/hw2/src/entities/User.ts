import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Rental } from "./Rental";
import { Property } from "./Property";
import { Favorite } from "./Favorite";
import { BookingRequest } from "./BookingRequest";
import { Complaint } from "./Complaint";

export enum UserRole {
  TENANT = "tenant",
  LANDLORD = "landlord",
  ADMIN = "admin"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  birth_date: Date;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column("varchar")
  role: UserRole;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Rental, rental => rental.tenant)
  rentals: Rental[];

  @OneToMany(() => Property, property => property.owner)
  properties: Property[];

  @OneToMany(() => Favorite, fav => fav.user)
  favorites: Favorite[];

  @OneToMany(() => BookingRequest, br => br.tenant)
  bookingRequests: BookingRequest[];

  @OneToMany(() => Complaint, comp => comp.user)
  complaints: Complaint[];
}
