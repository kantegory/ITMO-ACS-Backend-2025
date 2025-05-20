import {
  Entity, PrimaryGeneratedColumn, Column,
  ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn
} from "typeorm"
import { Role } from "./Role"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column("int")
  role_id: number

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role

  @Column("varchar", { length: 100 })
  name: string

  @Column("varchar", { length: 100 })
  email: string

  @Column("varchar", { length: 255 })
  password_hash: string

  @Column("date", { nullable: true })
  date_of_birth: Date

  @Column("varchar", { length: 10, nullable: true })
  gender: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
