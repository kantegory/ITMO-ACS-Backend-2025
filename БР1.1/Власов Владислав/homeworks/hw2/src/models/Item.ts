import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Effect } from "./Effect";

enum ItemType {
    Weapon = "weapon",
    Armor = "armor",
    Equipment = "equipment"
}

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar'})
    name: string

    @Column({type: 'text'})
    description: string

    @Column({
        type: 'enum',
        enum: ItemType
    })
    type: ItemType

    @Column({type: 'integer'})
    cost: number

    @Column({type: 'integer'})
    weight: number

    @ManyToMany(() => Effect)
    @JoinTable()
    effects: Effect[]
}