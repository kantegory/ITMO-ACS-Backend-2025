import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm"
import { Character } from "./Character"
import { Item } from "./Item"

export enum ItemStatus {
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
        default: ItemStatus.MOVING
    })
    status: ItemStatus

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'itemId' })
    item: Item

    @Column({type: 'integer'})
    itemId: number

    @ManyToOne(() => Character, (character) => character.items)
    @JoinColumn({ name: 'characterId' })
    character: Character

    @Column({type: 'integer'})
    characterId: number
}