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

    @ManyToOne(() => User, (user) => user.resumes)
    user!: User;

    @Column()
    full_name!: string;

    @Column()
    date_of_birth!: string;

    @Column()
    work_experience!: string;

    @Column()
    skills?: string;

    @Column()
    salary?: number;

    @ManyToOne(() => Education, (edu) => edu.resumes)
    education?: Education;

    @Column("text")
    additional_information?: string;

    @OneToMany(() => WorkExperience, (exp) => exp.resume)
    experiences?: WorkExperience[];

    @OneToMany(() => ResumeSkills, (rs) => rs.resume)
    resumeSkills?: ResumeSkills[];
}
