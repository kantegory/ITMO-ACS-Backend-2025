import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany } from "typeorm"
import { Effect } from "./Effect";
import { ItemToCharacter } from "./ItemToCharacter";

export enum ItemType {
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

    @Column({type: 'text', default: ""})
    description: string

    @Column({
        type: 'enum',
        enum: ItemType
    })
    type: ItemType

    @Column({type: 'integer', default: 0})
    cost: number

    @Column({type: 'integer', default: 0})
    weight: number

    @ManyToMany(() => Effect)
    @JoinTable()
    effects: Effect[]

    @OneToMany(() => ItemToCharacter, character => character.item)
    characters: ItemToCharacter[]
}