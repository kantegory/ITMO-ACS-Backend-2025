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

export enum UserRole {
    SEEKER = "соискатель",
    EMPLOYER = "работодатель"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    username!: string;

    @Column({ type: 'varchar', unique: true, length: 255 })
    email!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.SEEKER
    })
    role!: UserRole;

    @ManyToOne(() => Company, (company) => company.users, { nullable: true })
    company?: Company | null;

    @OneToMany(() => Resume, (resume) => resume.user)
    resumes?: Resume[];

    @OneToMany(() => Application, (app) => app.user)
    applications?: Application[];

    @OneToMany(() => MotivationLetter, (ml) => ml.user)
    motivationLetters?: MotivationLetter[];
}
