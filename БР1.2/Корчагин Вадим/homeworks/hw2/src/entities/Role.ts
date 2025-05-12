import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, UpdateDateColumn, OneToMany
} from "typeorm"
import { User } from "./User"

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn()
  id: number

  @Column("varchar", { length: 50, unique: true })
  role_name: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => User, (user) => user.role)
  users: User[]
}
