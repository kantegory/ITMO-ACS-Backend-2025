import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 256, unique: true})
    mail: string;

    @Column({type: "varchar", length: 256})
    password: string;

    @Column({type: 'varchar', length: 50, name: 'first_name'})
    firstName: string;

    @Column({type: 'varchar', length: 50, name: 'last_name'})
    lastName: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;


}