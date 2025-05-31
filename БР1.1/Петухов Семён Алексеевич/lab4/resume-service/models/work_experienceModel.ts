import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Resume } from "./resumeModel";

@Entity()
export class WorkExperience {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume.experiences, { nullable: false })
    resume!: Resume;

    @Column({ type: "varchar", length: 255, nullable: true })
    company?: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    role?: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "varchar", length: 100 })
    duration!: string;  // Например, "2 года", "6 месяцев"
}
