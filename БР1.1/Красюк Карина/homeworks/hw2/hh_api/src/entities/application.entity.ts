import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Resume} from "./resume.entity";
import {Vacancy} from "./vacancy.entity";

@Entity('applications')
export class Application {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Resume, resume => resume.applications)
    resume: Resume;

    @ManyToOne(() => Vacancy, vacancy => vacancy.applications)
    vacancy: Vacancy;

    @Column('int')
    status: number;

    @Column({ type: 'timestamp' })
    application_date: Date;

    @Column('text', { nullable: true })
    cover_letter?: string;
}