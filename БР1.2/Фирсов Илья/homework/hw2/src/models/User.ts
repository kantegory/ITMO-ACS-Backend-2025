import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';
import { Resume } from './Resume';
import { Application } from './Application';
import { UserRole, UserActivity } from '../common/enums';
import {Vacancy} from "./Vacancy";

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    enumName: 'user_role',
    default: UserRole.JobSeeker,
  })
  role!: UserRole;

  @Column({
    type: 'enum',
    enum: UserActivity,
    enumName: 'user_activity',
    default: UserActivity.LookingForJob,
  })
  activity!: UserActivity;

  @OneToMany(() => Resume, (r) => r.user)
  resumes!: Resume[];

  @ManyToOne(() => Resume, { nullable: true })
  @JoinColumn({ name: 'current_resume_id' })
  currentResume?: Resume;

  @OneToMany(() => Application, (app) => app.user)
  applications!: Application[];

  @ManyToOne(() => Company, (c) => c.users, { nullable: true })
  company?: Company;

  @OneToMany(() => Vacancy, (vacancy) => vacancy.employer)
  vacancies!: Vacancy[];
}