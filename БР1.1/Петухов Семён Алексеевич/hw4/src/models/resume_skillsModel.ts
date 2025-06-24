import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Resume } from "./resumeModel";
import { Skill } from "./skillModel";

@Entity()
export class ResumeSkills {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume.resumeSkills, { nullable: false })
    resume!: Resume;

    @ManyToOne(() => Skill, (skill) => skill.resumeSkills, { nullable: false })
    skill!: Skill;

}
