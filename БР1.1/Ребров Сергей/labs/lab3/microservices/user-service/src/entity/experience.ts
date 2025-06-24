import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Resume } from "./resume";

@Entity({ name: "Experience" })
export class Experience extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "experience_id" })
  id: number;

  @ManyToOne(() => Resume, (resume) => resume.experiences)
  @JoinColumn({ name: "resume_id" })
  resume: Resume;

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "varchar", length: 256 })
  company: string;

  @Column({ type: "date", name: "start_date" })
  startDate: Date;

  @Column({ type: "date", name: "end_date", nullable: true })
  endDate: Date | null;
}
