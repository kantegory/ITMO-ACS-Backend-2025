import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number

    @Column({ unique: true })
    email!: string

    @Column()
    password!: string

    @Column()
    name!: string

    @CreateDateColumn()
    created_at!: Date
}