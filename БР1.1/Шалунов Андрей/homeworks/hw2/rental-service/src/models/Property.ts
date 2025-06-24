import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { User } from './User';
import { PropertyPhoto } from './PropertyPhoto';
import { Booking } from './Booking';

@Entity()
export class Property {
    @PrimaryGeneratedColumn()
    property_id!:number;

    @ManyToOne(() => User, u => u.properties)
    owner!: User;

    @Column()
    type!:string;

    @Column()
    title!:string;

    @Column('text')
    description!:string;

    @Column()
    location!:string;

    @Column('decimal')
    price_per_day!:string;
    
    @CreateDateColumn()
    listed_at!:Date;

    @Column()
    status!:string;

    @OneToMany(() => PropertyPhoto, p => p.property)
    photos!: PropertyPhoto[];

    @OneToMany(() => Booking, b => b.property)
    bookings!: Booking[];
  }