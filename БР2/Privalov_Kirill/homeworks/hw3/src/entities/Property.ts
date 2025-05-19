import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './User';
import { Favorite } from './Favorite';
import { BookingRequest } from './BookingRequest';
import { PropertyImage } from './PropertyImage';
import { Rental } from './Rental';
import { Complaint } from './Complaint';

@Entity()
export class Property {
  @PrimaryGeneratedColumn({ name: 'property_id' })
  id: number;

  @ManyToOne(() => User, (user) => user.properties)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  location: string;

  @Column({ name: 'property_type' })
  propertyType: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Favorite, (fav) => fav.property)
  favorites: Favorite[];

  @OneToMany(() => BookingRequest, (br) => br.property)
  bookingRequests: BookingRequest[];

  @OneToMany(() => PropertyImage, (img) => img.property)
  images: PropertyImage[];

  @OneToMany(() => Rental, (rental) => rental.property)
  rentals: Rental[];

  @OneToMany(() => Complaint, (comp) => comp.property)
  complaints: Complaint[];
}
