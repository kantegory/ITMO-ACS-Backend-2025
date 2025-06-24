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

@Entity({ name: "Application" })
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "application_id" })
  id: number;

  @Column({ name: "user_id" })
  user: number;

  @Column({ name: "job_id" })
  job: number;

  @Column({ type: "text", name: "cover_letter" })
  coverLetter: string;

  @Column({ type: "varchar", length: 50 })
  status: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
