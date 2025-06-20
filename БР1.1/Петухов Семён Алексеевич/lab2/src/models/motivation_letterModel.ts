import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./userModel";
import { Vacancy } from "./vacancyModel";

@Entity()
export class MotivationLetter {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.motivationLetters, { nullable: false })
    user!: User;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.motivationLetters, { nullable: false })
    vacancy!: Vacancy;

    @Column({ type: "varchar", length: 255 })
    title!: string;

    @Column({ type: "text" })
    content!: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;
}
