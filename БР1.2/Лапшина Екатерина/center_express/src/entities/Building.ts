import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Apartment } from "./Apartment";

/**
 * @swagger
 * components:
 *   schemas:
 *     Building:
 *       type: object
 *       properties:
 *         BuildingID:
 *           type: integer
 *         City:
 *           type: string
 *         Street:
 *           type: string
 *         Number:
 *           type: string
 *         Type:
 *           type: string
 *         Description:
 *           type: string
 *         Photo:
 *           type: string
 */

@Entity("buildings")
export class Building {
  @PrimaryGeneratedColumn("increment")
  BuildingID!: number;

  @Column({ type: "varchar", length: 100 })
  City!: string;

  @Column({ type: "varchar", length: 100 })
  Street!: string;

  @Column({ type: "varchar", length: 100 })
  Number!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  Type!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Description!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Photo!: string;

  @OneToMany(() => Apartment, apartment => apartment.Building)
  Apartments!: Apartment[];
} 