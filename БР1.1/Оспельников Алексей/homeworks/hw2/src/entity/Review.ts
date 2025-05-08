import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Rent, rent => rent.review)
    rent!: Rent;

    @Column('decimal')
    grade: number

    @Column()
    text: string

    @Column()
    complaints: string

}
