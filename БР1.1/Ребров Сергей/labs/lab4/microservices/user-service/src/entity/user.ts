import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { Role } from "./role";
import { Resume } from "./resume";

@Entity({ name: "User" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "user_id" })
  id: number;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: "role_id" })
  role: Role;

  @Column({ type: "varchar", length: 256 })
  name: string;

  @Column({ type: "varchar", length: 256 })
  email: string;

  @Column({ type: "varchar", length: 256 })
  password: string;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Resume, (resume) => resume.user)
  resumes: Resume[];
}
