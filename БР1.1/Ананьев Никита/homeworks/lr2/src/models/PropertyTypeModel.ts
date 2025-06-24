import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class PropertyType {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: "varchar", length: 30, unique: true})
    name!: string
}
