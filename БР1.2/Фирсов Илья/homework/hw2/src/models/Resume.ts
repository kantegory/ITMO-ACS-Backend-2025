import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import {BaseEntity} from './BaseEntity';
import {User} from './User';
import {Education} from './Education';
import {Experience} from './Experience';
import {ResumeSkill} from './ResumeSkill';

@Entity({name: 'resumes'})
export class Resume extends BaseEntity {
    @Column({type: 'text', nullable: true})
    summary?: string;

    @ManyToOne(() => User, (u) => u.resumes, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user!: User;

    @OneToMany(() => ResumeSkill, (rs) => rs.resume, {cascade: true})
    resumeSkills!: ResumeSkill[];

    @OneToMany(() => Education, (ed) => ed.resume, {cascade: true})
    educations!: Education[];

    @OneToMany(() => Experience, (ex) => ex.resume, {cascade: true})
    experiences!: Experience[];
}