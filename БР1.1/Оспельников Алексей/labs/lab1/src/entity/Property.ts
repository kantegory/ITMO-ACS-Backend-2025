import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn } from 'typeorm';

import { Rent } from './Rent';
import { User } from './User';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('decimal')
  rating: number;

  @Column()
  rent_type: string;

  @Column('decimal')
  rent_cost: number;

  @Column()
  rent_duration: Date;

  @Column()
  max_guests: number;

  @Column()
  comforts: string;

  @Column()
  description: string;

  @Column()
  is_rentable: boolean;

  @Column()
  address: string;

  @Column('decimal')
  deposit: number;

  @OneToMany(() => Rent, (rent) => rent.estate)
  rents: Rent[];

  @ManyToOne(() => User, (user) => user.renters)
  owner: User;

  @CreateDateColumn()
  created_at: Date;
}