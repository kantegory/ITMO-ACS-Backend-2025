import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { ResumeSkill } from './ResumeSkill';
import { VacancySkill } from './VacancySkill';

@Entity({ name: 'skills' })
export class Skill extends BaseEntity {
    @Column({ unique: true })
    name!: string;

    @Column({ nullable: true, type: 'text' })
    description?: string;

    @OneToMany(() => ResumeSkill, (rs) => rs.skill)
    resumeSkills!: ResumeSkill[];

    @OneToMany(() => VacancySkill, (vs) => vs.skill)
    vacancySkills!: VacancySkill[];
}
