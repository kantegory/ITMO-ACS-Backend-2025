import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 256, unique: true})
    email: string;

    @Column({type: "varchar", length: 256})
    password: string;

    @Column({type: "varchar", length: 256})
    avatarUrl: string;

    @Column({type: 'varchar', length: 256})
    name: string;

    @CreateDateColumn()
    createdAt: Date;
}