import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { JobSeekerProfile } from './JobSeekerProfile';
import { ResumeSkill } from './ResumeSkill';
import { WorkExperience } from './WorkExperience';
import { Education } from './Education';
import { Application } from './Application';

@Entity({ name: 'resumes' })
export class Resume extends BaseEntity {
    @ManyToOne(() => JobSeekerProfile, (p) => p.id, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'profile_id' })
    profile!: JobSeekerProfile;

    @Column({ name: 'resume_path' })
    resumePath!: string;

    @OneToMany(() => ResumeSkill, (rs) => rs.resume, { cascade: true })
    resumeSkills!: ResumeSkill[];

    @OneToMany(() => WorkExperience, (we) => we.resume, { cascade: true })
    experiences!: WorkExperience[];

    @OneToMany(() => Education, (ed) => ed.resume, { cascade: true })
    educations!: Education[];

    @OneToMany(() => Application, (app) => app.resume)
    applications!: Application[];
}
