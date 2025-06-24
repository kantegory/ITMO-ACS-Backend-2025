import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Resume } from "./resume";

@Entity({ name: "Education" })
export class Education extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "education_id" })
  id: number;

  @ManyToOne(() => Resume, (resume) => resume.educations)
  @JoinColumn({ name: "resume_id" })
  resume: Resume;

  @Column({ type: "varchar", length: 256 })
  institution: string;

  @Column({ type: "varchar", length: 256 })
  degree: string;

  @Column({ type: "date", name: "start_date" })
  startDate: Date;

  @Column({ type: "date", name: "end_date", nullable: true })
  endDate: Date | null;
}
