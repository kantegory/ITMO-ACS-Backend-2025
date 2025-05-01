import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Vacancy } from './Vacancy';
import { Skill } from './Skill';
import { ProficiencyLevel } from '../common/enums';

@Entity({ name: 'vacancy_skills' })
export class VacancySkill extends BaseEntity {
    @Column({
        name: 'required_level',
        type: 'enum',
        enum: ProficiencyLevel,
        enumName: 'proficiency_level',
        default: ProficiencyLevel.Beginner,
    })
    requiredLevel!: ProficiencyLevel;

    @ManyToOne(() => Vacancy, (v) => v.vacancySkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'vacancy_id' })
    vacancy!: Vacancy;

    @ManyToOne(() => Skill, (s) => s.vacancySkills, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'skill_id' })
    skill!: Skill;
}