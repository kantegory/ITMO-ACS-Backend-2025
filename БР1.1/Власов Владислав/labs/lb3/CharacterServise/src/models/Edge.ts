import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Effect } from "./Effect";
import { Item } from "./Item";

export enum EdgeType {
    Edge = 'edge',
    Hindrances = 'hindrances',
    RaceEdge = 'raceEdge',
    RaceHindrances = 'raceHindrances',
}

@Entity()
export class Edge
{

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'text', default: ""})
    description: string

    @Column({
        type: 'enum',
        enum: EdgeType,
    })
    type: EdgeType



    @ManyToMany(() => Effect)
    @JoinTable()
    effects: Effect[]
}