import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Character } from "./Character"
import { Item } from "./Item"

enum ItemStatus {
    MOVING = "moving",
    EQUIPPED = "equipped",
    STORED = "stored",
}

@Entity()
export class ItemToCharacter {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: 'enum',
        enum: ItemStatus,
    })
    status: ItemStatus

    @ManyToOne(() => Item)
    item: Item

    @ManyToOne(() => Character, (character) => character.items)
    character: Character
}