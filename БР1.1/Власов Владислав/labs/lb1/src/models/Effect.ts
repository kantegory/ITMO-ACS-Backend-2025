import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Condition } from "./Condition"

@Entity()
export class Effect {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({type: 'boolean'})
    isPassive: boolean

    @Column({type: 'boolean'})
    isTemp: boolean

    @Column({
        default: 0,
        type: 'integer'
    })
    ActionTime: number

    @OneToMany(() => Condition, condition => condition.effect)
    conditions: Condition[]
}