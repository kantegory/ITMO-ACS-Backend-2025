import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
} from "typeorm";
import { Education } from "./educationModel";
import { WorkExperience } from "./work_experienceModel";
import { ResumeSkills } from "./resume_skillsModel";

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id!: number;

    // Храним только ID пользователя (внешний сервис)
    @Column({ type: "int" })
    userId!: number;

    @Column({ type: "varchar", length: 255 })
    full_name!: string;

    @Column({ type: "date" })
    date_of_birth!: string;

    @Column({ type: "varchar", length: 255 })
    work_experience!: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    skills?: string;

    @Column({ type: "int", nullable: true })
    salary?: number;

    @ManyToOne(() => Education, (edu) => edu.resumes, { nullable: true })
    education?: Education | null;

    @Column({ type: "text", nullable: true })
    additional_information?: string;

    @OneToMany(() => WorkExperience, (exp) => exp.resume)
    experiences?: WorkExperience[];

    @OneToMany(() => ResumeSkills, (rs) => rs.resume)
    resumeSkills?: ResumeSkills[];
}
