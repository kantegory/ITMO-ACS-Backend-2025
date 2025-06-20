import {
    Entity,
    Column,
    OneToMany,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { VacancySkill } from './VacancySkill';
import { ResumeSkill } from './ResumeSkill';

@Entity({ name: 'skills' })
export class Skill extends BaseEntity {
    @Column({ unique: true })
    name!: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @OneToMany(() => VacancySkill, (vs) => vs.skill)
    vacancySkills!: VacancySkill[];

    @OneToMany(() => ResumeSkill, (rs) => rs.skill)
    resumeSkills!: ResumeSkill[];
}
