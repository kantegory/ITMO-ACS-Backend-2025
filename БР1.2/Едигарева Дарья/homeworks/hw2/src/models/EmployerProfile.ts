import {
    Entity,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { Company } from './Company';
import { User } from './User';

@Entity({ name: 'employer_profiles' })
export class EmployerProfile extends BaseEntity {
    @ManyToOne(() => Company, (c) => c.employerProfiles, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'company_id' })
    company!: Company;

    @OneToOne(() => User, (u) => u.employerProfile, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    phone!: string;
}
