import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from "typeorm";
import { Rental } from "./Rental";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  transaction_id: number;

  @ManyToOne(() => Rental, rental => rental.transactions)
  rental: Rental;

  @Column("decimal")
  amount: number;

  @Column()
  payment_status: string;

  @CreateDateColumn()
  created_at: Date;
}
