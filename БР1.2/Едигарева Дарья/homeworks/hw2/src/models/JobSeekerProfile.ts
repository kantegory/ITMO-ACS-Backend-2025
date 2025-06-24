import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { User } from './User';

@Entity({ name: 'job_seeker_profiles' })
export class JobSeekerProfile extends BaseEntity {
    @OneToOne(() => User, (u) => u.jobSeekerProfile, {
        nullable: false,
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column({ name: 'full_name' })
    fullName!: string;
}
