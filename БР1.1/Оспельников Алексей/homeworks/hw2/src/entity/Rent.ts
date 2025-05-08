import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Rent {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    guest_count: number

    @Column()
    status: string

    @Column()
    start_rent: Date

    @Column()
    end_rent: Date

    @ManyToOne(() => User, user => user.tenants)
    tenant!: User;

    @ManyToOne(() => Property, property => property.rents)
    estate!: Property;

    @OneToMany(() => Review, review => review.rent)
    review!: Review[];

    @CreateDateColumn()
    created_at!: Date;

}
