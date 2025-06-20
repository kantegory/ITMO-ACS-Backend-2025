import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Rental } from "./Rental";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  message_id: number;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  receiver: User;

  @ManyToOne(() => Rental, rental => rental.messages)
  rental: Rental;

  @Column()
  message: string;

  @CreateDateColumn()
  created_at: Date;
}
