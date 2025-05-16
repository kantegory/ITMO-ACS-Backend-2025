import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Resume } from "./resumeModel";

@Entity()
export class WorkExperience {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume.experiences)
    resume!: Resume;

    @Column({ nullable: true })
    company?: string;

    @Column({ nullable: true })
    role?: string;

    @Column("text")
    description?: string;

    @Column()
    duration!: string;

}
