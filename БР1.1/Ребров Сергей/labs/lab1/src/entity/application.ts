import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from "typeorm";
import { User } from "./user";
import { Job } from "./job";

@Entity({ name: "Application" })
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "application_id" })
  id: number;

  @ManyToOne(() => User, (user) => user.applications)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Job, (job) => job.applications)
  @JoinColumn({ name: "job_id" })
  job: Job;

  @Column({ type: "text", name: "cover_letter" })
  coverLetter: string;

  @Column({ type: "varchar", length: 50 })
  status: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
