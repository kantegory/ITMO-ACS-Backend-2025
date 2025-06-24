import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Resume } from "./resumeModel";
import { Company } from "./companyModel";
import { Application } from "./applicationModel";
import { MotivationLetter } from "./motivation_letterModel";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    role: "соискатель" | "работодатель";

    @ManyToOne(() => Company, (company) => company.users, { nullable: true })
    company: Company | null;

    @OneToMany(() => Resume, (resume) => resume.user)
    resumes?: Resume[];

    @OneToMany(() => Application, (app) => app.user)
    applications?: Application[];

    @OneToMany(() => MotivationLetter, (ml) => ml.user)
    motivationLetters?: MotivationLetter[];

    constructor(
        username: string,
        email: string,
        password: string,
        role: "соискатель" | "работодатель",
        company?: Company
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
        this.company = company || null;
    }
}
