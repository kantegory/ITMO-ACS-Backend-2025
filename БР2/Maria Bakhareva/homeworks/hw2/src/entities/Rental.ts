import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";
import { Message } from "./Message";
import { Transaction } from "./Transaction";

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  rental_id: number;

  @ManyToOne(() => User, user => user.rentals)
  tenant: User;

  @ManyToOne(() => Property, property => property.rentals)
  property: Property;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: string;

  @OneToMany(() => Message, msg => msg.rental)
  messages: Message[];

  @OneToMany(() => Transaction, trx => trx.rental)
  transactions: Transaction[];
}
