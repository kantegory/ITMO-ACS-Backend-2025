import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Vacancy } from './Vacancy';
import { Skill } from './Skill';
import { ProficiencyLevel } from '../common/enums';

@Entity({ name: 'vacancy_skills' })
export class VacancySkill extends BaseEntity {
    @Column({
        name: 'mastery_level',
        type: 'enum',
        enum: ProficiencyLevel,
        enumName: 'proficiency_level',
        default: ProficiencyLevel.Beginner,
    })
    masteryLevel!: ProficiencyLevel;

    @ManyToOne(() => Vacancy, (v) => v.vacancySkills, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'vacancy_id' })
    vacancy!: Vacancy;

    @ManyToOne(() => Skill, (s) => s.vacancySkills, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'skill_id' })
    skill!: Skill;
}
