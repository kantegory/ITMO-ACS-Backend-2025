import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Vacancy } from "./vacancyModel";

@Entity()
export class Application {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int" })
    userId!: number;

    @Column({ type: "int" })
    resumeId!: number;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.applications, { nullable: false })
    vacancy!: Vacancy;

    @Column({ type: "varchar", length: 100 })
    status!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
}
