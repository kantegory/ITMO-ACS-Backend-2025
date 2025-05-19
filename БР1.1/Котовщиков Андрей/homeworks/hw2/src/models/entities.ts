import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	ManyToOne,
	ManyToMany,
	CreateDateColumn,
	Unique,
	JoinColumn,
	UpdateDateColumn,
	OneToOne,
} from "typeorm"

import { ApplicationStatus, SkillLevel } from "../models/types"

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id: string

	@Column({ name: "first_name", nullable: false })
	firstName: string

	@Column({ name: "last_name", nullable: false })
	lastName: string

	@Column({ nullable: false, unique: true })
	email: string

	@Column({ nullable: false })
	password: string

	@Column({ nullable: true })
	location: string

	@Column({ name: "is_verified", nullable: false, default: false })
	isVerified: boolean

	@Column({ name: "is_employer", nullable: false, default: false })
	isEmployer: boolean
}

@Unique(["name", "user"])
@Entity("devices")
export class Device {
	@PrimaryGeneratedColumn()
	id: string

	@Column({ nullable: false })
	name: string

	@ManyToOne(() => User, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "user_id" })
	user: User

	@CreateDateColumn({ name: "login_at", nullable: false })
	loginAt: Date
}

@Entity("resumes")
export class Resume {
	@PrimaryGeneratedColumn()
	id: string

	@Column({ nullable: false })
	title: string

	@Column({ name: "about_me", nullable: true })
	aboutMe: string

	@Column({ name: "photo_url", nullable: true })
	photoUrl: string

	@Column({ name: "is_hidden", nullable: false, default: false })
	isHidden: boolean

	@CreateDateColumn({ name: "created_at", nullable: false })
	createdAt: Date

	@UpdateDateColumn({ name: "updated_at", nullable: false })
	updatedAt: Date

	@ManyToOne(() => User, { nullable: false })
	@JoinColumn({ name: "user_id" })
	user: User

	@OneToOne(() => Contacts)
	contacts: Contacts

	@OneToMany(() => WorkPlace, (workPalce) => workPalce.resume)
	workPlaces: WorkPlace[]

	@OneToMany(() => ResumeSkill, (resuleSkill) => resuleSkill.resume)
	skills: ResumeSkill[]
}

@Entity("resume_skills")
export class ResumeSkill {
	@PrimaryGeneratedColumn()
	id: string

	@ManyToOne(() => Resume, { nullable: false })
	@JoinColumn({ name: "resume_id" })
	resume: Resume

	@ManyToOne(() => Skill, { nullable: false, eager: true })
	@JoinColumn({ name: "skill_id" })
	skill: Skill

	@Column({ nullable: false, default: SkillLevel.BEGINNER })
	level: SkillLevel
}

@Entity("contacts")
export class Contacts {
	@PrimaryGeneratedColumn()
	id: string

	@Column({ nullable: true })
	email: string

	@Column({ name: "phone_number", nullable: true })
	phoneNumber: string

	@Column({ nullable: true })
	telegram: string

	@ManyToOne(() => Resume, (resume) => resume.contacts, { onDelete: "CASCADE", nullable: false })
	@JoinColumn({ name: "resume_id" })
	resume: Resume
}

@Entity("work_places")
export class WorkPlace {
	@PrimaryGeneratedColumn()
	id: string

	@ManyToOne(() => Resume, (resume) => resume.workPlaces, { onDelete: "CASCADE", nullable: false })
	@JoinColumn({ name: "resume_id" })
	resume: Resume

	@Column({ name: "start_date", nullable: false })
	startDate: Date

	@Column({ name: "end_date", nullable: true })
	endDate: Date

	@Column({ nullable: false })
	description: string

	@Column({ nullable: false })
	organization: string
}

@Entity("applications")
export class Application {
	@PrimaryGeneratedColumn()
	id: string

	@Column({ name: "cover_letter", nullable: true })
	coverLetter: string

	@Column({ nullable: false, default: ApplicationStatus.PENDING })
	status: ApplicationStatus

	@CreateDateColumn({ name: "sent_at", nullable: false })
	sentAt: Date

	@ManyToMany(() => Resume, { nullable: false })
	resume: Resume

	@ManyToMany(() => Vacancy, { nullable: false })
	vacancy: Vacancy
}

@Entity("companies")
export class Company {
	@PrimaryGeneratedColumn()
	id: string

	@ManyToMany(() => Industry)
	industies: Industry[]

	@Column({ nullable: false })
	name: string

	@Column({ nullable: false })
	description: string

	@Column({ name: "is_verified", nullable: false, default: false })
	isVerified: boolean

	@Column({ name: "logo_url", nullable: true })
	logoUrl: string

	@Column({ name: "business_type", nullable: false })
	businessType: string

	@Column({ nullable: false })
	location: string
}

@Entity("industries")
export class Industry {
	@PrimaryGeneratedColumn()
	id: string

	@Column({ nullable: false, unique: true })
	name: string
}

@Entity("vacancies")
export class Vacancy {
	@PrimaryGeneratedColumn()
	id: string

	@OneToMany(() => VacancySkill, (vacancySkill) => vacancySkill.vacancy, { eager: true })
	skills: VacancySkill[]

	@ManyToOne(() => Company, { nullable: false, onDelete: "CASCADE" })
	company: Company

	@Column({ nullable: false })
	description: string

	@Column({ nullable: true })
	salary: string

	@Column({ name: "is_closed", nullable: false, default: false })
	isClosed: boolean

	@Column({ nullable: false })
	title: string

	@Column({ name: "work_expirience", nullable: true })
	workExpririence: number // in months

	@Column({ nullable: false })
	requirements: string
}

@Entity("vacancy_skills")
export class VacancySkill {
	@PrimaryGeneratedColumn()
	id: string

	@ManyToOne(() => Vacancy, { nullable: false, onDelete: "CASCADE" })
	@JoinColumn({ name: "vacancy_id" })
	vacancy: Vacancy

	@ManyToOne(() => Skill, { nullable: false, onDelete: "CASCADE", eager: true })
	@JoinColumn({ name: "skill_id" })
	skill: Skill

	@Column({ name: "min_level", nullable: false, default: SkillLevel.BEGINNER })
	minLevel: SkillLevel
}

@Entity("skills")
export class Skill {
	@PrimaryGeneratedColumn()
	id: string

	@Column({ nullable: false, unique: true })
	name: string
}
