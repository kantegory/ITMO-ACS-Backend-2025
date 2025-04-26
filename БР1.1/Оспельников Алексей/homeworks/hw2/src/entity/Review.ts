import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Rent } from "./Rent"; // Замените на реальный путь к Rent

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Rent, rent => rent.review)
  rent: Rent;

  @Column({ type: 'decimal' })
  grade: number;

  @Column()
  text: string;

  @Column()
  complaints: string;
}