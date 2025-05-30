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
import { User } from "./user";
import { Application } from "./application";

@Entity({ name: "Job" })
export class Job extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "job_id" })
  id: number;

  @ManyToOne(() => User, (user) => user.jobs)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  requirements: string;

  @Column({ type: "int", name: "salary_min" })
  salaryMin: number;

  @Column({ type: "int", name: "salary_max" })
  salaryMax: number;

  @Column({ type: "varchar", length: 256 })
  experience: string;

  @Column({ type: "varchar", length: 256 })
  location: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Application, (app) => app.job)
  applications: Application[];
}
