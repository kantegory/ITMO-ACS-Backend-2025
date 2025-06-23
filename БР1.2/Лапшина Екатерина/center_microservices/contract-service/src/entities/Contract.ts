import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ContractStatus } from "../types";

/**
 * @swagger
 * components:
 *   schemas:
 *     Contract:
 *       type: object
 *       properties:
 *         ContractID:
 *           type: integer
 *         AgentID:
 *           type: integer
 *         ClientID:
 *           type: integer
 *         ApartmentID:
 *           type: integer
 *         Status:
 *           type: string
 *           enum: [v, l, f]
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 */

@Entity("contracts")
export class Contract {
  @PrimaryGeneratedColumn("increment")
  ContractID!: number;

  @Column({ type: "int" })
  AgentID!: number;

  @Column({ type: "int" })
  ClientID!: number;

  @Column({ type: "int" })
  ApartmentID!: number;

  @Column({ 
    type: "varchar", 
    length: 1, 
    default: ContractStatus.PENDING,
    enum: ContractStatus
  })
  Status!: ContractStatus;

  @Column({ type: "date", nullable: true })
  startDate!: Date | null;

  @Column({ type: "date", nullable: true })
  endDate!: Date | null;
} 