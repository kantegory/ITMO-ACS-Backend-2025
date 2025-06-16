import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';
import { Favorite } from './Favorite';
import { BookingRequest } from './BookingRequest';
import { PropertyImage } from './PropertyImage';
import { Complaint } from './Complaint';

@Entity()
export class Property {
  @PrimaryGeneratedColumn({ name: 'property_id' })
  id: number;

  @Column({ type: 'int', name: 'owner_id' })
  ownerId: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'text', name: 'property_type' })
  propertyType: string;

  @CreateDateColumn({ type: 'date', name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Favorite, (fav) => fav.property)
  favorites: Favorite[];

  @OneToMany(() => BookingRequest, (br) => br.property)
  bookingRequests: BookingRequest[];

  @OneToMany(() => PropertyImage, (img) => img.property)
  images: PropertyImage[];

  @OneToMany(() => Complaint, (comp) => comp.property)
  complaints: Complaint[];
}
