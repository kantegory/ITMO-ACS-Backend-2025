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
import { Experience } from "./experience";
import { Education } from "./education";

@Entity({ name: "Resume" })
export class Resume extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "resume_id" })
  id: number;

  @ManyToOne(() => User, (user) => user.resumes)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ type: "varchar", length: 256 })
  title: string;

  @Column({ type: "text" })
  skills: string;

  @Column({ type: "text", name: "contact_info" })
  contactInfo: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Experience, (exp) => exp.resume)
  experiences: Experience[];

  @OneToMany(() => Education, (edu) => edu.resume)
  educations: Education[];
}
