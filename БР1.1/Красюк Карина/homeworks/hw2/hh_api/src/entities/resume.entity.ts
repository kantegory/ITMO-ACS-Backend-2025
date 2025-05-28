import {User} from "./user.entity";
import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Experience} from "./experience.entity";
import {Education} from "./education.entity";
import {Skill} from "./skill.entity";
import {Application} from "./application.entity";

@Entity('resumes')
export class Resume {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @ManyToOne(() => User, (user) => user.resumes)
    @JoinColumn({name: 'user_id'})
    user: User;

    @OneToMany(() => Education, (education) => education.resume)
    educations: Education[];

    @OneToMany(() => Experience, (experience) => experience.resume)
    experiences: Experience[];

    @OneToMany(() => Skill, (skill) => skill.resume)
    skills: Skill[];

    @Column('integer', { nullable: true })
    desired_salary?: number;

    @Column('timestamp')
    last_updated: Date;

    @OneToMany(() => Application, application => application.vacancy)
    applications: Application[];
}