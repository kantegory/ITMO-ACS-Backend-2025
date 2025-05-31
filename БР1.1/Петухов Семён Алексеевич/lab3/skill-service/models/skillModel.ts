import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ResumeSkills } from "./resume_skillsModel";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    skill_name!: string;

    @Column({ type: "text", nullable: true })
    description?: string;

}
