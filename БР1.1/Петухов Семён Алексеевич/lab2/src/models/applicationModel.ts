import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./userModel";
import { Resume } from "./resumeModel";
import { Vacancy } from "./vacancyModel";

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume.applications, { nullable: false })
    resume!: Resume;

    @ManyToOne(() => User, (user) => user.applications, { nullable: false })
    user!: User;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications, { nullable: false })
    vacancy!: Vacancy;

    @Column({ type: "varchar", length: 100 })
    status!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
}
