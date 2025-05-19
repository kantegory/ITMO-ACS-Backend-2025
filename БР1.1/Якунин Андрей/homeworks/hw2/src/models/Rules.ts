import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { LivingRules } from "./LivingRules";

@Entity()
export class Rules {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    check_in_after: string;

    @Column()
    departure_before: string;

    @Column()
    guest_count: number;

    @Column()
    with_child: boolean;

    @Column()
    with_animals: boolean;

    @Column()
    allowed_smoking: boolean;

    @Column()
    allowed_parties: boolean;

    @Column()
    report_docs: string;

    @OneToMany(() => LivingRules, livingRules => livingRules.rules)
    livingRules: LivingRules[];
}
