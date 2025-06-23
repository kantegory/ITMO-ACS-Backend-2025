import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User";
import { Apartment } from "./Apartment";

export enum ContractStatus {
  PENDING = "v",
  ACTIVE = "l",
  FINISHED = "f"
}

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
 *           $ref: '#/components/schemas/User'
 *         ClientID:
 *           $ref: '#/components/schemas/User'
 *         ApartmentID:
 *           $ref: '#/components/schemas/Apartment'
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

  @ManyToOne(() => User, user => user.agentContracts)
  @JoinColumn({ name: "AgentID" })
  AgentID!: User;

  @ManyToOne(() => User, user => user.clientContracts)
  @JoinColumn({ name: "ClientID" })
  ClientID!: User;

  @ManyToOne(() => Apartment, apartment => apartment.Contracts)
  @JoinColumn({ name: "ApartmentID" })
  ApartmentID!: Apartment;

  @Column({ 
    type: "varchar", 
    length: 1, 
    default: ContractStatus.PENDING,
    enum: ContractStatus
  })
  Status!: ContractStatus;

  @Column({ type: "date", nullable: true })
  startDate!: Date;

  @Column({ type: "date", nullable: true })
  endDate!: Date;

  constructor() {
    this.ContractID = undefined as any;
    this.AgentID = undefined as any;
    this.ClientID = undefined as any;
    this.ApartmentID = undefined as any;
    this.Status = undefined as any;
    this.startDate = undefined as any;
    this.endDate = undefined as any;
  }
} 