import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn
} from "typeorm";
import { Property } from "./Property";

@Entity()
export class PropertyImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property, property => property.images)
  property: Property;

  @Column()
  title: string;

  @Column()
  order: number;

  @CreateDateColumn()
  created_at: Date;
}
