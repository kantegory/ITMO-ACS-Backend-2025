import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Effect } from "./Effect";

enum EdgeType {
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

    @Column({type: 'text'})
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