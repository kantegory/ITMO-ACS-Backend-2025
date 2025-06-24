import {
    Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany
} from "typeorm";
import { User } from "./userModel";
import { WorkExperience } from "./work_experienceModel";
import { ResumeSkills } from "./resume_skillsModel";
import { Education } from "./educationModel";

@Entity()
export class Resume {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.resumes, { nullable: false })
    user!: User;

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
    education?: Education;

    @Column({ type: "text", nullable: true })
    additional_information?: string;

    @OneToMany(() => WorkExperience, (exp) => exp.resume)
    experiences?: WorkExperience[];

    @OneToMany(() => ResumeSkills, (rs) => rs.resume)
    resumeSkills?: ResumeSkills[];
}
