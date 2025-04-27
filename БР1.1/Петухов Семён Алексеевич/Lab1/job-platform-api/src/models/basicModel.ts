import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class BasicModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    ColumnString: string;

}