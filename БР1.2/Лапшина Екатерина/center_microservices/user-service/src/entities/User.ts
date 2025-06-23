import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../types";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         UserID:
 *           type: integer
 *         username:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         Passport:
 *           type: string
 *         Phone:
 *           type: string
 *         BirthDate:
 *           type: string
 *           format: date
 *         Photo:
 *           type: string
 *         is_staff:
 *           type: boolean
 *         is_active:
 *           type: boolean
 *         is_superuser:
 *           type: boolean
 */

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("increment")
  UserID!: number;

  @Column({ type: "varchar", length: 150, unique: true })
  username!: string;

  @Column({ type: "varchar", length: 150 })
  first_name!: string;

  @Column({ type: "varchar", length: 150 })
  last_name!: string;

  @Column({ type: "varchar", length: 254, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 128 })
  password!: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  Passport!: string;

  @Column({ type: "varchar", length: 11, nullable: true })
  Phone!: string;

  @Column({ type: "date", nullable: true })
  BirthDate!: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  Photo!: string;

  @Column({ type: "boolean", default: false })
  is_staff!: boolean;

  @Column({ type: "boolean", default: true })
  is_active!: boolean;

  @Column({ type: "boolean", default: false })
  is_superuser!: boolean;

  @Column({ type: "datetime", nullable: true })
  last_login!: Date;

  @CreateDateColumn()
  date_joined!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
} 