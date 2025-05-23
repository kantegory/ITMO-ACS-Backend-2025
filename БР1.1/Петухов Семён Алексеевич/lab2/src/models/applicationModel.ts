import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./userModel";
import { Resume } from "./resumeModel";
import { Vacancy } from "./vacancyModel";

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Resume, (resume) => resume)
    resume!: Resume;

    @ManyToOne(() => User, (user) => user.applications)
    user!: User;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications)
    vacancy!: Vacancy;

    @Column()
    status!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date = new Date();
}
