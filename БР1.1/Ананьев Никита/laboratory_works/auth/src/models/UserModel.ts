import { Entity, Column, PrimaryGeneratedColumn, Index, CreateDateColumn } from "typeorm"


@Entity()
@Index(["firstName", "lastName"])
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Index()
    @Column({ unique: true })
    email!: string

    @Column()
    password!:string;

    @Column()
    firstName!: string

    @Column({ nullable: true })
    lastName?: string

    @Column()
    birthDate!: Date

    @CreateDateColumn()
    registerDate!: Date

    constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
