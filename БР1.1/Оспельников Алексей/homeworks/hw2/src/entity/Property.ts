import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Property {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string

    @Column('decimal')
    rating: number;

    @Column()
    rent_type: string

    @Column('decimal')
    rent_cost: number

    @Column()
    rent_duration: date

    @Column()
    max_guests: number

    @Column()
    comforts: string

    @Column()
    description: string

    @Column()
    is_rentable: boolean

    @Column()
    address: string

    @Column('decimal')
    deposit: number

    @OneToMany(() => Rent, rent => rent.estate)
    rents!: Rent[];

    @ManyToOne(() => User, user => user.renters)
    owner!: User;

    @CreateDateColumn()
    created_at!: Date;
}
