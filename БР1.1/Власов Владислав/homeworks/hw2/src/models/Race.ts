import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Edge } from "./Edge";

@Entity()
export class Race {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'text'})
    description: string

    @ManyToMany(() => Edge)
    @JoinTable()
    edges: Edge[]
}