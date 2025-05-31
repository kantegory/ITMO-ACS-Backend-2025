import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from "typeorm";

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

    @Column({ type: 'int', nullable: true })
    companyId?: number | null;  // внешний ID компании из Company-сервиса
}
