import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from "typeorm";
import { User } from "./User";
import { Property } from "./Property";

@Entity()
export class Complaint {
  @PrimaryGeneratedColumn()
  complaint_id: number;

  @ManyToOne(() => User, user => user.complaints)
  user: User;

  @ManyToOne(() => Property, property => property.complaints)
  property: Property;

  @Column()
  message: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;
}
