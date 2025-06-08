import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Favorite } from "./Favorite";
import { BookingRequest } from "./BookingRequest";
import { PropertyImage } from "./PropertyImage";
import { Rental } from "./Rental";
import { Complaint } from "./Complaint";

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  property_id: number;

  @ManyToOne(() => User, user => user.properties)
  owner: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column("decimal")
  price: number;

  @Column()
  location: string;

  @Column()
  property_type: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Favorite, fav => fav.property)
  favorites: Favorite[];

  @OneToMany(() => BookingRequest, br => br.property)
  bookingRequests: BookingRequest[];

  @OneToMany(() => PropertyImage, img => img.property)
  images: PropertyImage[];

  @OneToMany(() => Rental, rental => rental.property)
  rentals: Rental[];

  @OneToMany(() => Complaint, comp => comp.property)
  complaints: Complaint[];
}
