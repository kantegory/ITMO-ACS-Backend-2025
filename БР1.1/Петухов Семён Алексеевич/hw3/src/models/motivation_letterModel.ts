import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./userModel";
import { Vacancy } from "./vacancyModel";

@Entity()
export class MotivationLetter {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, (user) => user.motivationLetters)
    user: User;

    @ManyToOne(() => Vacancy, (vacancy) => vacancy.motivationLetters)
    vacancy: Vacancy;

    @Column()
    title: string;

    @Column("text")
    content: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at: Date;

    // Конструктор для инициализации полей
    constructor(
        user: User,
        vacancy: Vacancy,
        title: string,
        content: string,
        created_at: Date = new Date() // По умолчанию установим текущую дату и время
    ) {
        this.user = user;
        this.vacancy = vacancy;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
    }
}
