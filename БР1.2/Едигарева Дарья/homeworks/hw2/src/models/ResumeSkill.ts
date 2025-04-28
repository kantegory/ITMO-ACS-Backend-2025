import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Resume } from './Resume';
import { Skill } from './Skill';
import { ProficiencyLevel } from '../common/enums';

@Entity({ name: 'resume_skills' })
export class ResumeSkill extends BaseEntity {
    @Column({
        type: 'enum',
        enum: ProficiencyLevel,
        enumName: 'proficiency_level',
        default: ProficiencyLevel.Beginner,
    })
    masteryLevel!: ProficiencyLevel;

    @ManyToOne(() => Resume, (r) => r.resumeSkills, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'resume_id' })
    resume!: Resume;

    @ManyToOne(() => Skill, (s) => s.resumeSkills, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'skill_id' })
    skill!: Skill;
}
