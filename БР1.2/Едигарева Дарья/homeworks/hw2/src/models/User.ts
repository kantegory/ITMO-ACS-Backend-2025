import {
    Entity,
    Column,
    OneToOne,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { UserRole } from '../common/enums';
import { EmployerProfile } from './EmployerProfile';
import { JobSeekerProfile } from './JobSeekerProfile';

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @Column({ unique: true })
    email!: string;

    @Column()
    passwordHash!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        enumName: 'user_role',
        default: UserRole.JobSeeker,
    })
    role!: UserRole;

    @OneToOne(() => EmployerProfile, (ep) => ep.user, { cascade: true })
    employerProfile?: EmployerProfile;

    @OneToOne(() => JobSeekerProfile, (jp) => jp.user, { cascade: true })
    jobSeekerProfile?: JobSeekerProfile;
}
