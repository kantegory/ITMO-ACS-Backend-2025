import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Vacancy } from "./vacancyModel";

@Entity()
export class MotivationLetter {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "int" })  // Явно указываем тип
    userId!: number;  // Храним только ID пользователя из другого сервиса

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.motivationLetters, { nullable: false })
    vacancy!: Vacancy;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
}
